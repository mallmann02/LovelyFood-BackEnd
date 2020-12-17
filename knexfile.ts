import path from 'path';

module.exports = {
    client: 'pg',
    connection: {
        host : process.env.POSTGRESS_HOST,
        user : process.env.POSTGRESS_USER,
        password : process.env.POSTGRESS_PASSWORD,
        database : process.env.POSTGRESS_DB,
        ssl: {rejectUnauthorized: false}
    },

    migrations:{
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },

    seeds:{
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },

    pool: {min:0, max: 80},

    useNullAsDefault: true,
};
