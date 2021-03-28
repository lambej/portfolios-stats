import {
    RxJsonSchema
} from 'rxdb';
const schema: RxJsonSchema = {
    title: 'addedposition schema',
    description: '',
    version: 0,
    keyCompression: false,
    type: 'object',
    properties: {
        symbol: {
            type: 'string',
            default: ''
        },
        quantity_of_shares: {
            type: 'number',
            default: ''
        },
        unit_price: {
            type: 'number',
            default: ''
        },
        date: {
            type: 'number',
            default: ''
        },
        currency: {
            type: 'string',
            default: 'USD',
            enum: ['USD', 'CAD']
        },
    },
    indexes: ['symbol'],
    required: ['symbol', 'quantity_of_shares', 'date', 'unit_price']
};

export default schema;
