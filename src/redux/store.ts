import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import AudioCollGameReducer from "./audioCollReducer";
import SprintGameReducer from "./sprintReducer";
import StatistiksReducer from "./statistiksReducer";
import WordsReducer from "./wordsReducer";
import UserReducer from "./userReducer";
import GameReducer from "./gameReducer";

const reducer = combineReducers({
    user: UserReducer,
    words: WordsReducer,
    game: GameReducer,
    statistiks: StatistiksReducer,
    audioCollGame: AudioCollGameReducer,
    sprintGame: SprintGameReducer
});
export type RootState = ReturnType<typeof store.getState>

//const composeReducer = composeWithDevTools(applyMiddleware(thunk, loginStorage, logoutStorage));

const store = createStore(reducer, applyMiddleware(thunk));


export type ReducerAppType = ReturnType<typeof reducer>
export default store

// @ts-ignore
window.store = store

