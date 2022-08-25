import Header from "../../components/header";
import Footer from "../../components/footer";
import { nanoid } from "nanoid";
import ReactPaginate from "react-paginate";
import UserTabs from "../../components/usertabs/UserTabs";
import {
    createSearchParams,
    Link,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import defaultuser from "../../assets/images/users/defaultuser.jpg";
import "../../assets/styles/reviews.css";
import "react-tabs/style/react-tabs.css";
import { UserContext } from "../../UserContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

function Reviews() {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const userName = useParams().username;
    const itemsPerPage = 1;

    const navigate = useNavigate();

    function Items({ currentItems }) {
        return (
            <>
                {currentItems &&
                    currentItems.map((r) => {
                        return (
                            <div
                                data-id={r.Id}
                                onClick={handleReviewClick}
                                key={nanoid()}
                                className="review-card-small"
                            >
                                <img
                                    data-id={r.Id}
                                    src={require(`../../assets/images/movies/posterimages/${r.Image}`)}
                                />
                                <div data-id={r.Id}>
                                    <h1 data-id={r.Id}> {r.MovieName} </h1>
                                    <p data-id={r.Id}> {r.Body} </p>
                                </div>
                            </div>
                        );
                    })}
            </>
        );
    }
    const requestPages = (index = 1) => {
        fetch(
            `http://localhost:64531/api/reviews/getalluserreviews?userName=${userName}&i=${index}`,
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
                setCurrentItems(data.Items);
                setPageCount(data.TotalPage);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    useEffect(() => {
        requestPages();
    }, []);

    const handlePageClick = (event) => {
        requestPages(event.selected + 1);
        const newOffset = (event.selected * itemsPerPage) % currentItems.length;
        setItemOffset(newOffset);
    };

    const handleReviewClick = (e) => {
        e.preventDefault();
        const params = { id: e.target.getAttribute("data-id") };
        navigate({
            pathname: `/review`,
            search: `${createSearchParams(params)}`,
        });
    };

    return (
        <div className="mainContainer">
            <Header />
            <div className="container">
                <UserTabs />
                <div className="reviews">
                    <Items currentItems={currentItems} />
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="Previous"
                        renderOnZeroPageCount={null}
                        containerClassName="pagination-navigation"
                        pageLinkClassName="page-link"
                        previousLinkClassName="prev-link"
                        nextLinkClassName="next-link"
                        activeLinkClassName="active-link"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Reviews;
