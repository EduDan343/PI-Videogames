const { Router } = require('express');
const express = require('express');
const router = Router();
const axios = require('axios');
router.use(express.json());
const { API_KEY } = require('../db.js')

const { Videogame, Genre, videogamesGenre } = require('../db.js')

let genreApi = async() => {     //devuelve todos los generos
    //const genresDb = await Genre.findAll();
    // if(genresDb.length === 0){
        
    // }
    const { data } = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genres = data.results.map(x=> {
        let obj = {}
        obj.id = x.id;
        obj.name = x.name;
        return obj;
    })
    //console.log(genresDb, genresDb.length);
    //console.log(genres)
    return genres;
}

router.get('/', async(req, res) => {
    try {
        const genreDb = await Genre.findAll();
       
        if(genreDb.length === 0){
            const genresApi = await genreApi();
            //console.log(genresApi);
            genresApi.forEach( async(element) => {
                await Genre.create( element ) 
            });
            res.send({msg: 'datos enviados a la base de datos', genres: genresApi})
        } else{
            res.send({msg: 'datos recibidos desde la base de datos...', genres : genreDb})
        }
        //res.send('Ruta games completada')      
    } catch (error) {
        res.send(error);
    }
    // res.send(genresApi)
})
module.exports = router;
