import express from "express"

const router = express.Router()


router.post("/fruta", (_req, res) =>{
    res.send('guardar una fruta nueva')
})

router.post("/campo", (_req, res) =>{
    res.send('guardar un campo nuevo')
})

router.post("/agricultor", (_req, res) =>{
    res.send('guardar un agri nuevo')
})

router.post("/cliente", (_req, res) =>{
    res.send('guardar un cliente')
})

router.post("/csv", (_req, res) =>{
    res.send('guardar un csv completo')
})

export default router