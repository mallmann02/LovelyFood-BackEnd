import knex from 'knex';

const connection = knex({
    client: 'pg',
    connection: {
        host : process.env.POSTGRESS_HOST,
        user : process.env.POSTGRESS_USER,
        password : process.env.POSTGRESS_PASSWORD,
        database : process.env.POSTGRESS_DB,
        ssl: {rejectUnauthorized: false}
    },

    pool: {min:0, max:20},

    useNullAsDefault:true
});

export default connection;