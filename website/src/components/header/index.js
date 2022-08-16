import { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode"
import logo from "../../assets/images/logo.png";
import "../../assets/styles/header.css";
import { UserContext } from "../../UserContext";
import RegisterModal from "../../components/modals/registerModal";
import LoginModal from "../../components/modals/loginModal";
import FindMovieModal from "../../components/modals/findMovieModal";
import LogMovieModal from "../../components/modals/logMovieModal";

function Header() {
    const [search, setSearch] = useState("");
    const { user, setUser } = useContext(UserContext);

    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [findMovieModalOpen, setFindMovieModalOpen] = useState(false);
    const [logMovieModalOpen, setLogMovieModalOpen] = useState(false);

    const [movieID, setMovieID] = useState(null);

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
            {registerModalOpen && <RegisterModal closeRegisterModal={setRegisterModalOpen}/>}
            {loginModalOpen && <LoginModal closeLoginModal={setLoginModalOpen}/>}
            {findMovieModalOpen && <FindMovieModal closeFindMovieModal={setFindMovieModalOpen} closeLogMovieModalOpen={setLogMovieModalOpen} setMovieID={setMovieID} />}
            {logMovieModalOpen && <LogMovieModal closeLogMovieModal={setLogMovieModalOpen} movieID={movieID} />}
        </header>
    )
}

export default Header;