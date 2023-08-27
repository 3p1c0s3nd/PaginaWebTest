const express = require('express');
const { loginForm, registerForm, registerUser, confirmarCuenta, loginUser } = require('../controllers/authController');
const router = express.Router();

router.get("/register", registerForm);
router.get("/login", loginForm);
router.get("/confirmarCuenta/:token", confirmarCuenta)
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;