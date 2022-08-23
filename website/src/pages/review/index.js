import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "../../assets/styles/review.css";
import "react-tabs/style/react-tabs.css";
import ReactPaginate from "react-paginate";
import { nanoid } from "nanoid";


function Review() {
    const [ movieID, setMovieID ] = useState(null);
    const [ review, setReview ] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    function Items({ currentItems }) {
        return (
            <div className="comment">

            </div>
        );
    }
    useEffect(() => {
        fetch(`http://localhost:64531/api/reviews/getreview?reviewID=${searchParams.get("id")}`, {
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
        },
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setReview(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [])


    return (
        <div className="mainContainer">
            <Header />
            <div className="reviewContainer">
                <p> Review by {review && review.Username}</p>
                <p className="review-body"> {review && review.Body} </p>
            </div>
            <div className="comments">
                <h1> Comments </h1>
            </div>
            <Footer />
        </div>
    );
}

export default Review;