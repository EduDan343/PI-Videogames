import { GET_ALL_GAMES, GET_GAME_DETAIL, GET_GAME_BYNAME, GET_GENRES, CREATE_VIDEOGAME, SELECT_GENRE, 
        ORDER_GAMES, SOURCE_GAMES, RATING_GAMES } from '../actions';

const initialState = {
    videogames: [],
    genres: [],
    filteredGames: [],
    prevFilteredGames: [],
    createdVideogames: [],
    searchVideogames: [],
}
const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_ALL_GAMES:
            return{
                ...state,
                videogames: action.payload,
                filteredGames: action.payload
            }
        
        case GET_GENRES:
            return{
                ...state,
                genres: action.payload,
            }

        case SELECT_GENRE:
            if(action.payload === 'All'){
                return{
                    ...state,
                    filteredGames: state.videogames
                } 
            } 
            let genreVideogames = state.videogames.filter(item => item.genres.map(data => data.name).includes(action.payload));
            return{
                ...state,
                filteredGames: genreVideogames,
            }

        case ORDER_GAMES:
            if(action.payload === 'Default'){
                return {
                    ...state,
                    filteredGames: state.filteredGames
                }
            } else {
                let orderVideogames = [...state.filteredGames]
                orderVideogames = orderVideogames.sort((a,b) =>{
                    if(a.name > b.name){
                        return 1
                    }
                    if(a.name < b.name) {
                        return -1
                    }
                    return 0
                })
                if(action.payload === 'A-Z'){
                    return{
                        ...state,
                        filteredGames: orderVideogames
                    }
                }
                else{
                    return {
                        ...state,
                        filteredGames: orderVideogames.reverse(),
                    }
                }
            }

        case SOURCE_GAMES:
            if(action.payload === 'All'){
                return{
                    ...state,
                    filteredGames: state.filteredGames,
                }
            } else {
                // let sourceGames = state.filteredGames;
                if(action.payload === 'API'){
                    let sourceGames = state.filteredGames.filter( item => typeof(item.id) === 'number')
                    return{
                        ...state,
                        filteredGames: sourceGames
                    }
                } else{
                    let sourceGames = state.filteredGames.filter( item => typeof(item.id) === 'string' )
                    return{
                        ...state,
                        filteredGames: sourceGames,
                    }
                }
            }

        case RATING_GAMES:
            if(action.payload === 'Default'){
                return{
                    ...state,
                    filteredGames: state.filteredGames
                }
            } else{
                let ratingGames = [...state.filteredGames];
                ratingGames = ratingGames.sort( (a,b) => a.rating - b.rating )
                if(action.payload === 'LH'){
                    return{
                        ...state,
                        filteredGames: ratingGames
                    }
                } else{
                    return{
                        ...state,
                        filteredGames: ratingGames.reverse()
                    }
                }

            }

        case GET_GAME_BYNAME:
            return{
                ...state,
                searchVideogames: action.payload,
            }

        case CREATE_VIDEOGAME:
            return{
                ...state,
                createdVideogames: state.createdVideogames.concat(action.payload) 
            }

        default:
            return {...state}       
    }
}

export default rootReducer;