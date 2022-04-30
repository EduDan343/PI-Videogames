const { Router } = require('express');
const express = require('express');
const router = Router();
const axios = require('axios');
router.use(express.json());

const { Genre, API_KEY } = require('../db.js')

let genreApi = async() => {     //devuelve todos los generos
    const { data } = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genres = data.results.map(x=> {
        let obj = {}
        obj.id = x.id;
        obj.name = x.name;
        return obj;
    })
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
    } catch (error) {
        res.send(error);
    }
})
module.exports = router;
