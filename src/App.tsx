import "./App.css";

import {Grid} from "@material-ui/core";
import Routes, { SPRINT_GAME } from "./component/routs";
import Footer from "./component/footer/footer";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter, withRouter, useHistory} from 'react-router-dom';
import { getUserId } from './api/api';
import Header from './component/header/header';
import NavBar from './component/navBar/navBar';
import { checkAuthUser } from './redux/userReducer';
import { getRandomInt } from "./js";
import { useActions } from "./hooks/useSprint";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { Route } from 'react-router-dom';
import SprintGame from './component/games/sprint-game/sprintGame';

const App=(props: any) => {
  const dispatch = useDispatch(); 
  const histiry = useHistory()

  useEffect(() => {
    const userId = getUserId()
    if (userId) {
        dispatch(checkAuthUser(userId));
    }
}, []);

  return (
    <div className="App">
      {
        props.location.pathname !== '/sprint' ? 
        <>
          <Header/> 
          <Grid container className="background-img">
            <Grid item sm={2}>
              <NavBar />
            </Grid>
            <Grid item sm={10}>
              <Routes />
            </Grid>
          </Grid> 
          <Footer/>
        </> : <Route path={SPRINT_GAME} render={() => <SprintGame />}/>
      }
    </div>
  );
}

export default withRouter(App);
