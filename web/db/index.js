const { Pool } = require('pg');

const pool = new Pool();
console.log('in db/index.js');
module.exports = pool;
