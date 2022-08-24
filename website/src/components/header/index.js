import { useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import logo from "../../assets/images/logo.png";
import "../../assets/styles/header.css";
import { UserContext } from "../../UserContext";
import RegisterModal from "../../components/modals/registerModal";
import LoginModal from "../../components/modals/loginModal";
import FindMovieModal from "../../components/modals/findMovieModal";
import LogMovieModal from "../../components/modals/logMovieModal";
import { createSearchParams, Link, useNavigate } from "react-router-dom";

function Header() {
    const [search, setSearch] = useState("");
    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();
    const params = { str: search };

    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [findMovieModalOpen, setFindMovieModalOpen] = useState(false);
    const [logMovieModalOpen, setLogMovieModalOpen] = useState(false);

    const [movieID, setMovieID] = useState(null);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (search.trim().length !== 0) {
            navigate({
                pathname: "/search",
                search: `${createSearchParams(params)}`,
            });
        }
    };

    const handleSignOut = (e) => {
        e.preventDefault();
        setUser(null);
        localStorage.removeItem("userData");
    };

    return (
        <header className={user === null ? "wide-width" : "normal-width"}>
            <div className="headerContainer">
                <Link to="/" className="logo">
                    <img alt="site logo" src={logo}></img>
                </Link>
                <ul>
                    {user === null ? (
                        <>
                            <li>
                                <a
                                    href="#"
                                    onClick={() => setLoginModalOpen(true)}
                                >
                                    {" "}
                                    sign in{" "}
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() => setRegisterModalOpen(true)}
                                    href="#"
                                >
                                    {" "}
                                    create account{" "}
                                </a>
                            </li>
                        </>
                    ) : (
                        <li className="user-name">
                            <a className="username-text" href="#">
                                {" "}
                                {user.username}{" "}
                                <i className="fa-solid fa-chevron-down"></i>{" "}
                            </a>
                            <div className="user-dropdowns">
                                <div className="dropdown-tab">
                                    <Link to="/"> Home </Link>
                                </div>
                                <div className="dropdown-tab">
                                    <Link to={`/user/${user.username}`}> Profile </Link>
                                </div>
                                <div
                                    className="dropdown-tab"
                                    onClick={handleSignOut}
                                >
                                    <Link to="/"> Sign Out </Link>
                                </div>
                            </div>
                        </li>
                    )}
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
                        <div className="search">
                            <input
                                type="text"
                                value={search}
                                onChange={handleSearch}
                            />
                            <button onClick={handleClick} className="searchBtn">
                                {" "}
                                <i className="fa-solid fa-magnifying-glass"></i>{" "}
                            </button>
                        </div>
                    </li>
                    {user !== null ? (
                        <li className="logBtnContainer">
                            <button
                                onClick={() => setFindMovieModalOpen(true)}
                                className="logBtn"
                            >
                                {" "}
                                <i className="fa-solid fa-plus"></i> LOG{" "}
                            </button>
                        </li>
                    ) : null}
                </ul>
            </div>
            {registerModalOpen && (
                <RegisterModal closeRegisterModal={setRegisterModalOpen} />
            )}
            {loginModalOpen && (
                <LoginModal closeLoginModal={setLoginModalOpen} />
            )}
            {findMovieModalOpen && (
                <FindMovieModal
                    closeFindMovieModal={setFindMovieModalOpen}
                    closeLogMovieModalOpen={setLogMovieModalOpen}
                    setMovieID={setMovieID}
                />
            )}
            {logMovieModalOpen && (
                <LogMovieModal
                    closeLogMovieModal={setLogMovieModalOpen}
                    movieID={movieID}
                />
            )}
        </header>
    );
}

export default Header;
