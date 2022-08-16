import react, { useEffect, useState } from "react";
import "../../assets/styles/logMovieModal.css";

function LogMovieModal({closeLogMovieModal, movieID}) {
    const [inputs, setInputs] = useState({});
    const [ movie, setMovie ] = useState(null);

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

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        });
    }


    const handleSubmit = () => {

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
                    <textarea placeholder="Add a review..." className="review"/>
                    <div class="lastSection">
                        <fieldset class="rate">
                            <input type="radio" id="rating10" name="rating" value="10" /><label for="rating10" title="5 stars"></label>
                            <input type="radio" id="rating9" name="rating" value="9" /><label class="half" for="rating9" title="4 1/2 stars"></label>
                            <input type="radio" id="rating8" name="rating" value="8" /><label for="rating8" title="4 stars"></label>
                            <input type="radio" id="rating7" name="rating" value="7" /><label class="half" for="rating7" title="3 1/2 stars"></label>
                            <input type="radio" id="rating6" name="rating" value="6" /><label for="rating6" title="3 stars"></label>
                            <input type="radio" id="rating5" name="rating" value="5" /><label class="half" for="rating5" title="2 1/2 stars"></label>
                            <input type="radio" id="rating4" name="rating" value="4" /><label for="rating4" title="2 stars"></label>
                            <input type="radio" id="rating3" name="rating" value="3" /><label class="half" for="rating3" title="1 1/2 stars"></label>
                            <input type="radio" id="rating2" name="rating" value="2" /><label for="rating2" title="1 star"></label>
                            <input type="radio" id="rating1" name="rating" value="1" /><label class="half" for="rating1" title="1/2 star"></label>
                        </fieldset>
                        <button className="saveBtn"> Save </button>
                    </div>
                    
                </div>
            </form>
        </div>
    )
}

export default LogMovieModal;