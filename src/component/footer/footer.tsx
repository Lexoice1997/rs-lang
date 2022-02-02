import {AppBar, Button, makeStyles, Toolbar, Typography} from "@material-ui/core";
import React from "react";
import {GitHub} from "@material-ui/icons";

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

const Footer = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h4">RSLang</Typography>
        <div className={classes.toolbar}>
          <GitHub />
          <Button href="">Katserina</Button>
          <Button href="https://github.com/Lexoice1997/">Lexoice1997</Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Footer;
