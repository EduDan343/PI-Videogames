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
    // let apiGames = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i+1}`);
    let games = [];
    // const pageGames = [];
    const apiGames = async(page) => {
        return await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`)
    }
    
    //for (let i = 0; i < ciclos; i++) {
        //pageGames.push(apiGames(i+1))
        // apiGames.data.results.forEach( game => {
        //     let obj = {
        //         id: game.id,
        //         name: game.name,
        //         image: game.background_image,
        //         genres: game.genres.map( data => {
        //             return{
        //                 id: data.id,
        //                 name: data.name
        //             }
        //         }),
        //         rating: game.rating,
        //         platforms: game.platforms.map( p => {
        //             return(
        //                 p.platform.name
        //             )
        //         })
        //     };
        //     games.push(obj);
        // });
        // console.log(apiGames.data.next, apiGames)
        // console.log(apiGames);
        // apiGames = await axios.get(`${apiGames.data.next}`);           
    //}

    // console.log(pageGames);

    await Promise.all([apiGames(1),apiGames(2),apiGames(3),apiGames(4),apiGames(5)])
    .then( res => {
        console.log(res)
        for (let i = 0; i < res.length; i++) {
            res[i].data.results.forEach( game => {
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
        }
    }).catch ( err => {
        console.warn( err )
        throw new Error('Error al buscar los 100 juegos...');
    })

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
        // res.send(apiGames.concat(dbGames));
        console.log(apiGames);
        res.send(apiGames);
        // res.send(apiGames)  
    } catch (error) {
        res.send(error.message);
        // res.send('entre al catch videogames')
    }
    // res.send('entre')
})

module.exports = router;