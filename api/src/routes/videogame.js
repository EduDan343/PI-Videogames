const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genre, API_KEY } = require('../db.js')
const router = Router();

let idGameAPi = async(id) => {
    try {
        const {data} = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        // if(!data.id) throw new Error('El juego no fue encontrado');
        // console.log(data.id, data.results);
        const gameDetail = {
                id: data.id,
                name: data.name,
                image: data.background_image,
                rating: data.rating,
                released: data.released ,
                genres: data.genres.map( data => {
                    return{
                        id: data.id,
                        name: data.name,
                    }
                }),
                platforms: data.platforms.map( data => {
                    return{
                        id: data.platform.id,
                        name: data.platform.name,
                    }
                }),          //array dentro de otro array checar como viene la info...
                description: data.description_raw,  //texto plano sin etiqueta <p>
            };
        return gameDetail; 
    } catch (error) {
        throw new Error('El juego no fue encontrado!!!!:u');
    }
}

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    console.log(req.params, id, typeof(id));
    try {
        if(id){
            // if(id.length <=5){
            if(Number(id)){
                const idGame = await idGameAPi(id);
                // console.log(id);
                console.log(idGame);
                res.send(idGame);
            } else{
                let dbGame = await Videogame.findByPk(id, {
                    include: [
                        {
                          model: Genre,
                          attributes: ["name"],
                          through: {
                            attributes: [],
                          },
                        }
                    ],
                });
                console.log(dbGame);
                res.send(dbGame);
            }
        }
        else{
            res.send('No se recibio el id del juego...')
        }  
    } catch (error) {
        res.send(error.message);
    }
   
});

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