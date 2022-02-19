import { Dispatch } from "redux";
import api from "../api/api";
import { ReducerAppType } from "./store";
import {WordsType } from "./wordsReducer";
export const SET_GAME_WORDS = 'SET_GAME_WORDS';
export const SET_ERROR_GAME='SET_ERROR_GAME' 
export const SET_USER_WORDS='SET_USER_WORDS'
export const SET_NEW_WORDS = 'SET_NEW_WORDS'
export const SET_LOADING_GAME = 'SET_LOADING_GAME'

export type InitialStateGameType = {
    newWords: Array<WordsType>
    wordsList: Array<WordsType>
    error: string
    isLoading: boolean
}

export type ActionType = 
| ReturnType<typeof setWordsGameAC>
| ReturnType<typeof setErrorGamesAC>
| ReturnType<typeof setWordsUserAC>
| ReturnType<typeof setLoadingGameAC>




const initialState:InitialStateGameType = {
    newWords:[],
    wordsList:  [],
    error: '',
    isLoading: false 
};
const GameReducer = (state=initialState, action:any): InitialStateGameType=>{
   switch (action.type) {
    case SET_GAME_WORDS:{ 
    return {...state, wordsList: action.data};
    }       
    case SET_ERROR_GAME:{
        return {...state, error: action.err} 
    }   
    case SET_USER_WORDS:{
        return{...state, wordsList: action.data}
    }
    case SET_LOADING_GAME:{
        return {...state, isLoading: action.loading}
    }
    default: return state
   }
};

export const setWordsGame = (group: number = 0, page: number = 0)=>(dispatch: Dispatch<ActionType>):void=>{ 
    dispatch(setLoadingGameAC(true))
    api.get(`/words?group=${group}&page=${page}`)
    .then((res)=>{
        dispatch(setWordsGameAC(res.data))
        dispatch(setLoadingGameAC(false))
    })
    .catch((err)=>{
        dispatch(setErrorGamesAC(err.response ? err.response.data : err.message))
    })
    .finally(()=>{
        dispatch(setLoadingGameAC(false))
    })    
}

export const setWordsUser = (group: number, page: number, learned: boolean) => (dispatch: Dispatch<ActionType>, getState:  () => ReducerAppType):void => {
    dispatch(setLoadingGameAC(true))
    const userId=getState().user.user.userId
    let wordsPerPage: number 
    const arr: Array<WordsType> = []
    let filter={
        "$and": [
          {"$or":[
            {"userWord.optional.learned": learned},
            {"userWord.difficulty":"hard"},
            {"userWord":null}
          ]},
          {"page": page },{"group":group }
        ]
      } 
    if(page===0){    
        wordsPerPage = 20
        api.get(`/users/${userId}/aggregatedWords`, {params: {
            wordsPerPage, filter
        }}).then((res)=>{
            dispatch(setWordsUserAC(res.data[0].paginatedResults))
            dispatch(setLoadingGameAC(false))
        }).catch((err)=>{
            dispatch(setErrorGamesAC (err.response ? err.response.data : err.message))
        }).finally(()=>{
            dispatch(setLoadingGameAC(false))
        })
    }else {
        wordsPerPage = 20
        api.get(`/users/${userId}/aggregatedWords`, {params: {
            wordsPerPage, filter
        }}).then((res)=>{
            if(res.data[0].totalCount[0].count < 20){
                
                arr.push(...res.data[0].paginatedResults)
                wordsPerPage = wordsPerPage - res.data[0].totalCount[0].count
                filter={
                    "$and": [
                        {"$or":[
                          {"userWord.optional.learned": learned},
                          {"userWord.difficulty":"hard"},
                          {"userWord":null}
                        ]},
                        {"page": page-1 },{"group":group }
                      ] 
                }
                dispatch(setLoadingGameAC(false))
                api.get(`/users/${userId}/aggregatedWords`, {params: {
                    wordsPerPage, filter
                }}).then((res)=>{
                    arr.push(...res.data[0].paginatedResults)
                    dispatch(setWordsUserAC([...arr]))
                    dispatch(setLoadingGameAC(false))
                })
            }else {
                dispatch(setWordsUserAC(res.data[0].paginatedResults))
                dispatch(setLoadingGameAC(false))
            } 
            
        })
    }          
}
const setLoadingGameAC=(loading:boolean)=>{
    return{
        type: SET_LOADING_GAME, 
        loading
    } as const
}
export const setNewWordsAC = (word:WordsType )=>{
    return {
        type: SET_NEW_WORDS,
        word
    }
}
export const setWordsUserAC = (data: Array<WordsType>)=>{
    return{
        type: SET_USER_WORDS,
        data
    } as const
}

export const setErrorGamesAC = (err: string)=>{
    return{
        type: SET_ERROR_GAME,
        err
    } as const
}
export const setWordsGameAC = (data: Array<WordsType>)=>{  
    return {
        type: SET_GAME_WORDS,
        data
    } as const
}

export default GameReducer