import * as sqlite3 from "sqlite3"

const db = new sqlite3.Database('./api.db');

db.serialize(() =>{


    db.run(`CREATE TABLE IF NOT EXISTS fruit (
        id INTEGER PRIMARY KEY,
        name TEXT UNIQUE
      )`)
    
    db.run(`CREATE TABLE IF NOT EXISTS variety (
        id INTEGER PRIMARY KEY,
        fruit_id INTEGER NOT NULL, 
        name TEXT NOT NULL,
        FOREIGN KEY (fruit_id)
            REFERENCES fruit (id),
        UNIQUE(fruit_id, name)
      )`)
    db.run(`CREATE TABLE IF NOT EXISTS farmer (
        id INTEGER PRIMARY KEY,
        mail TEXT UNIQUE,
        name TEXT,
        lastname TEXT
      )`)
    db.run(`CREATE TABLE IF NOT EXISTS fields (
        id INTEGER PRIMARY KEY,
        address TEXT, 
        name TEXT,
        UNIQUE(address, name)
      )`)
    db.run(`CREATE TABLE IF NOT EXISTS client (
        id INTEGER PRIMARY KEY,
        mail TEXT UNIQUE,
        name TEXT,
        lastname TEXT
      )`)
    db.run(`CREATE TABLE IF NOT EXISTS harvest (
        id INTEGER PRIMARY KEY,
        farmer_id INTEGER NOT NULL,
        client_id INTEGER NOT NULL,
        fields_id INTEGER NOT NULL,
        variety_id INTEGER NOT NULL,
        FOREIGN KEY (farmer_id)
            REFERENCES farmer (id),
        FOREIGN KEY (client_id)
            REFERENCES client (id),
        FOREIGN KEY (fields_id)
            REFERENCES fields (id),
        FOREIGN KEY (variety_id)
            REFERENCES variety (id)
      )`)
})

db.all("SELECT name FROM sqlite_master WHERE type='table';", (err, tables: { name: string }[]) => {
    if (err) {
      console.error('Error al consultar las tablas:', err.message);
    } else {
      console.log('Tablas en la base de datos:');
      tables.forEach((table) => {
        console.log(table.name);
      });
    }
})

db.close((err) => {
  if (err) {
    console.error('Error al cerrar la base de datos:', err.message);
  } else {
    console.log('Base de datos cerrada con éxito');
  }
});
