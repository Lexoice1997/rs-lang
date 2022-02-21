import { SprintAction, SprintActionTypes, SprintState } from "../types/sprint";

const initialState: SprintState = {
    words: [],
    word: {},
    loading: false,
    error: null,
    totalScore: 0,
    winStrikeScore: 10,
    winStrike: 0,
    bird: 0,
    correctAnswer: [],
    incorrectAnswer: [],
    longestWinStrike: 0,
};

const SprintGameReducer = (state = initialState, action: SprintAction): SprintState => {
    switch (action.type) {
        case SprintActionTypes.FETCH_WORDS:
            return {...state, loading: true, error: null, words: []};
        case SprintActionTypes.FETCH_WORDS_SUCCESS:
            return {...state, loading: false, error: null, words: action.payload}
        case SprintActionTypes.FETCH_WORDS_ERROR:
            return {...state, loading: false, error: action.payload, words: []}
        case SprintActionTypes.SET_WORD:
            return {...state, word: action.payload}
        case SprintActionTypes.SET_TOTAL_SCORE:
            return {...state, totalScore: state.totalScore + action.payload}
        case SprintActionTypes.SET_WINSTRIKE_SCORE:
            return {...state, winStrikeScore: action.payload}
        case SprintActionTypes.SET_WINSTRIKE:
            return {...state, winStrike: action.payload}
        case SprintActionTypes.SET_BIRD:
            return {...state, bird: action.payload}
        case SprintActionTypes.SET_CORRECT_ANSWER:
            return {...state, correctAnswer: [...state.correctAnswer, action.payload]}
        case SprintActionTypes.SET_INCORRECT_ANSWER:
            return {...state, incorrectAnswer: [...state.incorrectAnswer, action.payload]}
        case SprintActionTypes.RESET_DATA:
            return {...state, incorrectAnswer: [], correctAnswer: [], totalScore: 0, winStrike: 0, winStrikeScore: 10, bird: 0}
        case SprintActionTypes.SET_LONGEST_WINSTRIKE:
            return {...state, longestWinStrike: action.payload}
        default: 
            return state
    }
};  

export default SprintGameReducer;