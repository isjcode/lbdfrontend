import Header from "../../components/header";
import Footer from "../../components/footer";
import "../../assets/styles/home.css";
import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { nanoid } from "nanoid";
import { createSearchParams, useNavigate } from "react-router-dom";

function Home() {
    const { user, setUser } = useContext(UserContext);
    const [home, setHome] = useState(null);
    const navigate = useNavigate();

    useState(() => {
        fetch(
            // `http://mackenzythorpe-001-site1.btempurl.com/api/home`,
            `http://localhost:64531/api/home`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setHome(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const handleReviewClick = (e) => {
        e.preventDefault();

        const id = e.target.getAttribute("data-id");
        const params = { id:  id};
        navigate({
            pathname: "/review",
            search: `${createSearchParams(params)}`,
        });
    };

    const handleUserNameClick = (e) => {
        e.preventDefault();
        const username = e.target.getAttribute("data-username");
        navigate(`/user/${username}`);
    };

    const RecentReviews = () => {
        return (
            home &&
            home.reviews.map((r) => {
                return (
                    <div key={nanoid()} className="home-review-card">
                        <div>
                            <img
                                data-id={r.Id}
                                onClick={handleReviewClick}
                                src={`http://mackenzythorpe-001-site1.btempurl.com/images/movies/posterimages/${r.Image}`}
                            />
                            <p className="review-by">
                                {" "}
                                Review By{" "}
                                <span
                                    onClick={handleUserNameClick}
                                    data-username={r.Username}
                                >
                                    {" "}
                                    {r.Username}{" "}
                                </span>{" "}
                            </p>
                        </div>
                        <ul
                            className="rating-score"
                            data-rating={`${r.Rating / 2}`}
                        >
                            <li
                                key={nanoid()}
                                className="rating-score-item"
                            ></li>
                            <li
                                key={nanoid()}
                                className="rating-score-item"
                            ></li>
                            <li
                                key={nanoid()}
                                className="rating-score-item"
                            ></li>
                            <li
                                key={nanoid()}
                                className="rating-score-item"
                            ></li>
                            <li
                                key={nanoid()}
                                className="rating-score-item"
                            ></li>
                        </ul>
                    </div>
                );
            })
        );
    };

    return (
        <div className="mainContainer">
            <Header />
            <div className="home-container">
                <div className="recent-reviews">
                    <h1> Here are some recent reviews from our members... </h1>
                    <RecentReviews />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
