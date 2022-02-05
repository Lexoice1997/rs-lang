
import "./App.css";

import {Grid} from "@material-ui/core";
import Routes from "./component/routs";
import Footer from "./component/footer/footer";
import { userInfo } from 'os';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter, useLocation} from 'react-router-dom';
import { getUserId } from './api/api';
import Header from './component/header/header';
import NavBar from './component/navBar/navBar';
import { checkAuthUser } from './redux/userReducer';


const App=() => {
  const dispatch = useDispatch(); 
 
  useEffect(() => {
    const userId = getUserId()
    console.log(userId)
    if (userId) {
        dispatch(checkAuthUser(userId));
    }
}, []);

  
  return (
    <div className="App">
      <HashRouter>
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
      </HashRouter>
    </div>
  );
}





export default App