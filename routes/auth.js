const express = require('express');
const router = express.Router();


router.get("/login", (req, res) => {
    res.render("login", {titulo: "Titulo Login"});
});

module.exports = router;