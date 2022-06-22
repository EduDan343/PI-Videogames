import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './NavBar.css'

const NavBar = () => {
    const [input, setInput] = useState('')

    useEffect( () => {
        console.log(input);
    })

    const handleChangeInput = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // alert('Your favorite flavor is: ' + this.state.value);
        console.log(input)
    }

    return (
        <div className='NavContainer'>
            <div className='nameApp'>
                <Link to={'/home'} >
                    <h3 id='appVideogames'>Videogames APP</h3>
                </Link>
            </div>
            <div className='NavSearch'>
                <form onSubmit={handleSubmit} className='formNavSearch'>
                    <input className='inputSearch' type='search' name='searchGame' placeholder='Search videogame by name' 
                        onChange={handleChangeInput} />
                    <Link to={'/search/' + input} >
                        <input type='submit' className='BtnSearch' name='btnSearch' value='Search' />
                    </Link>
                </form>
            </div>
            <div className='NavLinks'>
                <Link to={'/home'}>
                    <h4 id='home'>HOME</h4>
                </Link>
                <h3 className='separador'><b>|</b></h3>
                <Link to={'/creategame'}>
                    <h4 id='creategame'>CREATE GAME</h4>
                </Link>
                <h3 className='separador'><b>|</b></h3>
                <Link to={'/about'} >
                    <h4 id='about'>ABOUT</h4>
                </Link>
            </div>
        </div>
    )
}

export default NavBar;
