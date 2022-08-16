import Header from "../../components/header";
import "../../assets/styles/home.css";
import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";

function Home() {
    const { user, setUser } = useContext(UserContext);

    return (
        <div className="mainContainer">
            <Header />
        </div>
    )
}

export default Home;