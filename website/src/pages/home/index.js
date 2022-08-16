import Header from "../../components/header";
import RegisterModal from "../../components/modals/registerModal";
import LoginModal from "../../components/modals/loginModal";
import FindMovieModal from "../../components/modals/findMovieModal";
import LogMovieModal from "../../components/modals/logMovieModal";
import "../../assets/styles/home.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";

function Home() {
    const { user, setUser } = useContext(UserContext);

    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [findMovieModalOpen, setFindMovieModalOpen] = useState(false);
    const [logMovieModalOpen, setLogMovieModalOpen] = useState(false);


    return (
        <div className="mainContainer">
            <Header setRegisterModalOpen={setRegisterModalOpen} setLoginModalOpen={setLoginModalOpen} setFindMovieModalOpen={setFindMovieModalOpen} />
            {registerModalOpen && <RegisterModal closeRegisterModal={setRegisterModalOpen}/>}
            {loginModalOpen && <LoginModal closeLoginModal={setLoginModalOpen}/>}
            {findMovieModalOpen && <FindMovieModal closeFindMovieModal={setFindMovieModalOpen} closeLogMovieModalOpen={setLogMovieModalOpen} />}
            {logMovieModalOpen && <LogMovieModal closeLogMovieModal={setLogMovieModalOpen} />}
        </div>
    )
}

export default Home;