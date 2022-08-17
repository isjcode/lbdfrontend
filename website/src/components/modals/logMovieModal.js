import react, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import "../../assets/styles/logMovieModal.css";


function LogMovieModal({closeLogMovieModal, movieID}) {
    const [ reviewBody, setReviewBody ] = useState("");
    const [ rating, setRating ] = useState(null);
    const [ movie, setMovie ] = useState(null);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        fetch(`http://localhost:64531/api/movies/getbyid?id=${movieID}`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
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
    }, [])

    const handleBodyChange = (e) => {
        setReviewBody(e.target.value);
    }
    const handleRatingChange = (e) => {
        setRating(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            Body: reviewBody,
            Rating: rating,
            MovieID: movieID,
            OwnerID: user.id,
        }
        fetch("http://localhost:64531/api/reviews/create", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token,
            },
        body: JSON.stringify(data),
        })
        .then((response) => {
            console.log(response);
            if (response.status === 201) {
                closeLogMovieModal(false);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }


    return (
        <div className="mainModal">
            <div className="backgroundContainer">
            </div>
            <form className="mainContainerLog" onSubmit={handleSubmit}>
                <div className="left">
                    <img src={movie && require(`../../assets/images/movies/posterimages/${movie.posterImage}`)}></img>
                </div>
                <div className="right">
                    <button className="modalCloseBtn" onClick={() => {
                        closeLogMovieModal(false)
                    }}> <i className="fa-solid fa-xmark"></i> </button>
                    <p className="movie-name"> {movie && movie.name} </p>
                    <textarea value={reviewBody} onChange={handleBodyChange} placeholder="Add a review..." className="review"/>
                    <div className="lastSection">
                        <fieldset onChange={handleRatingChange} className="rate">
                            <input type="radio" id="rating10" name="rating" defaultValue={10} /><label htmlFor="rating10" title="5 stars" />
                            <input type="radio" id="rating9" name="rating" defaultValue={9} /><label className="half" htmlFor="rating9" title="4 1/2 stars" />
                            <input type="radio" id="rating8" name="rating" defaultValue={8} /><label htmlFor="rating8" title="4 stars" />
                            <input type="radio" id="rating7" name="rating" defaultValue={7} /><label className="half" htmlFor="rating7" title="3 1/2 stars" />
                            <input type="radio" id="rating6" name="rating" defaultValue={6} /><label htmlFor="rating6" title="3 stars" />
                            <input type="radio" id="rating5" name="rating" defaultValue={5} /><label className="half" htmlFor="rating5" title="2 1/2 stars" />
                            <input type="radio" id="rating4" name="rating" defaultValue={4} /><label htmlFor="rating4" title="2 stars" />
                            <input type="radio" id="rating3" name="rating" defaultValue={3} /><label className="half" htmlFor="rating3" title="1 1/2 stars" />
                            <input type="radio" id="rating2" name="rating" defaultValue={2} /><label htmlFor="rating2" title="1 star" />
                            <input type="radio" id="rating1" name="rating" defaultValue={1} /><label className="half" htmlFor="rating1" title="1/2 star" />
                        </fieldset>
                        <button className="saveBtn"> Save </button>
                    </div>
                    
                </div>
            </form>
        </div>
    )
}

export default LogMovieModal;