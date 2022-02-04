import { applyMiddleware, combineReducers, createStore, StoreEnhancer } from "redux";
import thunk from "redux-thunk";
import AudioCollGameReducer from "./audioCollReducer";
import SprintGameReducer from "./sprintReducer";
import StatistiksReducer from "./statistiksReducer";
import TextBookReducer from "./textbookReducer";
import VokabularyReducer from "./vocabularyReducer";
import UserReducer from "./userReducer";

const reducer = combineReducers({
    user: UserReducer,
    textbook: TextBookReducer,
    vocabulary: VokabularyReducer,
    statistiks: StatistiksReducer,
    audioCollGame: AudioCollGameReducer,
    sprintGame: SprintGameReducer
});


//const composeReducer = composeWithDevTools(applyMiddleware(thunk, loginStorage, logoutStorage));

const store = createStore(reducer, applyMiddleware(thunk));


export type ReducerAppType = ReturnType<typeof reducer>
export default store

// @ts-ignore
window.store = store

