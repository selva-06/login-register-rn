import SQLite from 'react-native-sqlite-storage';

const database_name = 'MyApp.db';
const database_version = '1.0';
const database_displayname = 'MyApp Database';
const database_size = 200000;

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size,
  () => {},
  error => {
    console.error('Error:', error);
  },
);

const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT)',
      [],
      (tx, results) => {},
      error => {
        console.error('Error:', error);
      },
    );
  });
};

const insertUser = (firstName, email, password, onSuccess, onError) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [firstName, email, password],
      (tx, results) => {
        onSuccess(results);
      },
      error => {
        onError(error);
      },
    );
  });
};

export {createTable, insertUser};
