import {
    RxJsonSchema
} from 'rxdb';
const schema: RxJsonSchema = {
    title: 'cotisation schema',
    description: 'describes a cotisation',
    version: 0,
    keyCompression: false,
    type: 'object',
    properties: {
        account: {
            ref: 'account',
            default: ''
        },
        date: {
            type: 'number',       
            default: '',
        },
        amount: {
            type: 'number',
            default: '',
        },
    },
    indexes: [['account', 'date']],
    required: ['account', 'date', 'amount']
};

export default schema;
