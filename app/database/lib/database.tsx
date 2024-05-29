import mysql from 'mysql';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


export const getAllLists = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM lists';
    pool.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

