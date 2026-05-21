const Database = require('better-sqlite3');
const db = new Database('wohnheim.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        room TEXT,
        start_date TEXT,
        end_date TEXT,
        start_time TEXT,
        end_time TEXT
    )
`);

module.exports = db;