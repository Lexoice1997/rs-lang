
import { userInfo } from 'os';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter, useLocation} from 'react-router-dom';
import { getUserId } from './api/userLoginApi';
import Header from './component/header/header';
import NavBar from './component/navBar/navBar';
import { checkAuthUser } from './redux/userReducer';



const App=() => {
  const dispatch = useDispatch(); 
 
  useEffect(() => {
    const userId = getUserId()
    if (userId) {
        dispatch(checkAuthUser(userId));
    }
}, []);

  
  return (
    <div className="App">
      <HashRouter>
        
        <Header/>
        <NavBar />
     
      </HashRouter>
    </div>
  );
}





export default App