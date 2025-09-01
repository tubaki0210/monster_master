import mysql from 'mysql2/promise';
export const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PQSSWORD,
  database: process.env.DB,
});
