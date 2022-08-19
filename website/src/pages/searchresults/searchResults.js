import React, { useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { nanoid } from "nanoid";
import ReactPaginate from 'react-paginate';
import "../../assets/styles/searchResults.css";

function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams();
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const [years, setYears ] = useState([]);

    const itemsPerPage = 1;

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        const params = { id:  e.target.getAttribute("data-id")};
        navigate({
            pathname: "/movie",
            search: `${createSearchParams(params)}`,
        });
        }

    function Items({ currentItems }) {
        return (
            <>
            {currentItems &&
                currentItems.map((item) => (
                <div data-id={item.ID} key={nanoid()} className="found-movie">
                    <img onClick={handleClick} data-id={item.ID} src={require(`../../assets/images/movies/posterimages/${item.PosterImage}`)} />
                    <h1 onClick={handleClick} data-id={item.ID}> {item.Name} ({item.YearNumber})</h1>
                </div>
                ))}
            </>
        );
    }
    const requestPages = (index = 1) => { 
        fetch(`http://localhost:64531/api/movies/searchmovies?s=${searchParams.get("str")}&i=${index}`, {
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
            setCurrentItems(data.Items);
            setPageCount(data.TotalPage);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        requestPages();
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
    }, [searchParams.get("str")]);

    const handlePageClick = (event) => {

        requestPages(event.selected + 1);
        const newOffset = (event.selected * itemsPerPage) % currentItems.length;
        setItemOffset(newOffset);
    };

    return (
        <div className="mainContainer">
            <Header />
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
            <Footer />
        </div>
    );
}

export default SearchResults;