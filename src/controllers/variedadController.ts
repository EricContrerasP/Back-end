import sqlite3 from 'sqlite3';
import { Request, Response } from 'express';

const db = new sqlite3.Database('./api.db');
db.run('PRAGMA foreign_keys = ON')

export const getAllVariety = (req: Request, res: Response) => {
  const query = 'SELECT * FROM variety';

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error al obtener variedades:', err.message);
      return res.status(500).json({ error: 'Error al obtener variedades' });
    }

    res.json(rows);
  });
};

export const getVariety = (req: Request, res: Response) => {
  const query = 'SELECT * FROM variety WHERE id = ?';
  const variedadId = Number(req.params.id);
  if (isNaN(variedadId) || variedadId === null) {
    res.status(400).json({ error: 'ID de variedad no válido' });
    return;
  }
  db.get(query, [variedadId], (err, row) => {
    if (err) {
      console.error('Error al obtener variedad:', err.message);
      return res.status(500).json({ error: 'Error al obtener la variedad' });
    }
    if (!row) {
      res.status(404).json({ error: 'variedad no encontrada' });
      return;
    }
    res.json(row);
  });
};

export const addVariety = (req: Request, res: Response) => {
  const { fruit_id , name} = req.body;

  if (!fruit_id) {
    return res.status(400).json({ error: 'El id de fruta es requerido' });
  }
  if (!name) {
    return res.status(400).json({ error: 'el nombre de la variedad es requerido' });
  }

  const query = 'INSERT INTO variety (fruit_id, name) VALUES (?,?)';

  db.run(query, [fruit_id , name], (err) => {
    if (err) {
      console.error('Error al agregar variedad:', err.message);
      return res.status(500).json({ error: 'Error al agregar variedad' });
    }

    res.status(201).json({ message: 'Variedad agregada con éxito' });
  });
};