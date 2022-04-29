import NavBar from '../NavBar/NavBar'
import './About.css'

const about = () => {
    return(
        <main className="AboutMain">
            <NavBar />
            <h1 id='AboutTitle'>Individual Project - Henry Videogames</h1>
            <div className='Tecnologias'>
                <h3>Tecnologias usadas: </h3>
                    <ul className='ListaAbout'>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>React</li>
                        <li>Redux</li>
                        <li>NodeJs</li>
                        <li>Sequelize</li>
                        <li>PostgreSQL</li>
                    </ul>
            </div>
            <div className='AboutDescription'>
                <h3>Descripcion</h3>
                <section>Descripcion: App desarrollada con el tema de Videojuegos, se trata de una SPA(single page aplication) en la cual
                    la informacion es obtenida desde una API de videojuegos.     
                </section>
            </div>
            <div className='funcionamientoAbout'>
                <h3>Funcionamiento de la App Videogames</h3>
                <ul>
                    <li>Busqueda de videojuegos por nombre</li>
                    <li>Formulario para creacion de videojuegos</li>
                    <li>Filtrado y ordenamiendo de los videojuegos, donde podemos filtrar por:
                        <ul>
                            <li>Genero</li>
                            <li>Orden alfabetico</li>
                            <li>Rating</li>
                            <li>Origen (API , Base de datos, Todos)</li>  
                        </ul>
                    </li>
                    <li>Detalle de cada videojuego</li>
                </ul>
            </div>
        </main>
    )
}
export default about