import sqlite3 from 'sqlite3';
import { Request, Response } from 'express';

// Crear una nueva instancia de la base de datos
const db = new sqlite3.Database('./api.db');
db.run('PRAGMA foreign_keys = ON')
export const getAllHarvest = (req: Request, res: Response) => {
  const query = 'SELECT * FROM harvest';

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error al obtener cosechas:', err.message);
      return res.status(500).json({ error: 'Error al obtener cosechas' });
    }

    res.json(rows);
  });
};

export const addHarvest = (req: Request, res: Response) => {
  const {farmer_id, client_id, fields_id, variety_id} = req.body;

  if (!farmer_id) {
    return res.status(400).json({ error: 'farmer_id es requerido' });
  }
  if (!client_id) {
    return res.status(400).json({ error: 'client_id es requerido' });
  }
  if (!fields_id) {
    return res.status(400).json({ error: 'fields_id es requerido' });
  }
  if (!variety_id) {
    return res.status(400).json({ error: 'variety_id es requerido' });
  }

  const query = 'INSERT INTO harvest (farmer_id, client_id, fields_id, variety_id) VALUES (?, ?, ?, ?)';

  db.run(query, [farmer_id, client_id, fields_id, variety_id], (err) => {
    if (err) {
      console.error('Error al agregar cosecha:', err.message);
      return res.status(500).json({ error: 'Error al agregar cosecha' });
    }
    res.status(201).json({ message: 'Cosecha agregada con éxito' });
  });
  // db.run(query, [farmer_id, client_id, fields_id, variety_id], (err) => {
  //   if (err) {
  //     console.error('Error al agregar cosecha:', err.message);
  //     return res.status(500).json({ error: 'Error al agregar cosecha' });
  //   }
  //   res.status(201).json({ message: 'Cosecha agregada con éxito' });
  // });
};