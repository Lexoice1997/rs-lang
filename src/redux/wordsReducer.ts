import { Dispatch } from "react";
import api from "../api/api";
import { ReducerAppType, RootState } from "./store";
import { loadingAC, SET_LOADER } from "./userReducer";

export const SET_WORDS = 'SET_WORDS';
export const SET_GROUP = 'SET_GROUP';
export const SET_PAGE = 'SET_PAGE';
export const SET_ERROR_WORDS = 'SET_ERROR_WORDS';
export const CREATE_DIFFICALTY_WORDS= 'CREATE_DIFFICALTY_WORDS'
export const SET_DIFFICALTY_WORDS_ID = 'SET_DIFFICALTY_WORDS_ID,'
export const SET_AGREGATE_WORDS = 'SET_AGREGATE_WORDS,'

export type WordsType=  {
    id: string,
    group: 0,
    page: 0,
    word: string,
    image: string,
    audio: string,
    audioMeaning: string,
    audioExample: string,
    textMeaning: string,
    textExample: string,
    transcription: string,
    wordTranslate: string,
    textMeaningTranslate: string,
    textExampleTranslate: string
}
 export type InitialStateWordsType = {
     words : Array<WordsType>
     group: number
     page: number
     isLoading: boolean
     error: string
     difficaltWordsId: any[]
     agregateWords: any []
 }
//@ts-ignore
 const group: number = +JSON.parse(localStorage.getItem('group'))
 //@ts-ignore
 const page: number = +JSON.parse(localStorage.getItem('page'))

const initialState: InitialStateWordsType = {
    words: [],
    group:  group ? group : 0,
    page: page ? page: 0,
    isLoading: false,
    error: '',
    difficaltWordsId: [],
    agregateWords: []
}

type ActionType =
| ReturnType<typeof loadingAC>
| ReturnType<typeof setWordsAC>
| ReturnType<typeof setGroupsAC >
| ReturnType<typeof setPageAC>
| ReturnType<typeof setErrorWordsAC >
| ReturnType<typeof setErrorWordsAC>
| ReturnType<typeof createDificaltyWordsAC>
| ReturnType<typeof setDifficultWordsIdAC>
| ReturnType<typeof setagregateWordsAC>



const WordsReducer = (state=initialState, action:ActionType):InitialStateWordsType=>{
   switch (action.type) {
       case SET_WORDS:{
           return {...state, words: action.data}
        }
        case SET_GROUP:{
            return {...state, group: action.group}
         }
        case SET_PAGE:{
            return {...state, page: action.page}
         }
        case SET_LOADER:{
            return {...state, isLoading: action.isLoading}
        }
        case SET_ERROR_WORDS:{
            return{...state, error: action.error}
        }
        case CREATE_DIFFICALTY_WORDS:{
            return {...state, difficaltWordsId: [...state.difficaltWordsId, action.word]}
        }
        case SET_DIFFICALTY_WORDS_ID: {
            return {...state, difficaltWordsId: action.data}
        }
        case SET_AGREGATE_WORDS: {
            return {...state, agregateWords: action.data }
        }
       default: {
           return state
       }
   }
};

const setWordsAC =(data: Array<WordsType>)=>{
    return{
        type: SET_WORDS,
        data
    } as const
}

export const setGroupsAC =(group: number)=>{
    return{
        type: SET_GROUP,
        group
    } as const
}
export const setPageAC =(page: number)=>{
    return{
        type: SET_PAGE,
        page
    } as const
}
const setErrorWordsAC=(error: string)=>{
    return{
        type: SET_ERROR_WORDS,
        error
    } as const
}

const createDificaltyWordsAC = (word: any)=>{
    return{
        type: CREATE_DIFFICALTY_WORDS,
        word
    } as const
}
const setDifficultWordsIdAC = (data: any)=>{
    return{
        type: SET_DIFFICALTY_WORDS_ID,
        data
    } as const
}

const setagregateWordsAC = (data: Array<WordsType>)=>{
    return{
        type: SET_AGREGATE_WORDS,
        data
    } as const
}

export const setWords = (group: number, page: number) => (dispatch: Dispatch<ActionType>, getState:  () => ReducerAppType):void => {
    const {group, page} = getState().words
    dispatch(loadingAC(true))
    api.get(`/words?group=${group}&page=${page}`)
    .then(res=>{
        dispatch(setWordsAC(res.data))
        dispatch(setGroupsAC(group))
        dispatch(setPageAC(page))
        dispatch(loadingAC(false))
    })
    .catch(err=>{
        dispatch(setErrorWordsAC(err.response ? err.response.data : err.message))
    })
}

export const createDifficaltWords=(word: WordsType, difficalt: string)=>(dispatch: Dispatch<ActionType>, getState:  () => ReducerAppType):void=>{
    const userId=getState().user.user.userId
    console.log(userId)
    api.post(`/users/${userId}/words/${word.id}`, {difficulty: difficalt})
     .then(res=>{
         dispatch(createDificaltyWordsAC(word))
     })
     .catch(err=>{
        dispatch(setErrorWordsAC(err.response ? err.response.data : err.message))

     })
}

export const setDifficultWordsId = () => (dispatch: Dispatch<ActionType>, getState:  () => ReducerAppType):void => {
    const userId=getState().user.user.userId
    const words = getState().words.words
    const difficaltyWordsId = getState().words.difficaltWordsId
    api.get(`/users/${userId}/words`)
    .then(res=>{
         let resalt = res.data.map((i:any)=>i.wordId)
        dispatch(setDifficultWordsIdAC(resalt))
    })
    .catch(err=>{
        dispatch(setErrorWordsAC(err.response ? err.response.data : err.message))
    })
    const arr = words.filter((item: any) => difficaltyWordsId.indexOf(item.id) !== -1);
    dispatch(setagregateWordsAC(arr))
}



export default WordsReducer


