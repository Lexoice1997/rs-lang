import { useState } from "react";
import { NavLink } from "react-router-dom";
import Routes, { GAMES_PAGE, START_PAGE, STATISTIKS_PAGE, TEXTBOOK_PAGE, VOCABULARY_PAGE } from "../routs";


const NavBar = () => {
    const [isShow, setShow] = useState(false);
    const activatedShowNavBar = () => {
        setShow(true)
    };
    const deactivatedShowNavBar = () => {
        setShow(false)
    };


    return (
        <div>
            <nav>
                {!isShow && <ul>
                    <li><NavLink to={START_PAGE}>Start Page</NavLink></li>
                    <li><NavLink to={TEXTBOOK_PAGE}>Textbook</NavLink></li>
                    <li><NavLink to={VOCABULARY_PAGE}>Vocabulary</NavLink></li>
                    <li><NavLink to={GAMES_PAGE}>Games</NavLink></li>
                    <li><NavLink to={STATISTIKS_PAGE}>Statistics</NavLink></li>
                    <button onClick={activatedShowNavBar}>hide menu</button>
                </ul>}
                {isShow && <button onClick={deactivatedShowNavBar}>show menu</button>}
            </nav>
            <Routes/>
        </div>
    )
};

export default NavBar