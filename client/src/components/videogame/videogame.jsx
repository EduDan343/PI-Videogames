import './videogame.css';

const videogame = ({name, image, genres, rating, platforms})=> {
    return(
        <div className='videogame'>
            
            <img src={image} alt={`Portada videojuego ${name}` } className='imgGame' />
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

export default videogame;