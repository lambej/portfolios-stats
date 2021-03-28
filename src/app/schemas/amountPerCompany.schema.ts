import {
    RxJsonSchema
} from 'rxdb';
const schema: RxJsonSchema = {
    title: 'amountpercompany schema',
    description: '',
    version: 0,
    keyCompression: false,
    type: 'object',
    properties: {
        symbol: {
            type: 'string',
            default: ''
        },
        account: {
            ref: 'account',
            default: '',
        },
        date: {
            type: 'number',
            default: ''
        },
        amount: {
            type: 'number',
            default: ''
        },
        currency: {
            type: 'string',
            default: 'USD',
            enum: ['USD', 'CAD']
        },
    },
    indexes: ['date', 'symbol'],
    required: ['symbol', 'date', 'amount']
};

export default schema;
