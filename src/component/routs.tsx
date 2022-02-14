import {Route} from "react-router-dom";
import GamesPage from "./games/games";
import LoginPage from "./login/login";
import RegistrationPage from "./regestration/regestration";
import StartPage from "./startPage/startPage";
import StatistiksPage from "./statistiks/statistiks";
import TextBookPage from "./bookPage/book";
import AboutPage from "./about/about";
import AudioCallPage from "./games/audioCollPage";
export const SPRINT_GAME = '/sprint';
export const LOGIN_PATH = '/login';
export const REGISTRATION_PATH = '/registration';
export const START_PAGE = '/startPage';
export const TEXTBOOK_PAGE = '/textBook';
export const VOCABULARY_PAGE = '/vocabulary';
export const GAMES_PAGE = '/games';
export const STATISTIKS_PAGE = '/statistiks';
export const ABOUT_PAGE = '/about';
export const AUDIO_CALL_PAGE = '/audioCallPage'
const Routes = () => {
  return (
    <div>
      <Route exact path={'/'} render={() => <StartPage/>}/>
      <Route path={START_PAGE} render={() => <StartPage/>}/>
      <Route path={LOGIN_PATH} render={() => <LoginPage/>}/>
      <Route path={REGISTRATION_PATH} render={() => <RegistrationPage/>}/>
      <Route path={TEXTBOOK_PAGE} render={() => <TextBookPage/>}/>
      <Route path={VOCABULARY_PAGE} render={() => <TextBookPage/>}/>
      <Route path={GAMES_PAGE} render={() => <GamesPage/>}/>
      <Route path={STATISTIKS_PAGE} render={() => <StatistiksPage/>}/>
      <Route path={ABOUT_PAGE} render={() => <AboutPage/>}/>
      <Route path={AUDIO_CALL_PAGE} render={() => <AudioCallPage/>}/>
    </div>
  )
}
export default Routes
