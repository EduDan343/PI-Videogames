import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {GetAllGames, CreateVideogame} from '../../redux/actions'
import Videogame from '../videogame/videogame.jsx'
import SearchBar from '../SearchBar/SearchBar.jsx';
import NavBar from '../NavBar/NavBar';
import Paginado from '../paginado/paginado.jsx'
// import axios from 'axios';
import './home.css'

const Videogames = ({ GetAllGames, filteredGames, }) => {
    // const currentCards = filteredGames.slice(0,15);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPage, setCardsPage] = useState(15);
    const indexLastCard = currentPage * cardsPage;
    const indexFirstCard = indexLastCard - cardsPage;
    const currentCards = filteredGames.slice(indexFirstCard, indexLastCard); 

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect( ()=> {
        if(filteredGames.length == 0){
            GetAllGames();
            console.log('Datos traidos de la API GetAllGames...')
        } else{
            console.log('Datos cargados desde la STORE de REDUX...')
        }
        // CreateVideogame(gameDb);
    },[])
    console.log(filteredGames);
    return(
    <main className='HomeContainer' key='HomeContainer'>
        <NavBar key='NavBar' />
        {/* <div className='Menu'> */}
            {/* <h3>Filter By:</h3> */}
        <SearchBar key='SearchBar' />    
        {/* </div> */}
        <div className='gamesContainer' key='gamesContainer' >
            <Paginado cardsPage={cardsPage} filteredGames={filteredGames.length} 
                paginado={paginado} currentPage={currentPage} key='PaginadoVideogames' />
            {
                filteredGames.length >= 1 && 
                <>
                {currentCards.map( videogame => 
                    <Link to={'/game/' + videogame.id} style={{ textDecoration: 'none'}} key={videogame.name}>
                        <Videogame  id={videogame.id} name={videogame.name} platforms={videogame.platforms} 
                        rating={videogame.rating} genres={videogame.genres} image={videogame.image} 
                        key={videogame.name} />
                    </Link>
                )}
                </>
            }
        </div>
    </main>
    )
}

const mapStateToProps = (state) => {
    return {
        videogames: state.videogames,
        filteredGames: state.filteredGames,
        createdVideogames: state.createdVideogames,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetAllGames: () => dispatch(GetAllGames()),
        CreateVideogame: (game) => dispatch(CreateVideogame(game)),
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(Videogames);