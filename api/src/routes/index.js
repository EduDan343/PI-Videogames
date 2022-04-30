const { Router } = require('express');
const router = Router();


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Videogame, Genre, videogamesGenre } = require('../db.js')

const videogames = require("./videogames.js");
const genre = require("./genre.js")
const videogame = require('./videogame.js')

// router.use(express.json());
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogames );
router.use("/genres", genre);
router.use('/videogame', videogame);

module.exports = router;
