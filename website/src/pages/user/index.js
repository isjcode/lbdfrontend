import Header from "../../components/header";
import Footer from "../../components/footer";
import { nanoid } from "nanoid";
import { useLocation, useParams } from "react-router-dom";
import defaultuser from "../../assets/images/users/defaultuser.jpg";
import "../../assets/styles/user.css";
import { UserContext } from "../../UserContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

function User() {
    const { user, setUser } = useContext(UserContext);
    const userName = useParams().username;
    const [following, setFollowing] = useState(false);
    const [userStats, setUserStats] = useState(null);
    useEffect(() => {
        if (!user) {
            return;
        }
        fetch(
            `http://localhost:64531/api/accounts/getuser?userName=${userName}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setUserStats(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        fetch(
            `http://localhost:64531/api/accounts/checkfollow?followerUsername=${user && user.username}&followeeUsername=${userName}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + user.token,
                },
            }
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setFollowing(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [user]);

    console.log(following);

    const handleFollow = (e) => {
        e.preventDefault();
        fetch(
            `http://localhost:64531/api/accounts/follow?followerUsername=${user.username}&followeeUsername=${userName}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + user.token,
                },
            }
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div className="mainContainer">
            <Header />
            <div className="profile-container">
                <div className="first">
                    <div className="left">
                        <img src={defaultuser} />
                        <div>
                            <h1> {userName} </h1>
                            {user ? (
                                userName === user.username ? (
                                    <button> Edit Profile </button>
                                ) : (
                                    following ? (
                                        <button className="following" onClick={handleFollow}>
                                            Following
                                        </button>
                                    )
                                    :
                                    (
                                        <button className="following" onClick={handleFollow}>
                                            Follow
                                        </button>
                                    )
                                )
                            ) : null}
                        </div>
                    </div>
                    <div className="right">
                        <div className="stat">
                            <h2> {userStats && userStats.FilmCount} </h2>
                            <p> Films </p>
                        </div>
                        <div className="stat">
                            <h2> {userStats && userStats.ListCount} </h2>
                            <p> Lists </p>
                        </div>
                        <div className="stat">
                            <h2> {userStats && userStats.FollowerCount} </h2>
                            <p> Followers </p>
                        </div>
                        <div className="stat">
                            <h2> {userStats && userStats.FolloweeCount} </h2>
                            <p> Following </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default User;
