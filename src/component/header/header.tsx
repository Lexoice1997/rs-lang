import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logaut } from "../../redux/userReducer";
import { LOGIN_PATH, REGISTRATION_PATH } from "../routs";

const Header = ()=>{
    const dispatch = useDispatch();
    const logautUser=()=>{
        dispatch(logaut())
    }
    return (
        <div>
            <NavLink to={REGISTRATION_PATH}>Regestration</NavLink>
            <NavLink to={LOGIN_PATH}>Login</NavLink>
            <button onClick={logautUser}>Выйти</button>
        </div>
    )
};


export default  Header