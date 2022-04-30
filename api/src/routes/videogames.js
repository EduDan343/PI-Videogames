const { Router } = require('express');
const Sequelize = require('sequelize')
const axios = require('axios');
const Op = Sequelize.Op;
const router = Router();
const { Videogame, Genre, API_KEY } = require('../db.js');

let nameGameApi = async(name) => {  //devuelve 15 juegos
    try {
        const {data} = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
        const apiGames = []
        if(data.results.length == 0){
            throw new Error('El juego no fue encontrado');
        }
    else{
        for (let i = 0; i < 15; i++) {
            // const games = data.results[i]
            const games = {
                id: data.results[i].id,
                name: data.results[i].name,
                platforms: data.results[i].platforms.map( p => {
                    return(
                        p.platform.name
                    )
                }),
                image: data.results[i].background_image,
                released: data.results[i].released,
                genres: data.results[i].genres.map( g => {
                    return{
                        id: g.id,
                        name: g.name,
                    }
                }),
                rating: data.results[i].rating,
            }
            apiGames.push(games)
        } 
        return apiGames;
        }
    } catch (error) {
        return null;
    }
    
}

let getApiGames = async() => {  //devuelve 100 juegos
    let apiGames = await axios.get(`https://api.rawg.io/api/games?key=${p.API_KEY}`);
    const games = []

    for (let i = 0; i < 5; i++) {
        apiGames.data.results.forEach( game => {
            let obj = {
                id: game.id,
                name: game.name,
                image: game.background_image,
                genres: game.genres.map( data => {
                    return{
                        id: data.id,
                        name: data.name
                    }
                }),
                rating: game.rating,
                platforms: game.platforms.map( p => {
                    return(
                        p.platform.name
                    )
                })
            };
            games.push(obj);
        });
        apiGames = await axios.get(`${apiGames.data.next}`);           
    }
    
    // return apiGames;
    return games;
}

router.get('/search', async(req, res, next) => {
    const { name } = req.query;
    if(!name) return next();
    try {
        if(name){
            console.log('entre a search');
            
            const findGameApi = await nameGameApi(name);
            // const dbGame = await Videogame.findAll({
            //     where: {name: `${name}`}
            // });
            const dbGame = await Videogame.findAll({
                where: { name: {[Op.like]: `%${name}%`}},
                include: [
                    {
                      model: Genre,
                      attributes: ['name'],
                      through: {
                          attributes: [],
                      }
                    }
                  ],
            });
            // console.log(findGameApi);
            if(findGameApi === 'null'){
                res.send(dbGame);
            } else{
                res.send(dbGame.concat(findGameApi).slice(0,15));
            }
            // res.send(findGameApi.concat(dbGame).slice(0,15)); //solo manda 15 juegos
        } else {
            res.send('No se mando ningun juego por query...')    
        }
    } catch (error) {
        res.send(error.message)
    }
    // res.send('entre a la ruta')
})

router.get('/', async(req, res) => {
    console.log(p.API_KEY)
    try {
        const apiGames = await getApiGames();
        const dbGames = await Videogame.findAll(
            {
            include: [
              {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
              }
            ],
        }
        );

        res.send(apiGames.concat(dbGames));  
        // console.log(apiGames);
        // console.log(dbGames);
        // res.send(dbGames)
    } catch (error) {
        res.send(error);
    }
    // res.send('entre')
})

module.exports = router;