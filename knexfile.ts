import path from 'path';

module.exports = {
    client: 'pg',
    connection: {
        host : 'ec2-54-205-248-255.compute-1.amazonaws.com',
        user : 'sjeujmtugnzbtg',
        password : 'c48393a22783d65723997d5a3e87f11698ad6d435ae774944f2093ef427e56f8',
        database : 'd4ckflog1n3q2n'
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
