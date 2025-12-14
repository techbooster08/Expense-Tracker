import pg from 'pg';
import dotenv from 'dotenv';


const env = dotenv.config().parsed;

// db configuration
  const  db = new pg.Client({
    user : env.DB_user,
    host : env.DB_host,
    database : env.DB_Name,
    password : env.DB_PASS,
    port : env.DB_PORT,
    ssl: true
 });

 export default db;