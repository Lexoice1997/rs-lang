import {NavLink} from "react-router-dom";
import {LOGIN_PATH, REGISTRATION_PATH} from "../routs";
import {AppBar, Button, makeStyles, Toolbar, Typography} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: "20px",
    height: "80px"
  },
  button: {
    marginRight: "10px"
  }
}))

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h4">RSLang</Typography>
        <div className={classes.toolbar}>
          <Button variant="contained" className={classes.button}><NavLink to={LOGIN_PATH}>Вход</NavLink></Button>
          <Button variant="contained"><NavLink to={REGISTRATION_PATH}>Регистрация</NavLink></Button>
        </div>
      </Toolbar>
    </AppBar>
  )
};


export default Header
