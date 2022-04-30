import axios from 'axios';
export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const GET_GAME_DETAIL = 'GET_GAME_DETAIL';
export const GET_GAME_BYNAME = 'GET_GAME_BYNAME';
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME';
export const CUSTOM_GAMES = 'CUSTOM_GAMES'
export const GET_GENRES = 'GET_GENRES';
export const SELECT_GENRE = 'SELECT_GENRE';
export const ORDER_GAMES = 'ORDER_GAMES';
export const SOURCE_GAMES = 'SOURCE_GAMES';
export const RATING_GAMES = 'RATING_GAMES';

export const GetAllGames = () => {
    return dispatch => {
        axios.get('/videogames')
        .then( videogames => dispatch({ type: GET_ALL_GAMES, payload: videogames.data}))
        .catch( error => console.log(error) );
    }
}

export const GetGenres = () => {
    return dispatch => {
        axios.get('/genres')
        .then( genres => dispatch({ type: GET_GENRES, payload: genres.data.genres}))
        .catch( error => console.log(error) );
    }
}

export const SelectGenre = (genre) => {
    return {
        type: SELECT_GENRE,
        payload: String(genre),
    }
}

export const SortGames = (order) => {
    return{
        type: ORDER_GAMES,
        payload: String(order),
    }
}

export const SourceGames = (source) => {
    return{
        type: SOURCE_GAMES,
        payload: String(source),
    }
}

export const RatingGames = (order) => {
    return{
        type: RATING_GAMES,
        payload: order,
    }
}

export const GetGameByName = (name) => {
    return dispatch => {
        axios.get(`/videogames/search?name=${name}`)
        .then( res => dispatch({ type: GET_GAME_BYNAME, payload: res.data }))
        .catch( error => console.log(error))
    }
}

export const CreateVideogame = (game) => {
    return dispatch => {
        axios.post(`/videogame/post`, game)
        .then( res => dispatch({ type: CREATE_VIDEOGAME, payload: res }))
        .catch( error => console.log(error))
    }
}