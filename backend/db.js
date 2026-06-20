const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "loginapp",
  password: "database",
  port: 5432,
});

module.exports = pool;