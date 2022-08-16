import react, { useState } from "react";
import "../../assets/styles/logMovieModal.css";

function LogMovieModal({closeLogMovieModal }) {
    const [inputs, setInputs] = useState({});

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
            <form className="mainContainer" onSubmit={handleSubmit}>
                <button className="modalCloseBtn" onClick={() => {
                    closeLogMovieModal(false)
                }}> <i className="fa-solid fa-xmark"></i> </button>
                <button className="saveBtn"> Save </button>
            </form>
        </div>
    )
}

export default LogMovieModal;