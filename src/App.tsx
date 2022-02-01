import { HashRouter} from 'react-router-dom';
import Header from './component/header/header';
import NavBar from './component/navBar/navBar';


function App() {
  return (
    <div className="App">
      <HashRouter>
        
        <Header/>
        <NavBar />
     
      </HashRouter>
    </div>
  );
}

export default App;
