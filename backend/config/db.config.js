import pg from 'pg';

// db configuration
  const  db = new pg.Client({
    user : process.env.DB_user,
    host : process.env.DB_host,
    database : process.env.DB_Name,
    password : process.env.DB_PASS,
    port : process.env.DB_PORT,
    ssl: true
 });

 export default db;