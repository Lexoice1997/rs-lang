import "./navBar.scss";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {GAMES_PAGE, START_PAGE, STATISTIKS_PAGE, TEXTBOOK_PAGE, VOCABULARY_PAGE, ABOUT_PAGE} from "../routs";
import {Container, makeStyles, Typography} from "@material-ui/core";
import {BarChart, Book, Extension, Group, Home, Translate} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(5),
    height: "calc(100vh - 160px)",
    color: "white",
    [theme.breakpoints.up("sm")]: {
      color: "#555",
      borderRight: "1px solid #94A7AE"
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

  return (
    <Container className={classes.container}>
      <NavLink to={START_PAGE} className={classes.item}>
        <Home className={classes.icon}/>
        <Typography className={classes.text}>Главная</Typography>
      </NavLink>
      <NavLink to={VOCABULARY_PAGE} className={classes.item}>
          <Translate className={classes.icon}/>
        <Typography className={classes.text}>Сложные слова</Typography>
      </NavLink>
      <NavLink to={TEXTBOOK_PAGE} className={classes.item}>
        <Book className={classes.icon}/>
        <Typography className={classes.text}>Учебник</Typography>
      </NavLink>

      <NavLink to={GAMES_PAGE} className={classes.item}>
        <Extension className={classes.icon}/>
        <Typography className={classes.text}>Мини игры</Typography>
      </NavLink>

      <NavLink to={STATISTIKS_PAGE} className={classes.item}>
        <BarChart className={classes.icon}/>
        <Typography className={classes.text}>Статистика</Typography>
      </NavLink>

      <NavLink to={ABOUT_PAGE} className={classes.item}>
        <Group className={classes.icon}/>
        <Typography className={classes.text}>О команде</Typography>
      </NavLink>
    </Container>
  )
};

export default NavBar
