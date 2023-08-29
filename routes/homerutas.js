const express = require('express');
const { leerUrls, agregarUrl, eliminarUrl, editarUrlForm, editarUrl, redireccionamiento } = require('../controllers/homeController');
const router = express.Router();
const urlValidar = require('../middlewares/urlValida');
const verificarUser = require('../middlewares/verificarUser');

//El verificar User es para verificar que el usuario este autenticado
//Funciona para proteger las rutas
router.get("/", verificarUser, leerUrls);
router.post("/", verificarUser, urlValidar, agregarUrl);
router.get("/eliminar/:id", verificarUser, eliminarUrl);
router.get("/editar/:id", verificarUser, editarUrlForm);
router.post("/editar/:id", verificarUser, urlValidar, editarUrl);
router.get("/:shortURL", redireccionamiento);



module.exports = router;

