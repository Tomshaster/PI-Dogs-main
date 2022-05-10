const { Router } = require("express");
const dogs = require("../routes/dogs.js");
const temperament = require("../routes/temperaments.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use("/dogs", dogs);
router.use("/temperament", temperament);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
