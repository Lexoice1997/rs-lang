import { NavLink } from "react-router-dom";
import { LOGIN_PATH, REGISTRATION_PATH } from "../routs";

const Header = ()=>{

    return (
        <div>
          <NavLink to={REGISTRATION_PATH}>Regestration</NavLink>
            <NavLink to={LOGIN_PATH}>Login</NavLink>
        </div>
    )
};


export default  Header