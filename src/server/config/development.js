import dotenv from 'dotenv';

dotenv.config();

export default {
  database: {
    client: 'pg',
    useNullAsDefault: true,
    connection: process.env.PG_CONNECTION,
    migrations: {
      directory: '../migrations',
      tableName: 'migrations'
    }
  },
  port: '9001'
};
