import express from "express"

import router from "./src/rutas/api"

const app = express()
const PORT = 3000

app.use('/api', router)

// Una vez definidas nuestras rutas podemos iniciar el servidor
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
});