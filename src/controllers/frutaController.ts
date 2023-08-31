import sqlite3 from 'sqlite3';
import { Request, Response } from 'express';

const db = new sqlite3.Database('./api.db');

export const getAllFruit = (req: Request, res: Response) => {
  const query = 'SELECT * FROM fruit';

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error al obtener frutas:', err.message);
      return res.status(500).json({ error: 'Error al obtener frutas' });
    }

    res.json(rows);
  });
};

export const addFruit = (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'El nombre de la fruta es requerido' });
  }

  const query = 'INSERT INTO fruit (name) VALUES (?)';

  db.run(query, [name], (err) => {
    if (err) {
      console.error('Error al agregar fruta:', err.message);
      return res.status(500).json({ error: 'Error al agregar fruta' });
    }

    res.status(201).json({ message: 'Fruta agregada con éxito' });
  });
};