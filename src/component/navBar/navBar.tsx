import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import Routes, {GAMES_PAGE, START_PAGE, STATISTIKS_PAGE, TEXTBOOK_PAGE, VOCABULARY_PAGE} from "../routs";
import {Container, makeStyles, Typography} from "@material-ui/core";
import {BarChart, Book, Extension, Group, Home} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(5),
    height: "calc(100vh - 80px)",
    color: "white",
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "white",
      color: "#555",
      border: "1px solid #ece7e7"
    }
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(6),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(4)
    }
  },
  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
    }
  },
  text: {
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    }
  }
}))

const NavBar = () => {
  const classes = useStyles();

  const [isShow, setShow] = useState(false);
  const activatedShowNavBar = () => {
    setShow(true)
  };
  const deactivatedShowNavBar = () => {
    setShow(false)
  };


  return (
    <Container className={classes.container}>
      <NavLink to={START_PAGE} className={classes.item}>
        <Home/>
        <Typography className={classes.text}>Главная</Typography>
      </NavLink>

      <NavLink to={TEXTBOOK_PAGE} className={classes.item}>
        <Book/>
        <Typography className={classes.text}>Учебник</Typography>
      </NavLink>

      <NavLink to={GAMES_PAGE} className={classes.item}>
        <Extension/>
        <Typography className={classes.text}>Мини игры</Typography>
      </NavLink>

      <NavLink to={STATISTIKS_PAGE} className={classes.item}>
        <BarChart/>
        <Typography className={classes.text}>Статистика</Typography>
      </NavLink>

      <NavLink to={START_PAGE} className={classes.item}>
        <Group/>
        <Typography className={classes.text}>О команде</Typography>
      </NavLink>

      {/*<nav>*/}
      {/*  {!isShow &&*/}
      {/*  <ul>*/}
      {/*    <li><NavLink to={START_PAGE}>Start Page</NavLink></li>*/}
      {/*    <li><NavLink to={TEXTBOOK_PAGE}>Textbook</NavLink></li>*/}
      {/*    <li><NavLink to={VOCABULARY_PAGE}>Vocabulary</NavLink></li>*/}
      {/*    <li><NavLink to={GAMES_PAGE}>Games</NavLink></li>*/}
      {/*    <li><NavLink to={STATISTIKS_PAGE}>Statistics</NavLink></li>*/}
      {/*    <button onClick={activatedShowNavBar}>hide menu</button>*/}
      {/*  </ul>}*/}
      {/*  {isShow && <button onClick={deactivatedShowNavBar}>show menu</button>}*/}
      {/*</nav>*/}
    </Container>
  )
};

export default NavBar
