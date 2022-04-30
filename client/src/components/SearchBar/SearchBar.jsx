import React, { useState, useEffect} from "react";
import { connect } from "react-redux";
import { GetGenres, SelectGenre, SortGames, SourceGames, RatingGames } from "../../redux/actions";
import './SearchBar.css'

const SearchBar = ({videogames, genres, GetGenres, SelectGenre, SortGames, SourceGames, RatingGames}) => {
    const [AllValues, setAllValues] = useState({
        Genres : 'All',
        Source : 'All',
        Alphabetical : 'Default',
        Rating : 'Default',
    })
    useEffect( () => {
        if(genres.length === 0){
            GetGenres();
            console.log('GetGenres ejecutado...')
        }
        SelectGenre(AllValues.Genres);
        SortGames(AllValues.Alphabetical);
        SourceGames(AllValues.Source);
        RatingGames(AllValues.Rating);
    },[AllValues]);

    const handleChange = (event) => {
        setAllValues({
            ...AllValues,
            [event.target.name] : event.target.value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.value)
    }
    return(
        <div className="SearchBar">
            <div className="tituloSearchBar">
                <h4>Filter Categories</h4>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="optionDiv">
                    <h4>Genre</h4>
                    <select id="ByGenres" value={AllValues.Genres} onChange={handleChange} name='Genres'>
                        <option value='All'>All</option>
                        {
                            genres.length > 1 && (genres.map( g => 
                                <option key={g.id} value={g.name}>{g.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="optionDiv">
                    <h4>Alphabetical</h4>
                    <select id="ByAlphabetical" value={AllValues.Alphabetical} onChange={handleChange} 
                        name='Alphabetical'>
                        <option value='Default'>Default</option>
                        <option value='Z-A'>Z-A</option>    
                        <option value='A-Z'>A-Z</option>
                    </select>
                </div>
                <div className="optionDiv">
                    <h4>Source</h4>
                    <select id="BySource" value={AllValues.Source} onChange={handleChange} name='Source' >
                        <option value='All'>Data Source</option>
                        <option value='API'>API</option>
                        <option value='DATABASE'>DATABASE</option>
                    </select>
                </div>
                <div className="optionDiv">
                    <h4>Rating</h4>
                    <select id="Rating" value={AllValues.Rating} onChange={handleChange} name='Rating'>
                        <option value='Default'>Default</option>
                        <option value='HL'>High to Low</option>
                        <option value='LH'>Low to High</option>    
                    </select>   
                </div>
                {/* <button type="reset" id="ResetButton" value='Reset'>Reset Filters</button> */}
                {/* <button type="submit" id="ApplyButton" value='Filter'>Apply Filters</button> */}
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        videogames: state.videogames,
        genres : state.genres,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetGenres: () => dispatch(GetGenres()),
        SelectGenre: (genre) => dispatch(SelectGenre(genre)),
        SortGames: (order) => dispatch(SortGames(order)),
        SourceGames: (source) => dispatch(SourceGames(source)),
        RatingGames: (order) => dispatch(RatingGames(order)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchBar)
