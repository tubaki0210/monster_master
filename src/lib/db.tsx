import  mysql   from 'mysql2/promise'
export const db = mysql.createPool({
    host: "localhost",
    // port : 3306,
    user: "root",
    password: "aken12aiu",
    database: "monster_master",
  });