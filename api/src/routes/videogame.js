const { Router } = require('express');
const router = Router();
const { Videogame } = require('../db.js')

router.post('/post', async(req,res) => {
    const { name, description, released, rating, platforms, image, genresId } = req.body;
    console.log(req.body);
    // console.log(id_genre, typeof(id_genre))
    try {
        const games = await Videogame.create({
            //id_Api, //requerido INTEGER
            name,   //requerido STRING
            description,    //requerido TEXT
            released,   //opcional  STRING
            rating,     //opcional  DECIMAL
            platforms,  //requerido ARRAY
            image,   //opcional
            // genres: [{id: 747, name: "Doomgame"}]
        });
        // const vinculacion = await games.addGenre(parseInt(id_genre))
        const vinculacion = await games.addGenres(genresId)
        // const vinculacion = genresId.map( async(genre) => 
        //     await games.addGenre(parseInt(genre))
        // );   
        res.json(vinculacion);
    } catch (error) {
        res.send(error);
    }
    // res.send({name, description, released, rating, platforms, image, genresId, name_genre})
});

module.exports = router;