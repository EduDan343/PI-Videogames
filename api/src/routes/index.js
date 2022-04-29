const { Router } = require('express');
const express = require('express');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const axios = require('axios');
const p = process.env;


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Videogame, Genre, videogamesGenre } = require('../db.js')

const videogames = require("./videogames.js");
const genre = require("./genre.js")
const videogame = require('./videogame.js')

const router = Router();
// router.use(express.json());
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogames );
router.use("/genres", genre);
router.use('/videogame', videogame);

// router.post('/datos', async(req,res) => {
//     const{ id, name, description, released, rating, platforms } = req.body;
//     console.log(req.body);
//     try {
//         const videogame = await Videogame.create({
//             name,
//             description,
//             released,
//             rating,
//             platforms, 
//         }) 
//         res.json(videogame)
//     } catch (error) {
//         res.send(error);
//     }
// });

// router.post('/genre', async(req,res) => {
//     const { id, name } = req.body;
//     console.log(req.body);
//     try {
//         const genre = await Genre.create({
//             id,
//             name
//         })
//         res.json(genre);
//     } catch (error) {
//         res.send(error);
//     }
// })

// router.get('/all', async(req, res) => {
//     const AllData = await Videogame.findAll({include: [{model: Genre, attributes: ['name']}]});
//     const genres = await Genre.findAll();
//     console.log(AllData);
//     console.log(genres);
//     res.send(AllData.concat(genres));
// })

let genreApi = async() => {     //devuelve todos los generos
    //const genresDb = await Genre.findAll();
    // if(genresDb.length === 0){
        
    // }
    const { data } = await axios.get(`https://api.rawg.io/api/genres?key=${p.API_KEY}`);
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

// let getApiGames = async() => {  //devuelve 100 juegos
//     let apiGames = await axios.get(`https://api.rawg.io/api/games?key=${p.API_KEY}`);
//     const games = []

//     // while(games.length <= 100){}
//         // apiGames = await axios.get(`https://api.rawg.io/api/games?key=${p.API_KEY}`);
//         // let { data } = await axios.get(`https://api.rawg.io/api/games?key=${p.API_KEY}`);
        
//         // const apiGames = data.results.map( game => {
//         //     return {
//         //         id_game: game.id,
//         //         name: game.name,
//         //         image: game.background_image,
//         //         genres: game.genres.map( data => {
//         //             return{
//         //                 id: data.id,
//         //                 name: data.name
//         //             }
//         //         }),
//         //     }
//         // })

//     for (let i = 0; i < 5; i++) {
//         apiGames.data.results.forEach( game => {
//             let obj = {
//                 id: game.id,
//                 name: game.name,
//                 image: game.background_image,
//                 genres: game.genres.map( data => {
//                     return{
//                         id: data.id,
//                         name: data.name
//                     }
//                 }),
//                 rating: game.rating,
//                 platforms: game.platforms.map( p => {
//                     return(
//                         p.platform.name
//                     )
//                 })
//             };
//             games.push(obj);
//         });
//         apiGames = await axios.get(`${apiGames.data.next}`);           
//     }
    
//     // return apiGames;
//     return games;
// }

// let nameGameApi = async(name) => {  //devuelve 15 juegos
//     const {data} = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${p.API_KEY}`)
//     const apiGames = []
//     if(data.results.length == 0){
//         throw new Error('El juego no fue encontrado');
//     }
//     else{
//         for (let i = 0; i < 15; i++) {
//             // const games = data.results[i]
//             const games = {
//                 id: data.results[i].id,
//                 name: data.results[i].name,
//                 platforms: data.results[i].platforms.map( p => {
//                     return(
//                         p.platform.name
//                     )
//                 }),
//                 image: data.results[i].background_image,
//                 released: data.results[i].released,
//                 genres: data.results[i].genres.map( g => {
//                     return{
//                         id: g.id,
//                         name: g.name,
//                     }
//                 }),
//                 rating: data.results[i].rating,
//             }
//             apiGames.push(games)
//         } 
//         return apiGames;
//     }
// }

let idGameAPi = async(id) => {
    try {
        const {data} = await axios.get(`https://api.rawg.io/api/games/${id}?key=${p.API_KEY}`);
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

// router.get('/genres', async(req, res) => {
//     try {
//         //const { data } = await axios.get(`https://api.rawg.io/api/games?key=${p.API_KEY}`);
//         //const data = await fetch(`https://api.rawg.io/api/games?key=34ddc96f729d4ffeacd17d78eb1dd99e`)
//         //const listGames = data.results.map(x=> x.name)
//         //console.log(data.results.map(x=> x.name))
//         const genreDb = await Genre.findAll();
//         //console.log(genreDb, genreDb.length, typeof(genreDb), Array.isArray(genreDb))
//         if(genreDb.length === 0){
//             const genresApi = await genreApi();
//             //console.log(genresApi);
//             genresApi.forEach( async(element) => {
//                 await Genre.create( element ) 
//             });
//             res.send({msg: 'datos enviados a la base de datos', genres: genresApi})
//         } else{
//             res.send({msg: 'datos recibidos desde la base de datos...', genres : genreDb})
//         }
//         //res.send('Ruta games completada')      
//     } catch (error) {
//         res.send(error);
//     }
// })

// router.get('/videogames', async(req, res, next) => {
//     const { name } = req.query;
//     if(!name) return next();
//     try {
//         if(name){
//             const findGameApi = await nameGameApi(name);
//             // const dbGame = await Videogame.findOne({
//             //     where: {name: `${name}`}
//             // });
//             const dbGame = await Videogame.findOne({
//                 where: { name: {[Op.like]: `%${name}%`}}
//             });
//             console.log(findGameApi);
//             console.log(dbGame);
//             res.send(findGameApi.concat(dbGame).slice(0,15)); //solo manda 15 juegos
//         } else {
//             res.send('No se mando ningun juego por query...')    
//         }
//     } catch (error) {
//         res.send(error.message)
//     }
// })

// router.get('/videogames', async(req, res) => {
//     // const { name } = req.query;
//     try {
//         const apiGames = await getApiGames();
//         const dbGames = await Videogame.findAll({
//             include: [
//               {
//                 model: Genre,
//                 attributes: ["name"],
//                 through: {
//                     attributes: [],
//                 }
//               }
//             ],
//         });
//         console.log(apiGames);
//         console.log(dbGames);
//         res.send(apiGames.concat(dbGames));  
//     } catch (error) {
//         res.send(error);
//     }
// })

router.get('/videogame/:id', async(req, res) => {
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


module.exports = router;
