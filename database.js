import sqlite3 from 'sqlite3';
const db = new sqlite3.Database("./dates.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

let sql;

sql = `CREATE TABLE dates(id INTEGER PRIMARY KEY, date)`;
db.run(sql);