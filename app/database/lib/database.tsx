import mysql from 'mysql2';

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
        console.log(error);
        reject(error);
      } else {
        console.log(results);
        resolve(results);
      }
    });
  });
};

export const createListWithItems = (userSub: string, title: string, items: string[]) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err);

      connection.beginTransaction(async (err) => {
        if (err) {
          connection.release();
          return reject(err);
        }

        try {
          const [listResult] = await connection.promise().query(
            'INSERT INTO lists (owner_sub, name) VALUES (?, ?)',
            [userSub, title]
          );
          // const listId = listResult.insertId;

          // const itemQueries = items.map(item =>
          //   connection.promise().query('INSERT INTO list_items (list_id, name) VALUES (?, ?)', [listId, item])
          // );

          // await Promise.all(itemQueries);

          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                reject(err);
              });
            }
            connection.release();
            resolve({ message: 'List created successfully', listResult });
          });
        } catch (err) {
          connection.rollback(() => {
            connection.release();
            reject(err);
          });
        }
      });
    });
  });
};

export const getUsersLists = (userSub: string) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err);

      connection.beginTransaction(async (err) => {
        if (err) {
          connection.release();
          return reject(err);
        }

        try {
          const [rows] = await connection.promise().query(
            'SELECT * FROM lists WHERE owner_sub = ?',
            [userSub]
          );

          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                reject(err);
              });
            }
            connection.release();
            resolve(rows);
          });
        } catch (err) {
          connection.rollback(() => {
            connection.release();
            reject(err);
          });
        }
      });
    });
  });
};

export const getList = (listName: string, user: string) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err);

      connection.beginTransaction(async (err) => {
        if (err) {
          connection.release();
          return reject(err);
        }

        try {
          console.log(listName, user);
          const [listResult] = await connection.promise().query(
            'SELECT * FROM lists WHERE name = ? AND owner_sub = ?',
            [listName, user]
          );

          if (listResult.length === 0) {
            
            connection.release();
            return resolve([]);
          }

          const listId = listResult[0].id; 

          const [rows] = await connection.promise().query(
            'SELECT * FROM list_items WHERE list_id = ?',
            [listId]
          );

          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                reject(err);
              });
            }
            connection.release();
            resolve(rows);
          });
        } catch (err) {
          connection.rollback(() => {
            connection.release();
            reject(err);
          });
        }
      });
    });
  });
};
