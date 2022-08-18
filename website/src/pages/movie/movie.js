import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "../../assets/styles/movie.css";

function Movie() {
    const [years, setYears] = useState([]);
    const [movie, setMovie] = useState(null);
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
            console.log(data);
            setMovie(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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
                setYears(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    return (
        <div className="mainContainer">
            <Header />
            <div className="movie-page-wrapper">
                <img className="movie-poster" src={movie && require(`../../assets/images/movies/posterimages/${movie.PosterImage}`)}/>
                <div className="description">
                    <h3> {movie && movie.Name} </h3>
                    <p> {movie && movie.Synopsis} </p>
                </div>
                <div className="box">

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Movie;