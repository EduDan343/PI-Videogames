import { Link } from 'react-router-dom';
import './initialPage.css'

const initialPage = () => {
    return(
        <main className='introPage'>
            <div className='introText'>
                <h1>App Games library...</h1>
            </div>
            <div className='introButton'>
                <Link to='/home'>
                    <button id='linkButton' type='button'>Explore now!!!</button>
                </Link>
            </div>
        </main>        
    )
}

export default initialPage;