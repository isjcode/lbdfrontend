import { useState } from "react";
import logo from "../../assets/images/logo.png";
import "../../assets/styles/header.css";

function Header({setRegisterModalOpen, setLoginModalOpen}) {
    const [search, setSearch] = useState("");
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    return (
        <header>
            <a href="#" className="logo">
                <img alt="site logo" src={logo} ></img>
            </a>
            <ul>
                <li>
                    <a href="#" onClick={() => setLoginModalOpen(true)}> sign in </a>
                </li>
                <li>
                    <a onClick={() => setRegisterModalOpen(true)} href="#"> create account </a>
                </li>
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
            </ul>
        </header>
    )
}

export default Header;