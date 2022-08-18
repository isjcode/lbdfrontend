import Header from "../../components/header";
import Footer from "../../components/footer";
import "../../assets/styles/home.css";
import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";

function Home() {
    const { user, setUser } = useContext(UserContext);

    return (
        <div className="mainContainer">
            <Header />
            <Footer />
        </div>
    )
}

export default Home;