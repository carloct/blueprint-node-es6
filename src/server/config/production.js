export default {
  knex: {
    client: 'pg',
    useNullAsDefault: true,
    connection: process.env.PG_CONNECTION,
    migrations: {
      directory: '../migrations',
      tableName: 'migrations'
    }
  }
};
