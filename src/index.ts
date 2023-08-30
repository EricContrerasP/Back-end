import express from "express"

import router from "./rutas/api"

import bodyParser from 'body-parser';


const app = express()
const PORT = 3000

app.use(bodyParser.json());

app.use('/api', router)

// Una vez definidas nuestras rutas podemos iniciar el servidor
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
});