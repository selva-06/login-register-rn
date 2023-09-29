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
  () => {
    // This callback is called when the database is successfully opened.
    console.log('Database opened successfully');
  },
  error => {
    console.error('Error:', error);
  },
);
export default db;

// Ensure the table creation query is executed when the app starts.
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT)',
    [],
    (tx, results) => {
      console.log('Table created successfully');
    },
    error => {
      console.error('Error creating table:', error);
    },
  );
});

const addColumnIfNotExists = (columnName, columnType) => {
  db.transaction(tx => {
    tx.executeSql(
      `PRAGMA table_info(users)`,
      [],
      (_, results) => {
        const columnNames = results.rows.raw().map(row => row.name);
        if (!columnNames.includes(columnName)) {
          tx.executeSql(
            `ALTER TABLE users ADD COLUMN ${columnName} ${columnType}`,
            [],
            (tx, results) => {
              console.log(`Column "${columnName}" added successfully`);
            },
            error => {
              console.error(`Error adding column "${columnName}":`, error);
            },
          );
        } else {
          console.log(`Column "${columnName}" already exists`);
        }
      },
      error => {
        console.error('Error checking table info:', error);
      },
    );
  });
};

// Add lastname, gender, and dob columns
addColumnIfNotExists('lastname', 'TEXT');
addColumnIfNotExists('gender', 'TEXT');
addColumnIfNotExists('dob', 'DATE');

const insertUser = (
  name,
  email,
  password,
  lastname,
  gender,
  dob,
  onSuccess,
  onError,
) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO users (name, email, password, lastname, gender, dob) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, password, lastname, gender, dob],
      (_, results) => {
        onSuccess(results);
      },
      error => {
        onError(error);
      },
    );
  });
};

const getAllUsers = (onSuccess, onError) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM users',
      [],
      (_, results) => {
        onSuccess(results);
      },
      error => {
        onError(error);
      },
    );
  });
};

export {insertUser, getAllUsers};
