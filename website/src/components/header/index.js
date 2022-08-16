import { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode"
import logo from "../../assets/images/logo.png";
import "../../assets/styles/header.css";
import { UserContext } from "../../UserContext";

function Header({setRegisterModalOpen, setLoginModalOpen, setFindMovieModalOpen}) {
    const [search, setSearch] = useState("");
    const { user, setUser } = useContext(UserContext);
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    return (
        <header>
            <div className="headerContainer">
            <a href="#" className="logo">
                <img alt="site logo" src={logo} ></img>
            </a>
            <ul>
                {
                    user === null ? (
                        <>
                        <li>
                            <a href="#" onClick={() => setLoginModalOpen(true)}> sign in </a>
                        </li>
                        <li>
                            <a onClick={() => setRegisterModalOpen(true)} href="#"> create account </a>
                        </li>
                        </>
                    )
                    :
                    (
                        <li>
                            <a href="#"> {user.username} </a>
                        </li>
                    )
                }
                <li>
                    <a href="#"> films </a>
                </li>
                <li>
                    <a href="#"> lists </a>
                </li>
                <li>
                    <a href="#"> members </a>
                </li>
                <li>
                    <a href="#"> journal </a>
                </li>
                <li>
                    <input type="text" value={search} onChange={handleSearch}/> 
                </li>
                <li className="logBtnContainer">
                    <button onClick={() => setFindMovieModalOpen(true)} className="logBtn"> <i className="fa-solid fa-plus"></i> LOG </button>
                </li>
            </ul>
            </div>
        </header>
    )
}

export default Header;