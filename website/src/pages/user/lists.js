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
import "../../assets/styles/userlists.css";
import "react-tabs/style/react-tabs.css";
import { UserContext } from "../../UserContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

function UserLists() {
    const navigate = useNavigate();
     const { user, setUser } = useContext(UserContext);

    const handleNewListClick = (e) => {
        e.preventDefault();

        navigate(`/user/${user.username}/newlist`)
    }
    return (
        <div className="mainContainer">
            <Header />
            <div className="container">
                <UserTabs />
                <div className="lists-container">
                    <div className="lists"></div>
                    <button onClick={handleNewListClick} className="new-list"> Start a new list </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserLists;
