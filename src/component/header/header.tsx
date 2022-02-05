
import "./header.scss";
import {NavLink} from "react-router-dom";
import {LOGIN_PATH, REGISTRATION_PATH} from "../routs";
import {AppBar, Button, makeStyles, Toolbar, Typography} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { logaut } from "../../redux/userReducer";


const useStyles = makeStyles((theme) => ({
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
          <button onClick={logautUser}>Выйти</button>
        </div>
      </Toolbar>
    </AppBar>
  )
};

export default Header
