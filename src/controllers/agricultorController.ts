import sqlite3 from 'sqlite3';
import { Request, Response } from 'express';

const db = new sqlite3.Database('./api.db');

export const getAllFarmer = (req: Request, res: Response) => {
  const query = 'SELECT * FROM farmer';

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error al obtener agricultores:', err.message);
      return res.status(500).json({ error: 'Error al obtener agricultores' });
    }

    res.json(rows);
  });
};

export const addFarmer = (req: Request, res: Response) => {
  const { mail , name , lastname } = req.body;

  if (!mail) {
    return res.status(400).json({ error: 'El mail del agricultor es requerido' });
  }
  if (!name) {
    return res.status(400).json({ error: 'El nombre del agricultor es requerido' });
  }
  if (!lastname) {
    return res.status(400).json({ error: 'El apellido del agricultor es requerido' });
  }

  const query = 'INSERT INTO farmer (mail, name, lastname) VALUES (?, ?, ?)';

  db.run(query, [mail, name, lastname], (err) => {
    if (err) {
      console.error('Error al agregar agricultor:', err.message);
      return res.status(500).json({ error: 'Error al agregar agricultor' });
    }

    res.status(201).json({ message: 'Agricultor agregado con éxito' });
  });
};