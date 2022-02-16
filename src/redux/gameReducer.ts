import { Dispatch } from "redux";
import api from "../api/api";
import { ReducerAppType } from "./store";
import {WordsType } from "./wordsReducer";
export const SET_GAME_WORDS = 'SET_GAME_WORDS';
export const SET_ERROR_GAME='SET_ERROR_GAME' 
export const SET_USER_WORDS='SET_USER_WORDS'

export type InitialStateGameType = {
    wordsList: Array<WordsType>
    error: string
}

export type ActionType = 
| ReturnType<typeof setWordsGameAC>
| ReturnType<typeof setErrorGamesAC>
| ReturnType<typeof setWordsUserAC>



const initialState:InitialStateGameType = {
    wordsList:  [],
    error: '', 
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
    default: return state
   }
};

export const setWordsGame = (group: number = 0, page: number = 0)=>(dispatch: Dispatch<ActionType>):void=>{ 
    
    api.get(`/words?group=${group}&page=${page}`)
    .then((res)=>{
        dispatch(setWordsGameAC(res.data))
    })
    .catch((err)=>{
        dispatch(setErrorGamesAC(err.response ? err.response.data : err.message))
    })    
}

export const setWordsUser = (group: number, page: number, learned: boolean) => (dispatch: Dispatch<ActionType>, getState:  () => ReducerAppType):void => {
    
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
        }).catch((err)=>{
            dispatch(setErrorGamesAC (err.response ? err.response.data : err.message))
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
                api.get(`/users/${userId}/aggregatedWords`, {params: {
                    wordsPerPage, filter
                }}).then((res)=>{
                    arr.push(...res.data[0].paginatedResults)
                    dispatch(setWordsUserAC([...arr]))
                })
            }else  dispatch(setWordsUserAC(res.data[0].paginatedResults))
            
        })
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
    }
}
export const setWordsGameAC = (data: Array<WordsType>)=>{  
    return {
        type: SET_GAME_WORDS,
        data
    }
}

export default GameReducer