const express = require('express')
const app = express()
const puerto = 9000;
app.use(express.static(__dirname + "public/")); //Esto es para publicar solo los archivos de la carpeta public

app.get((res, req) =>{
    res.send("Hola mundo desde el index.js");
});

app.listen(puerto, () => console.log("Servidor iniciado en el puerto "+ puerto));