import Header from "../../components/header";
import Footer from "../../components/footer";
import { nanoid } from "nanoid";
import ReactPaginate from "react-paginate";
import {
    createSearchParams,
    Link,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import defaultuser from "../../assets/images/users/defaultuser.jpg";
import "../../assets/styles/usersettings.css";
import "react-tabs/style/react-tabs.css";
import { UserContext } from "../../UserContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import UserTabs from "../../components/usertabs/UserTabs";

function UserSettings() {
    const { user, setUser } = useContext(UserContext);
    const [ToggleState, setToggleState] = useState(1);
    const [img, setImg] = useState(null);

    const readImage = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let file = e.dataTransfer.files[0];

        let reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => setImg(reader.result);
    };

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const getActiveClass = (index, className) =>
        ToggleState === index ? className : "";

    const handleSaveImage = (e) => {
        e.preventDefault();
        
    }    

    return (
        <div className="mainContainer">
            <Header />
            <div className="settings-container">
                <h1> Account Settings </h1>
                <ul className="tab-list">
                    <li
                        className={`tabs ${getActiveClass(1, "active-tabs")}`}
                        onClick={() => toggleTab(1)}
                    >
                        Profile
                    </li>
                    <li
                        className={`tabs ${getActiveClass(2, "active-tabs")}`}
                        onClick={() => toggleTab(2)}
                    >
                        Avatar
                    </li>
                </ul>
                <div className="content-container">
                    <div
                        className={`content ${getActiveClass(
                            1,
                            "active-content"
                        )}`}
                    >
                        Haha
                    </div>
                    <div
                        className={`content ${getActiveClass(
                            2,
                            "active-content"
                        )}`}
                    >
                        <div className="Upload">
                            <div
                                className="Drag"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={readImage}
                            >
                                {img ? <img src={img} /> : "Drag an image here"}
                            </div>
                        </div>
                    </div>
                        <button onClick={handleSaveImage} className="save-image-button"> Save </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UserSettings;
