import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../components/header";

function SearchResults() {
    const [movies, setMovies ] = useState(null);
    const location = useLocation();


    useEffect(() => {
        fetch(`http://localhost:64531/api/movies/searchmovies?s=${location.state.searchString}`, {
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
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    return (
        <div className="mainContainer">
            <Header />
        </div>
    );
}

export default SearchResults;