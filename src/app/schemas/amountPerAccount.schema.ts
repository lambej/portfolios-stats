import {
    RxJsonSchema
} from 'rxdb';
const schema: RxJsonSchema = {
    title: 'amountperaccount schema',
    description: '',
    version: 0,
    keyCompression: false,
    type: 'object',
    properties: {
        account: {
            ref: 'account',
            default: '',
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
    indexes: ['date'],
    required: ['account', 'date', 'amount']
};

export default schema;
