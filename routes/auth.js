const express = require('express');
const { body } = require("express-validator");
const { loginForm, registerForm, registerUser, confirmarCuenta, loginUser, cerrarSesion } = require('../controllers/authController');
const router = express.Router();


router.get("/register", registerForm);
router.get("/login", loginForm);
router.get("/confirmarCuenta/:token", confirmarCuenta)
router.post("/register", [
    body('userName', "El usuario es obligatorio").trim().notEmpty().escape(),
    body('email', "El email es obligatorio").trim().escape().isEmail().normalizeEmail(),
    body('password', "La contraseña es obligatoria").trim().escape().isLength({min: 6}).custom((value, {req}) => {
        if(value !== req.body.password2) throw new Error("Las contraseñas no coinciden");
        return value;
    })
],registerUser);
router.post("/login", [
    body('email', "El email es obligatorio").trim().escape().isEmail().normalizeEmail(),
    body('password', "La contraseña es obligatoria").trim().escape().isLength({min: 6})
],loginUser);

router.get("/logout", cerrarSesion);

module.exports = router;