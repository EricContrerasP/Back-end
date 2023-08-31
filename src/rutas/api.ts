import express from "express"
import { getAllFruit, addFruit } from "../controllers/frutaController"
import { getAllVariety, addVariety } from "../controllers/VariedadController"
import { getAllField, addField } from "../controllers/campoController"
import { getAllFarmer, addFarmer } from "../controllers/agricultorController"
import { getAllClient, addClient } from "../controllers/clienteController"
import { getAllHarvest, addHarvest } from "../controllers/cosechaController"
import { loadCsv } from "../controllers/csvController"
import multer from 'multer';

const upload = multer({ dest: 'tmp/csv/' });

const router = express.Router()

router.get('/fruta', getAllFruit);
router.post("/fruta", addFruit)

router.get('/variedad', getAllVariety);
router.post("/variedad", addVariety)

router.get("/campo", getAllField)
router.post("/campo", addField)

router.get("/agricultor",getAllFarmer)
router.post("/agricultor",addFarmer)

router.get("/cliente", getAllClient)
router.post("/cliente", addClient)

router.get("/cosecha", getAllHarvest)
router.post("/cosecha", addHarvest)

router.post("/csv",upload.single("csvFile"), loadCsv)

export default router