import React from "react";
import './paginado.css'

const paginado = ({cardsPage, filteredGames, paginado, currentPage}) => {
    const pageNumbers = [];
    console.log(cardsPage)
    for (let i = 0; i < Math.ceil(filteredGames/cardsPage); i++) {
        pageNumbers.push(i+1);
    }
    console.log(pageNumbers)
    return(
        <nav className="navPaginado" key='navPaginado'>
            <a className={currentPage === 1 ? "prev limit" : "prev"} 
            onClick={() => paginado(currentPage - 1)} ><span><b>Prev</b></span></a>
            {
                pageNumbers.map( number => 
                    <a className="numeroPaginado" id={currentPage === number ? 'selected' : undefined} 
                    onClick={() => paginado(number)} key={`Paginado${number}`} >
                        <span>{number}</span>
                    </a>
                )
            }
            <a className={currentPage === Math.ceil(filteredGames/cardsPage) ? "next limit" : "next"} 
            onClick={() => paginado(currentPage + 1)} ><span><b>next</b></span></a>
        </nav>
    )
}

export default paginado;


