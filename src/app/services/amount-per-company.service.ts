import {
    Injectable,
    isDevMode
} from '@angular/core';

// import typings
import {
    RxAmountPerCompanyDocument,
    RxAmountsPerCompanyDatabase,
    RxAmountsPerCompanyCollections,
    RxAmountPerCompanyDocumentType
} from '../RxDB';

import amountPerCompanySchema from '../schemas/amountPerCompany.schema';

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
        name: 'amountpercompany',
        schema: amountPerCompanySchema,
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
async function _create(): Promise<RxAmountsPerCompanyDatabase> {

    await loadRxDBPlugins();

    console.log('DatabaseService: creating database..');
    //await removeRxDatabase('angularAmountPerCompany', 'idb');
    const db = await createRxDatabase<RxAmountsPerCompanyCollections>({
        name: 'angularAmountPerCompany',
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
        await db.amountpercompany.sync({
            remote: syncURL + '/amountPerCompany'
        });
    }

    return db;
}

let DB_INSTANCE: RxAmountsPerCompanyDatabase;

/**
 * This is run via APP_INITIALIZER in app.module.ts
 * to ensure the database exists before the angular-app starts up
 */
export async function initAmountPerCompanyDatabase() {
    console.log('initDatabase()');
    
    DB_INSTANCE = await _create();
}

@Injectable()
export class AmountPerCompanyService {
    get db(): RxAmountsPerCompanyDatabase {
        return DB_INSTANCE;
    }
}
