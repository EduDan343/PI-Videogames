import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import './VideogameDetail.css'

const VideogameDetail = () => {
    const [videogame, setVideogame] = useState({});
    const { id } = useParams();

    useEffect( () => {
        axios.get(`http://localhost:3001/videogame/${id}`)
        .then( res => setVideogame(res.data))
        .catch( error => console.log(error) )
    },[id])
    console.log(id)
    console.log(videogame);
    return(
        <>
            <NavBar />
            {
                videogame.id ?
                <div className='DetailContainer'>
                    <h1 id='detailName'>{videogame.name}</h1>
                    <div className='imgDetail'>
                        <img src={videogame.image} alt={videogame.name} />
                    </div>
                    <div className='detailInfo'>
                        <div id='detailReleased'>
                            <h4>Released</h4>
                            <span><b>{videogame.released}</b></span>
                        </div>
                        <div id='detailRating'>
                            <h4>Rating</h4>
                            <span><b>{videogame.rating}</b></span>
                        </div>
                        <div id='detailGenres'>
                            <h4>Genres</h4>
                            <div id='nameGenres'>
                                {
                                    videogame.genres.map( data => <p key={data.name}>{data.name}</p>)
                                }
                            </div>
                        </div>
                        <div id='detailPlatforms'>
                            <h4>Platforms</h4>
                            <div id='namePlatforms'>
                                {
                                    typeof(videogame.id) === 'number' ?
                                    videogame.platforms.map( data => 
                                      <>
                                        <p key={data.name}>{data.name}</p> 
                                        <h4>|</h4>
                                      </>
                                    )
                                    : videogame.platforms.map( data => 
                                        <>
                                          <p key={data}>{data}</p> 
                                          <h4>|</h4>
                                        </>
                                      )
                                }
                            </div>
                        </div>
                        <div className='detailSection'>
                            <h4>Decription</h4>
                            <section >
                                {videogame.description}
                            </section>
                        </div>
                    </div>
                </div> 
                : <h2>Loading...</h2>
            }
        </>
    )
}

export default VideogameDetail;