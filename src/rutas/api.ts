import express from "express"
import { getAllFruit,getFruit, addFruit } from "../controllers/frutaController"
import { getAllVariety,getVariety, addVariety } from "../controllers/VariedadController"
import { getAllField,getFields, addField } from "../controllers/campoController"
import { getAllFarmer,getFarmer, addFarmer } from "../controllers/agricultorController"
import { getAllClient,getClient, addClient } from "../controllers/clienteController"
import { getAllHarvest,getHarvest, addHarvest } from "../controllers/cosechaController"
import { loadCsv } from "../controllers/csvController"
import multer from 'multer';

const upload = multer({ dest: 'tmp/csv/' });

const router = express.Router();

router.get('/fruta', getAllFruit);
router.get('/fruta/:id', getFruit);
router.post("/fruta", addFruit);

router.get('/variedad', getAllVariety);
router.get('/variedad/:id', getVariety);
router.post("/variedad", addVariety);

router.get("/campo", getAllField);
router.get("/campo/:id", getFields);
router.post("/campo", addField);

router.get("/agricultor",getAllFarmer);
router.get("/agricultor/:id",getFarmer);
router.post("/agricultor",addFarmer);

router.get("/cliente", getAllClient);
router.get("/cliente/:id", getClient);
router.post("/cliente", addClient);

router.get("/cosecha", getAllHarvest);
router.get("/cosecha/:id", getHarvest);
router.post("/cosecha", addHarvest);

router.post("/csv",upload.single("csvFile"), loadCsv);

export default router