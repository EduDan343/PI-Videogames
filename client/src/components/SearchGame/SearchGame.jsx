import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.jsx';
import Videogame from '../videogame/videogame.jsx';
import { GetGameByName } from '../../redux/actions'
import './SearchGame.css'

let actualizado = false;

const SearchGame = ({searchVideogames, GetGameByName}) => {
    const { game } = useParams();
    // const [actual, setActual] = useState(false);

    useEffect( () => {
        console.log(actualizado);
        // gameActual !== game ? gameActual = game : 
        actualizado = true;
        GetGameByName(game); 
        // console.log(searchVideogames);
        console.log(actualizado)
        return () => {
            console.log('will unmount, estado variable :' + actualizado + 'game actual :' + game);
            actualizado = false;
        }
      
    },[game])

    return(
        <div className='SearchGameContainer'>
            <NavBar />
            <div className='SearchVideogames'>
                {
                    actualizado && searchVideogames.length >= 1 ? 
                    <>
                    {searchVideogames.map( videogame =>
                            videogame && 
                            <Link to={'/game/' + videogame.id} style={{ textDecoration: 'none'}}>
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

