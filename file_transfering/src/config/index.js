const host = process.env.DB_HOST;
const port = parseInt(process.env.DB_PORT, 10);
const name = process.env.MONGO_INITDB_DATABASE;

const config = {
  app: {
    port: parseInt(process.env.APP_PORT, 10),
    host: process.env.APP_HOST,
  },
  db: { host, port, name },
};

module.exports = config;
