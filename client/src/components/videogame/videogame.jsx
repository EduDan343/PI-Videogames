import icon from './nintendo.png'
import './videogame.css';

const videogame = ({name, image, genres, rating, platforms})=> {
    // console.log(platforms)
    // console.log(platforms);
    return(
        <div className='videogame'>
            
                <img src={image} alt={`Portada videojuego ${name}` } className='imgGame' />
                {/* <div className='img-card' style={{backgroundImage: `url=(${image})`}}></div> */}
            
            
                <h3 className='gameName'>{name}</h3>
            
            
                <h3 className='ratingGame'>Rating: {rating}</h3>
            
            <div className='genres'>
                <h4><b>Genres</b></h4>
                {   
                    genres.map( (item,index) => 
                        <span key={index}>{item.name}</span> 
                    )
                        // : <p>Genero no encontrado!!!</p>
                }
            </div>
            {/* <div className='platforms'>
                {
                    platforms.map( (item, index) =>
                      <>
                        <span key={index}>{item}</span>
                      </>
                    )
                }
            </div> */}
            <div className='icon-prueba'>
                {/* <img src={icon} /> */}
                {/* <img src={icon} /> */}
            </div>
        </div>
    )
}
{/* <div>
                    <ul>
                    {
                        this.props.houses && this.props.houses.map( h => 
                            <li>
                                <HouseCard 
                                    id={h.id}
                                    region={h.region}
                                    name={h.name}
                                    words={h.words}
                                    characters={h.characters}
                                />
                            </li>
                        )
                    }
                    </ul>
                </div> */}

export default videogame;