const express = require('express');
const { leerUrls, agregarUrl, eliminarUrl, editarUrlForm, editarUrl, redireccionamiento } = require('../controllers/homeController');
const router = express.Router();
const urlValidar = require('../middlewares/urlValida');

router.get("/", leerUrls);
router.post("/", urlValidar, agregarUrl);
router.get("/eliminar/:id", eliminarUrl);
router.get("/editar/:id", editarUrlForm);
router.post("/editar/:id", urlValidar, editarUrl);
router.get("/:shortURL", redireccionamiento);



module.exports = router;

