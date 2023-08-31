import sqlite3 from 'sqlite3';
import { Request, Response } from 'express';

const db = new sqlite3.Database('./api.db');

export const getAllClient = (req: Request, res: Response) => {
  const query = 'SELECT * FROM client';

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error al obtener clientes:', err.message);
      return res.status(500).json({ error: 'Error al obtener clientes' });
    }

    res.json(rows);
  });
};

export const getClient = (req: Request, res: Response) => {
  const query = 'SELECT * FROM client WHERE id = ?';
  const clienteId = Number(req.params.id);
  if (isNaN(clienteId) || clienteId === null) {
    res.status(400).json({ error: 'ID de cliente no válido' });
    return;
  }
  db.get(query, [clienteId], (err, row) => {
    if (err) {
      console.error('Error al obtener cliente:', err.message);
      return res.status(500).json({ error: 'Error al obtener la cliente' });
    }
    if (!row) {
      res.status(404).json({ error: 'cliente no encontrado' });
      return;
    }
    res.json(row);
  });
};

export const addClient = (req: Request, res: Response) => {
  const { mail , name , lastname } = req.body;

  if (!mail) {
    return res.status(400).json({ error: 'El mail del cliente es requerido' });
  }
  if (!name) {
    return res.status(400).json({ error: 'El nombre del cliente es requerido' });
  }
  if (!lastname) {
    return res.status(400).json({ error: 'El apellido del cliente es requerido' });
  }

  const query = 'INSERT INTO client (mail, name, lastname) VALUES (?, ?, ?)';

  db.run(query, [mail, name, lastname], (err) => {
    if (err) {
      console.error('Error al agregar cliente:', err.message);
      return res.status(500).json({ error: 'Error al agregar cliente' });
    }

    res.status(201).json({ message: 'Cliente agregado con éxito' });
  });
};