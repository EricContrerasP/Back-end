"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database('./api.db');
db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS fruit (\n        id INTEGER PRIMARY KEY,\n        name TEXT UNIQUE\n      )");
    db.run("CREATE TABLE IF NOT EXISTS variety (\n        id INTEGER PRIMARY KEY,\n        fruit_id INTEGER NOT NULL, \n        name TEXT NOT NULL,\n        FOREIGN KEY (fruit_id)\n            REFERENCES fruit (id),\n        UNIQUE(fruit_id, name)\n      )");
    db.run("CREATE TABLE IF NOT EXISTS farmer (\n        id INTEGER PRIMARY KEY,\n        mail TEXT UNIQUE,\n        name TEXT,\n        lastname TEXT\n      )");
    db.run("CREATE TABLE IF NOT EXISTS fields (\n        id INTEGER PRIMARY KEY,\n        address TEXT, \n        name TEXT,\n        UNIQUE(address, name)\n      )");
    db.run("CREATE TABLE IF NOT EXISTS client (\n        id INTEGER PRIMARY KEY,\n        mail TEXT UNIQUE,\n        name TEXT,\n        lastname TEXT\n      )");
    db.run("CREATE TABLE IF NOT EXISTS harvest (\n        id INTEGER PRIMARY KEY,\n        farmer_id INTEGER NOT NULL,\n        client_id INTEGER NOT NULL,\n        fields_id INTEGER NOT NULL,\n        variety_id INTEGER NOT NULL,\n        FOREIGN KEY (farmer_id)\n            REFERENCES farmer (id),\n        FOREIGN KEY (client_id)\n            REFERENCES client (id),\n        FOREIGN KEY (fields_id)\n            REFERENCES fields (id),\n        FOREIGN KEY (variety_id)\n            REFERENCES variety (id)\n      )");
});
db.all("SELECT name FROM sqlite_master WHERE type='table';", function (err, tables) {
    if (err) {
        console.error('Error al consultar las tablas:', err.message);
    }
    else {
        console.log('Tablas en la base de datos:');
        tables.forEach(function (table) {
            console.log(table.name);
        });
    }
});
db.close(function (err) {
    if (err) {
        console.error('Error al cerrar la base de datos:', err.message);
    }
    else {
        console.log('Base de datos cerrada con éxito');
    }
});
