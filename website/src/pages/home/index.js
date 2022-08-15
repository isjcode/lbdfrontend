import Header from "../../components/header";
import RegisterModal from "../../components/modals/registerModal";
import LoginModal from "../../components/modals/loginModal";
import "../../assets/styles/home.css";
import { useState } from "react";

function Home() {
    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    return (
        <div className="mainContainer">
            <Header setRegisterModalOpen={setRegisterModalOpen} setLoginModalOpen={setLoginModalOpen}/>
            {registerModalOpen && <RegisterModal closeRegisterModal={setRegisterModalOpen}/>}
            {loginModalOpen && <LoginModal closeLoginModal={setLoginModalOpen}/>}
        </div>
    )
}

export default Home;