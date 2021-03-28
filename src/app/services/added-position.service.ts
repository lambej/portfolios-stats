import {
    Injectable,
    isDevMode
} from '@angular/core';

// import typings
import {
    RxAddedPositionDocument,
    RxAddedPositionsDatabase,
    RxAddedPositionsCollections,
    RxAddedPositionDocumentType
} from '../RxDB';

import addedPositionSchema from '../schemas/addedPosition.schema';

/**
 * Instead of using the default rxdb-import,
 * we do a custom build which lets us cherry-pick
 * only the modules that we need.
 * A default import would be: import RxDB from 'rxdb';
 */
import {
    createRxDatabase,
    removeRxDatabase,
    addRxPlugin
} from 'rxdb/plugins/core';
import { RxDBNoValidatePlugin } from 'rxdb/plugins/no-validate';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';
import { RxDBReplicationPlugin } from 'rxdb/plugins/replication';
import * as PouchdbAdapterHttp from 'pouchdb-adapter-http';
import * as PouchdbAdapterIdb from 'pouchdb-adapter-idb';
import { RxDBMigrationPlugin } from 'rxdb/plugins/migration'

let collections = [
    {
        name: 'addedposition',
        schema: addedPositionSchema,
        sync: true
    }
];

console.log('hostname: ' + window.location.hostname);
const syncURL = 'http://127.0.0.1:5984/';

let doSync = true;
if (window.location.hash == '#nosync') doSync = false;


async function loadRxDBPlugins(): Promise<any> {


    addRxPlugin(RxDBLeaderElectionPlugin);

    addRxPlugin(RxDBReplicationPlugin);
    // http-adapter is always needed for replication with the node-server
    addRxPlugin(PouchdbAdapterHttp);

    /**
     * indexed-db adapter
     */
    addRxPlugin(PouchdbAdapterIdb);
    addRxPlugin(RxDBMigrationPlugin);

    /**
     * to reduce the build-size,
     * we use some modules in dev-mode only
     */
    if (isDevMode()) {
        await Promise.all([

            // add dev-mode plugin
            // which does many checks and add full error-messages
            import('rxdb/plugins/dev-mode').then(
                module => addRxPlugin(module)
            ),

            // we use the schema-validation only in dev-mode
            // this validates each document if it is matching the jsonschema
            import('rxdb/plugins/validate').then(
                module => addRxPlugin(module)
            )
        ]);
    } else {
        // in production we use the no-validate module instead of the schema-validation
        // to reduce the build-size
        addRxPlugin(RxDBNoValidatePlugin);
    }

}

/**
 * creates the database
 */
async function _create(): Promise<RxAddedPositionsDatabase> {

    await loadRxDBPlugins();
    //await removeRxDatabase('angularAddedPosition', 'idb');
    console.log('DatabaseService: creating database..');
    const db = await createRxDatabase<RxAddedPositionsCollections>({
        name: 'angularAddedPosition',
        adapter: 'idb'
        // password: 'myLongAndStupidPassword' // no password needed
    });
    console.log('DatabaseService: created database');
    (window as any)['db'] = db; // write to window for debugging

    // show leadership in title
    db.waitForLeadership()
        .then(() => {
            console.log('isLeader now');
            document.title = '♛ ' + document.title;
        });

    // create collections
    console.log('DatabaseService: create collections');
    await Promise.all(collections.map(colData => db.collection(colData)));

    // hooks
    console.log('DatabaseService: add hooks');
    // db.collections.account.preInsert(function (docObj: RxAccountDocumentType) {
    //     const name = docObj.name;
    //     return db.collections.account
    //         .findOne({
    //             selector: {
    //                 name
    //             }
    //         })
    //         .exec()
    //         .then((has: RxAccountDocument | null) => {
    //             if (has != null) {
    //                 alert('another hero already has the color ' + name);
    //                 throw new Error('color already there');
    //             }
    //             return db;
    //         });
    // }, false);

    // sync with server
    if (doSync) {
        console.log('DatabaseService: sync');
        await db.addedposition.sync({
            remote: syncURL + '/addedPosition'
        });
    }

    return db;
}

let DB_INSTANCE: RxAddedPositionsDatabase;

/**
 * This is run via APP_INITIALIZER in app.module.ts
 * to ensure the database exists before the angular-app starts up
 */
export async function initAddedPositionDatabase() {
    console.log('initDatabase()');
    DB_INSTANCE = await _create();
}

@Injectable()
export class AddedPositionService {
    get db(): RxAddedPositionsDatabase {
        return DB_INSTANCE;
    }
}
