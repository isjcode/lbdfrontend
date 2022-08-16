import react, { useContext, useEffect, useState } from "react";
import "../../assets/styles/findMovieModal.css";
import {UserContext} from "../../UserContext";
import debounce from 'lodash/debounce';
import { nanoid } from "nanoid";

function FindMovieModal({closeFindMovieModal}) {
    const [ searchMovie, setSearchMovie ] = useState("");
    const [ movies, setMovies ] = useState([]);
    const [years, setYears ] = useState([]);

    useEffect(() => {
        console.log("here");
        if (searchMovie.trim().length !== 0) {
            fetch(`http://localhost:64531/api/movies/findmovie?str=${searchMovie}`, {
                method: "POST",
                headers: {
                'Content-Type': 'application/json',
            },
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setMovies(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        fetch(`http://localhost:64531/api/movies/getyears`, {
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
        },
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setYears(data.result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [searchMovie]);

    const handleChange = (e) => {
        setSearchMovie(e.target.value);
    }

    console.log(years);
     

    return (
        <div className="mainModal">
            <div className="backgroundContainer">
            </div>
            <form className="mainContainer">
                <button className="modalCloseBtn" onClick={() => closeFindMovieModal(false)}> <i className="fa-solid fa-xmark"></i> </button>
                <div className="modalTextInput">
                    <label htmlFor="moviename"> Name of Film </label>
                    <input name="moviename" value={searchMovie || ""} onChange={handleChange} type="text" id="moviename" required /> 
                    {
                        movies.length !== 0 ? (
                            <div className="movies">
                                {movies.map(m => <button key={nanoid()} className="movie"> {m.name} {years && `(${years.find(y => y.id == m.yearID).yearNumber})`} </button>)}
                            </div>
                        )
                        :
                        null
                    }
                </div>
            </form>
        </div>
    )
}

export default FindMovieModal;
