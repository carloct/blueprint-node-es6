export default {
  knex: {
    development: {
      client: 'sqlite3',
      useNullAsDefault: true,
      connection: {
        filename: './example.db',
      },
    },
  },
};
