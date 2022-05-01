import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import './VideogameDetail.css'

const VideogameDetail = () => {
    const [videogame, setVideogame] = useState({});
    const { id } = useParams();

    useEffect( () => {
        axios.get(`/videogame/${id}`)
        .then( res => setVideogame(res.data))
        .catch( error => console.log(error) )
    },[id])
    console.log(id)
    console.log(videogame);
    return(
        <>
            <NavBar key='NavBarDetail'/>
            {
                videogame.id ?
                <div className='DetailContainer' key='VideogameDetail'>
                    <h1 id='detailName' key='detailName'>{videogame.name}</h1>
                    <div className='imgDetail' key='imgDetail'>
                        <img src={videogame.image} alt={videogame.name} />
                    </div>
                    <div className='detailInfo' key='detailInfo'>
                        <div id='detailReleased' key='detailReleased'>
                            <h4>Released</h4>
                            <span><b>{videogame.released}</b></span>
                        </div>
                        <div id='detailRating' key='detailRating'>
                            <h4>Rating</h4>
                            <span><b>{videogame.rating}</b></span>
                        </div>
                        <div id='detailGenres' key='detailGenres'>
                            <h4 >Genres</h4>
                            <div id='nameGenres' key='nameGenres'>
                                {
                                    videogame.genres.map( data => <p key={data.name}>{data.name}</p>)
                                }
                            </div>
                        </div>
                        <div id='detailPlatforms' key='detailPlatforms'>
                            <h4>Platforms</h4>
                            <div id='namePlatforms' key='namePlatforms'>
                                {
                                    typeof(videogame.id) === 'number' ?
                                    videogame.platforms.map( data => 
                                      <>
                                        <p key={data.name}>{data.name}</p> 
                                        <h4 key={data.name + 'h4'}>|</h4>
                                      </>
                                    )
                                    : videogame.platforms.map( data => 
                                        <>
                                          <p key={data}>{data}</p> 
                                          <h4 key={data + 'h4'}> | </h4>
                                        </>
                                      )
                                }
                            </div>
                        </div>
                        <div className='detailSection' key='detailSection'>
                            <h4 key='description'>Decription</h4>
                            <section key='section'>
                                {videogame.description}
                            </section>
                        </div>
                    </div>
                </div> 
                : <h2 key='Loading'>Loading...</h2>
            }
        </>
    )
}

export default VideogameDetail;