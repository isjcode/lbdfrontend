import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "../../assets/styles/movie.css";
import 'react-tabs/style/react-tabs.css';
import { nanoid } from "nanoid";


function Movie() {
    const [years, setYears] = useState([]);
    const [movie, setMovie] = useState(null);
    const [people, setPeople] = useState([]);
    const [genres, setGenres] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams(); 

    useEffect(() => {
        fetch(`http://localhost:64531/api/movies/getbyid?id=${searchParams.get("id")}`, {
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
        },
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setMovie(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
         fetch(`http://localhost:64531/api/people/getmoviepeople?id=${searchParams.get("id")}`, {
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
        },
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setPeople(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        fetch(`http://localhost:64531/api/movies/getmoviegenres?id=${searchParams.get("id")}`, {
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
        },
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setGenres(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    const [ToggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const getActiveClass = (index, className) => ToggleState === index ? className : "";

    const handlePersonClick = (e) => {
        e.preventDefault();
    }

    return (
        <div className="mainContainer">
            <Header />
            <div className="movie-page-wrapper">
                <img className="movie-poster" src={movie && require(`../../assets/images/movies/posterimages/${movie.PosterImage}`)}/>
                <div className="descriptionandbox">
                    <div className="description">
                        <h3> {movie && movie.Name} ({movie && movie.YearNumber})</h3>
                        <p> {movie && movie.Synopsis} </p>
                    </div>
                    <div className="box">

                    </div>
                </div>
            <div className="container">
                <ul className="tab-list">
                    <li
                    className={`tabs ${getActiveClass(1, "active-tabs")}`}
                    onClick={() => toggleTab(1)}
                    >
                        Crew
                    </li>
                    <li
                    className={`tabs ${getActiveClass(2, "active-tabs")}`}
                    onClick={() => toggleTab(2)}
                    >
                        Genres
                    </li>
                </ul>
                <div className="content-container">
                    <div className={`content ${getActiveClass(1, "active-content")}`}>
                        {people.map(p => <a key={nanoid()} onClick={handlePersonClick} data-personid={p.ID}> {p.Name} ({p.ProfessionName}) </a>)}
                    </div>
                    <div className={`content ${getActiveClass(2, "active-content")}`}>
                        {genres.map(p => <a key={nanoid()} onClick={handlePersonClick}> {p.Name} </a>)}
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        
        </div>
    );
}

export default Movie;