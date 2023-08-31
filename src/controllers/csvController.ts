import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import csv from "csv-parser";
import parse from 'csv-parse';


export const loadCsv = (req: Request, res: Response) => {
    const csvfile = req.file;
        if(!csvfile){
        return res.status(400).json({ error: 'el archivo csv es requerido' });
    }
    console.log(csvfile)
    const db = new sqlite3.Database('./api.db');

    db.serialize(()=>{
        const requiredColumns = ["Mail Agricultor", "Mail Cliente", "Nombre Campo", "Ubicación de Campo", "Fruta Cosechada", "Variedad Cosechada"];
        
        const data: any[] = [];
        fs.createReadStream(csvfile.path)
        .pipe(csv({ separator: ';' }))
        .on('data', (row) => {
            const columnErrors = requiredColumns.filter(col => !row[col]);
            if (columnErrors.length === 0){
                data.push(row);
            }
            else {
                console.error("La fila fue omitida por falta de información, las siguientes columnas son nulas para esta fila:", columnErrors);
            }
        })
        .on('end', async () => {
            for (const row of data) {
                try{
                const fruit_id = await findFruitId(db, row);
                const variety_id = await findVarietyId(db,fruit_id,row);
                const farmer_id = await findFarmerId(db, row);
                const client_id = await findClientId(db, row);
                const fields_id = await findFieldsId(db, row);

                await insertHarvest(db, [farmer_id, client_id, fields_id, variety_id]);
                }
                catch (err) {
                    console.error('Error en una operación asincrónica:', err);
                    res.status(500).json({ error: 'Error en una operación asincrónica' });
                }
            }
            console.log("Se termino correctamente la carga de datos")
            fs.unlinkSync(csvfile.path)
            }
            
            )
        })
    res.send('Archivo CSV recibido y procesado con éxito');
}

function findFruitId(db: sqlite3.Database, row:any): Promise<number>{
    return new Promise<number>((resolve, reject)=>{
        db.get('SELECT id FROM fruit WHERE name = ?', [row['Fruta Cosechada']],(err, rowFruit:{id:number}) => {
            if (err) {
                reject(err)
            }
            else{
                if(rowFruit){
                    resolve(rowFruit.id)
                }
                else {
                    db.run('INSERT INTO fruit (name) VALUES (?)', [row['Fruta Cosechada']], function (err) {
                        if (err) {
                            reject(err)
                        } 
                        else {
                            resolve(this.lastID)
                        }
                    });
                }
            }
        })
    })

}

function findVarietyId(db: sqlite3.Database, fruit_id:number, row:any): Promise<number>{
    return new Promise<number>((resolve, reject)=>{
        db.get('SELECT id FROM variety WHERE fruit_id = ? AND name = ?', [fruit_id,row['Variedad Cosechada']],(err, rowVariety:{id:number}) => {
            if (err) {
                reject(err)
            }
            else{
                if(rowVariety){
                    resolve(rowVariety.id)
                }
                else {
                    db.run('INSERT INTO variety (fruit_id, name) VALUES (?,?)', [fruit_id,row['Variedad Cosechada']], function (err) {
                        if (err) {
                            reject(err)
                        } 
                        else {
                            resolve(this.lastID)
                        }
                    });
                }
            }
        })
    })

}

function findFarmerId(db: sqlite3.Database, row:any): Promise<number>{
    return new Promise<number>((resolve, reject)=>{
        db.get('SELECT id FROM farmer WHERE mail = ?', [row['Mail Agricultor']],(err, rowFarmer:{id:number}) => {
            if (err) {
                reject(err)
            }
            else{
                if(rowFarmer){
                    resolve(rowFarmer.id)
                }
                else {
                    db.run('INSERT INTO farmer (mail, name, lastname) VALUES (?, ?, ?)', [row['Mail Agricultor'], row['Nombre Agricultor'], row['Apellido Agricultor']], function (err) {
                        if (err) {
                            reject(err)
                        } 
                        else {
                            resolve(this.lastID)
                        }
                    });
                }
            }
        })
    })

}

function findClientId(db: sqlite3.Database, row:any): Promise<number>{
    return new Promise<number>((resolve, reject)=>{
        db.get('SELECT id FROM client WHERE mail = ?', [row['Mail Cliente']],(err, rowClient:{id:number}) => {
            if (err) {
                reject(err)
            }
            else{
                if(rowClient){
                    resolve(rowClient.id)
                }
                else {
                    db.run('INSERT INTO client (mail, name, lastname) VALUES (?, ?, ?)', [row['Mail Cliente'], row['Nombre Cliente'], row['Apellido Cliente']], function (err) {
                        if (err) {
                            reject(err)
                        } 
                        else {
                            resolve(this.lastID)
                        }
                    });
                }
            }
        })
    })

}

function findFieldsId(db: sqlite3.Database, row:any): Promise<number>{
    return new Promise<number>((resolve, reject)=>{
        db.get('SELECT id FROM fields WHERE address = ? AND name = ?', [row['Ubicación de Campo'], row['Nombre Campo']],(err, rowFields:{id:number}) => {
            if (err) {
                reject(err)
            }
            else{
                if(rowFields){
                    resolve(rowFields.id)
                }
                else {
                    db.run('INSERT INTO fields (address, name) VALUES (?, ?)', [row['Ubicación de Campo'], row['Nombre Campo']], function (err) {
                        if (err) {
                            reject(err)
                        } 
                        else {
                            resolve(this.lastID)
                        }
                    });
                }
            }
        })
    })

}

function insertHarvest(db:sqlite3.Database, idsToInsert:number[]): Promise<void> {
    const query = 'INSERT INTO harvest (farmer_id, client_id, fields_id, variety_id) VALUES (?, ?, ?, ?)';
    return new Promise<void>((resolve, reject) => {
        db.run(query, idsToInsert, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}