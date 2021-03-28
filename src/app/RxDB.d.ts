/**
 * custom typings so typescript knows about the schema-fields
 */

import { RxDocument, RxCollection, RxDatabase } from 'rxdb';

export type RxHeroDocumentType = {
    name: string;
    color: string;
    maxHP: number;
    hp: number;
    team?: string;
    skills: Array<{
        name?: string,
        damage?: string
    }>;
};

export type RxAccountDocumentType = {
    name: string;
    type: string;
    institution?: string;
};

export type RxCotisationDocumentType = {
    account: string;
    date: Date;
    amount: number;
};

export type RxAddedPositionDocumentType = {
    symbol: string;
    quantity_of_shares: number;
    unit_price: number;
    date:Date;
    currency: string;
};

export type RxAmountPerAccountDocumentType = {
    account: string;
    date: Date;
    amount: number;
};

export type RxAmountPerCompanyDocumentType = {
    symbol: string;
    account: string;
    date: Date;
    amount: number;
    currency: string;
};
// ORM methods
type RxHeroDocMethods = {
    hpPercent(): number;
};

type RxAccountDocMethods = {
};

type RxCotisationDocMethods = {
};
type RxAddedPositionDocMethods = {
};
type RxAmountPerAccountDocMethods = {
};
type RxAmountPerCompanyDocMethods = {
};
export type RxHeroDocument = RxDocument<RxHeroDocumentType, RxHeroDocMethods>;
export type RxAccountDocument = RxDocument<RxAccountDocumentType, RxAccountDocMethods>;
export type RxCotisationDocument = RxDocument<RxCotisationDocumentType, RxCotisationDocMethods>;
export type RxAddedPositionDocument = RxDocument<RxAddedPositionDocumentType, RxAddedPositionDocMethods>;
export type RxAmountPerAccountDocument = RxDocument<RxAmountPerAccountDocumentType, RxAmountPerAccountDocMethods>;
export type RxAmountPerCompanyDocument = RxDocument<RxAmountPerCompanyDocumentType, RxAmountPerCompanyDocMethods>;

export type RxHeroCollection = RxCollection<RxHeroDocumentType, RxHeroDocMethods, {}>;
export type RxAccountCollection = RxCollection<RxAccountDocumentType, RxAccountDocMethods, {}>;
export type RxCotisationCollection = RxCollection<RxCotisationDocumentType, RxCotisationDocMethods, {}>;
export type RxAddedPositionCollection = RxCollection<RxAddedPositionDocumentType, RxAddedPositionDocMethods, {}>;
export type RxAmountPerAccountCollection = RxCollection<RxAmountPerAccountDocumentType, RxAmountPerAccountDocMethods, {}>;
export type RxAmountPerCompanyCollection = RxCollection<RxAmountPerCompanyDocumentType, RxAmountPerCompanyDocMethods, {}>;

export type RxHeroesCollections = {
    hero: RxHeroCollection,
};
export type RxAccountsCollections = {
    account: RxAccountCollection;
};
export type RxCotisationsCollections = {
    cotisation: RxCotisationCollection;
};
export type RxAddedPositionsCollections = {
    addedposition: RxAddedPositionCollection;
};
export type RxAmountsPerAccountCollections = {
    amountperaccount: RxAmountPerAccountCollection;
};
export type RxAmountsPerCompanyCollections = {
    amountpercompany: RxAmountPerCompanyCollection;
};
export type RxHeroesDatabase = RxDatabase<RxHeroesCollections>;
export type RxAccountsDatabase = RxDatabase<RxAccountsCollections>;
export type RxCotisationsDatabase = RxDatabase<RxCotisationsCollections>;
export type RxAddedPositionsDatabase = RxDatabase<RxAddedPositionsCollections>;
export type RxAmountsPerAccountDatabase = RxDatabase<RxAmountsPerAccountCollections>;
export type RxAmountsPerCompanyDatabase = RxDatabase<RxAmountsPerCompanyCollections>;