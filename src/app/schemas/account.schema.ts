import {
    RxJsonSchema
} from 'rxdb';
const schema: RxJsonSchema = {
    title: 'account schema',
    description: 'describes an investment account',
    version: 0,
    keyCompression: false,
    type: 'object',
    properties: {
        name: {
            type: 'string',
            primary: true,
            default: ''
        },
        type: {
            type: 'string',
            default: '',
            enum: ['Reer', 'Celi', 'Marge', 'Comptant', 'Cri']
        },
        institution: {
            type: 'string',
            default: ''
        },
    },
    required: ['name', 'type']
};

export default schema;
