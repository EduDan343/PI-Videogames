import NavBar from '../NavBar/NavBar'
import './About.css'

const about = () => {
    return(
        <main className="AboutMain">
            <NavBar />
            <h1 id='AboutTitle'>Individual Project - Henry Videogames</h1>
            <div className='AboutDescription'>
                <h3>Descripcion</h3>
                <section>
                    Biblioteca de videojuegos con ¡Mas de 500 000 juegos disponibles!, en la que podras encontrar toda la informacion sobre tu juego
                    favorito.
                    Esta pagina se trata de una SPA(Single Page Aplication) para favorecer la experiencia de usuario. 
                    La informacion de los videojuegos es consultada desde la API rawg.io     
                </section>
            </div>
            <div className='aboutFuncionamiento'>
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
                <div className='funcionamientoAbout'>
                    <h3>Funcionamiento de la App Videogames</h3>
                    <h4>Puedes buscar y ordenar los juegos por:</h4>
                    <div className='ordenamiento'>
                        <span>Nombre</span>
                        <span>Id</span>
                        <span>Genero</span>
                        <span>Orden alfabetico</span>
                        <span>Rating</span>
                        <span>Origen (API , Base de datos, Todos)</span>  
                    </div>
                    <h4>Al hacer clic en una card desplegara el detalle de cada videojuego</h4>
                    <h4>Quieres crear un nuevo juego?</h4>
                    <h5>¡Adelante! Utiliza el formulario de creacion de videojuegos</h5>
                </div>
            </div>
        </main>
    )
}
export default about