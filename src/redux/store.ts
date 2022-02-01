import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import AudioCollGameReducer from "./audioCollReducer";
import LoginReducer from "./loginReucer";
import RegistrationReducer from "./registrationReducer";
import SprintGameReducer from "./sprintReducer";
import StatistiksReducer from "./statistiksReducer";
import TextBookReducer from "./textbookReducer";
import VokabularyReducer from "./vocabularyReducer";

const reducer = combineReducers({
    login: LoginReducer,
    registration: RegistrationReducer,
    textbook: TextBookReducer,
    vocabulary: VokabularyReducer,
    statistiks: StatistiksReducer,
    audioCollGame: AudioCollGameReducer,
    sprintGame: SprintGameReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export type ReducerAppType = ReturnType<typeof reducer>
export default store

// @ts-ignore
window.store = store