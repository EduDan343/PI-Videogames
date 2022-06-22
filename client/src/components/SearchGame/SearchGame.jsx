import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.jsx';
import Videogame from '../videogame/videogame.jsx';
import { GetGameByName } from '../../redux/actions'
import './SearchGame.css'

let actualizado = false;
let actualgame = '';

const SearchGame = ({searchVideogames, GetGameByName}) => {
    const { game } = useParams();
    let estadoGame = searchVideogames.find( data => data.name.toLowerCase().includes(game) )

    const [actual, setActual] = useState(false);

    useEffect( () => {
        // actualgame = game;
        // gameActual !== game ? gameActual = game :
        // (actualgame !== game) ? actualizado = false : actualizado = true  
        // actualizado = true;
        // console.log(searchVideogames.find( data => data.name.toLowerCase().includes(game)));
        console.log(searchVideogames);
        console.log(game);
        let estadoGame = searchVideogames.find( data => data.name.toLowerCase().includes(game) );
        console.log(!! estadoGame);
        if(!!estadoGame) {
            // actualizado = true
            !actual && setActual(true);
        } else {
            GetGameByName(game)  
            // actualizado = false;
            actual && setActual(false);
        } 
        
        // console.log(searchVideogames);
        // console.log(actualizado)
        return () => {
            console.log('will unmount, estado variable :' + actualizado + 'game actual :' + game);
            // actualizado = false;
        }
    },[actual, searchVideogames]);

    return(
        <div className='SearchGameContainer'>
            <NavBar />
            <div className='SearchVideogames'>
                { 
                    actual && searchVideogames.length >= 1 ? 
                    <>
                    {searchVideogames.map( videogame =>
                            videogame && 
                            <Link to={'/game/' + videogame.id} style={{ textDecoration: 'none'}} key={`searchVideogamesRender${videogame.id}`}>
                                <Videogame key={videogame.id} id={videogame.id} name={videogame.name} platforms={videogame.platforms} 
                                rating={videogame.rating} genres={videogame.genres} image={videogame.image} />
                            </Link>
                    )}
                    </>
                    : <h2>Loading...</h2>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        searchVideogames: state.searchVideogames, 
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        GetGameByName: (game) => dispatch(GetGameByName(game)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchGame);

