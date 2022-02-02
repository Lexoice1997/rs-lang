import { HashRouter} from 'react-router-dom';
import Header from './component/header/header';
import NavBar from './component/navBar/navBar';
import {Grid} from "@material-ui/core";
import Routes from "./component/routs";
import Footer from "./component/footer/footer";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header/>
        <Grid container>
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

export default App;
