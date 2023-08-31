import sqlite3 from 'sqlite3';
import { Request, Response } from 'express';

const db = new sqlite3.Database('./api.db');

export const getAllField = (req: Request, res: Response) => {
  const query = 'SELECT * FROM fields';

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error al obtener campos:', err.message);
      return res.status(500).json({ error: 'Error al obtener campos' });
    }

    res.json(rows);
  });
};

export const getFields = (req: Request, res: Response) => {
  const query = 'SELECT * FROM fields WHERE id = ?';
  const campoId = Number(req.params.id);
  if (isNaN(campoId) || campoId === null) {
    res.status(400).json({ error: 'ID de campo no válido' });
    return;
  }
  db.get(query, [campoId], (err, row) => {
    if (err) {
      console.error('Error al obtener campo:', err.message);
      return res.status(500).json({ error: 'Error al obtener la campo' });
    }
    if (!row) {
      res.status(404).json({ error: 'campo no encontrado' });
      return;
    }
    res.json(row);
  });
};

export const addField = (req: Request, res: Response) => {
  const { address , name } = req.body;

  if (!address) {
    return res.status(400).json({ error: 'La dirección del campo es requerida' });
  }
  if (!name) {
    return res.status(400).json({ error: 'El nombre del campo es requerido' });
  }

  const query = 'INSERT INTO fields (address, name) VALUES (?, ?)';

  db.run(query, [address, name], (err) => {
    if (err) {
      console.error('Error al agregar campo:', err.message);
      return res.status(500).json({ error: 'Error al agregar campo' });
    }

    res.status(201).json({ message: 'Campo agregado con éxito' });
  });
};