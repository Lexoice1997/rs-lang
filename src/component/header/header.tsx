
import "./header.scss";
import {NavLink} from "react-router-dom";
import {LOGIN_PATH, REGISTRATION_PATH} from "../routs";
import {AppBar, Button, makeStyles, Toolbar, Typography} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logaut } from "../../redux/userReducer";
import { ReducerAppType } from "../../redux/store";


const useStyles = makeStyles(() => ({
  appbar: {
    backgroundColor:  "#C0A9BD",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: "20px",
    height: "80px",
  },
  button: {
    marginRight: "10px",
    backgroundColor: "#94A7AE",
  }
}))

const Header = () => {
  const isLogin = useSelector<ReducerAppType, boolean>((state)=>state.user.isLogin)
  const classes = useStyles();
  const dispatch = useDispatch();
  const logautUser=()=>{
    dispatch(logaut())
  }

  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h4" className="logo">RSLang</Typography>
        <div className={classes.toolbar}>
          <Button variant="contained" className={classes.button}><NavLink to={LOGIN_PATH}>Вход</NavLink></Button>
          <Button variant="contained" className={classes.button}><NavLink to={REGISTRATION_PATH}>Регистрация</NavLink></Button>
          {isLogin
          ?<Button variant="contained" className={classes.button} onClick={logautUser}>Выйти</Button>
          :''}
        </div>
      </Toolbar>
    </AppBar>
  )
};

export default Header
