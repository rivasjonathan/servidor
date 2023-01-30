const { promisify }= require('util');
const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://certificacion_user:Et3wAYF3I4Lx4tBkWO8pt1NVdgJUScZ7@dpg-cf9jbu9a6gdtmi6h75og-a.oregon-postgres.render.com/certificacion",
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

module.exports = client