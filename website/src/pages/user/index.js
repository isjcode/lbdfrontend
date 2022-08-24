import Header from "../../components/header";
import Footer from "../../components/footer";
import { nanoid } from "nanoid";
import { useLocation, useParams } from "react-router-dom";
import defaultuser from "../../assets/images/users/defaultuser.jpg";
import "../../assets/styles/user.css";
import { UserContext } from "../../UserContext";
import { useContext } from "react";

function User() {
    const { user, setUser } = useContext(UserContext);
    const userName = useParams().username;
    return (
        <div className="mainContainer">
            <Header />
            <div className="profile-container">
                <div className="first">
                    <div className="left">
                        <img src={defaultuser} /> 
                        <div>
                            <h1> {userName} </h1>
                            {user ? userName === user.username ? <button> Edit Profile </button> : <button> Follow </button> : null}
                        </div>
                    </div>
                    <div className="right">
                        <div className="stat">
                            <h2> 1620 </h2>
                            <p> Films </p>
                        </div>
                        <div className="stat">
                            <h2> 1620 </h2>
                            <p> Lists </p>
                        </div>
                        <div className="stat">
                            <h2> 1620 </h2>
                            <p> Followers </p>
                        </div>
                        <div className="stat">
                            <h2> 1620 </h2>
                            <p> Followings </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default User;