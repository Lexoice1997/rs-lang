import {Dispatch} from "react";
import api from "../api/api";
import {ReducerAppType} from "./store";
import {loadingAC, SET_LOADER} from "./userReducer";

export const APDATE_WORDS = 'APDATE_DIFFICALTY_WORDS'
export const SET_WORDS = 'SET_WORDS';
export const SET_GROUP = 'SET_GROUP';
export const SET_PAGE = 'SET_PAGE';
export const SET_ERROR_WORDS = 'SET_ERROR_WORDS';
export const CREATE_DIFFICALTY_WORDS = 'CREATE_DIFFICALTY_WORDS'
export const SET_DIFFICALTY_WORDS = 'SET_DIFFICALTY_WORDS,'
export const WORD_PLAYING = 'WORD_PLAYING'
export const DELETE_DIFFICALTY_WORDS = 'DELETE_DIFFICALTY_WORDS'
export const CREATE_LEARNED_WORDS = 'CREATE_LEARNED_WORDS'
export const DELETE_LEARNED_WORDS = 'DELETE_LEARNED_WORDS'
export const CREATE_USER_GAME_WORD = 'CREATE_USER_GAME_WORD,'
export const CREATE_USER_WORD = 'CREATE_USER_WORD'
export const SET_LOADING_WORD = 'SET_LOADING_WORD'

export type UserWordType = {
  difficulty?: string | undefined,
  optional?: { learned?: boolean, count?: number, correct?: number, uncorrect?: number }
}

export type AgregatedResultsArrType = {
  paginatedResults: Array<WordsType>,
  totalCount: Array<{ count: number }>
}
export type DifficaltyWords = {
  id?: string,
  difficulty: string,
  wordId?: string
}

export type WordsType = {
  id?: string,
  _id?: string,
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
  textExampleTranslate: string,
  userWord?: UserWordType
}
export type InitialStateWordsType = {
  words: Array<WordsType>
  group: number
  page: number
  isLoading: boolean
  error: string
  wordPlaying: string | null,

}
const dataGroupFormLocalStorage: string | null = localStorage.getItem('group')
const group: number = +JSON.parse(dataGroupFormLocalStorage !== null ? dataGroupFormLocalStorage : '0')

const dataPageFormLocalStorage: string | null = localStorage.getItem('page')
const page: number = +JSON.parse(dataPageFormLocalStorage !== null ? dataPageFormLocalStorage : '0')

const initialState: InitialStateWordsType = {
  words: [],
  group: group ? group : 0,
  page: page ? page : 0,
  isLoading: false,
  error: '',
  wordPlaying: null,
}
export type ActionType =
  | ReturnType<typeof loadingAC>
  | ReturnType<typeof setWordsAC>
  | ReturnType<typeof setGroupsAC>
  | ReturnType<typeof setPageAC>
  | ReturnType<typeof setErrorWordsAC>
  | ReturnType<typeof deleteDifficaltyWordsAC>
  | ReturnType<typeof setAgregatedWordsAC>
  | ReturnType<typeof setWordPlayingAC>
  | ReturnType<typeof updateWordsAC>
  | ReturnType<typeof createUserGameWordAC>
  | ReturnType<typeof createUserWordAC>
  | ReturnType<typeof setLoadingWordAC>


const WordsReducer = (state = initialState, action: ActionType): InitialStateWordsType => {

  switch (action.type) {
    case SET_WORDS: {
      return {...state, words: action.data}
    }
    case SET_GROUP: {
      return {...state, group: action.group}
    }
    case SET_PAGE: {
      return {...state, page: action.page}
    }
    case SET_LOADER: {
      return {...state, isLoading: action.isLoading}
    }
    case SET_ERROR_WORDS: {
      return {...state, error: action.error}
    }
    case APDATE_WORDS: {

      return {
        ...state,
        words: state.words.map(
          (el) => (el._id ?? el.id) === action.word._id
            ? {
              ...el, userWord: el.userWord
                ? {
                  ...el.userWord,
                  difficulty: action.difficulty || '',
                  optional: {...el.userWord.optional, ...action.optional}
                }
                : el.userWord
            }
            : el
        )
      }
    }
    case DELETE_DIFFICALTY_WORDS: {

      return {...state, words: state.words.filter(el => (el._id ?? el.id) !== action.word._id)}
    }
    case SET_DIFFICALTY_WORDS: {
      return {...state, words: action.data}
    }
    case CREATE_USER_GAME_WORD: {
      //@ts-ignore
      return {
        ...state, words: state.words.map(el => {
          if ((el._id ?? el.id) === (action.word._id ?? action.word.id)) {
            return {...el, userWord: {...el.userWord, optional: action.optional}}
          }
          return el
        })
      }
    }
    case CREATE_USER_WORD: {
      //@ts-ignore
      return {
        ...state, words: state.words.map(el => {
          if ((el._id ?? el.id) === (action.word._id ?? action.word.id)) {
            return {...el, userWord: {...el.userWord, difficulty: action.difficulty, optional: action.optional}}
          }
          return el
        })
      }
    }
    case WORD_PLAYING: {
      return {...state, wordPlaying: action.wordId}
    }
    case SET_LOADING_WORD: {
      return {...state, isLoading: action.loading}
    }
    default: {
      return state
    }
  }
};
//action creator
const setWordsAC = (data: Array<WordsType>) => {
  return {
    type: SET_WORDS,
    data
  } as const
}

export const setGroupsAC = (group: number) => {
  return {
    type: SET_GROUP,
    group
  } as const
}
export const setPageAC = (page: number) => {
  return {
    type: SET_PAGE,
    page
  } as const
}
const setErrorWordsAC = (error: string) => {
  return {
    type: SET_ERROR_WORDS,
    error
  } as const
}

const setAgregatedWordsAC = (data: any) => {

  return {
    type: SET_DIFFICALTY_WORDS,
    data
  } as const
}

export const setWordPlayingAC = (wordId: string | null) => {
  return {
    type: WORD_PLAYING,
    wordId
  } as const
}

export const deleteDifficaltyWordsAC = (word: WordsType) => {

  return {
    type: DELETE_DIFFICALTY_WORDS,
    word
  } as const
}

export const createUserGameWordAC = (word: WordsType, optional: any) => {
  return {
    type: CREATE_USER_GAME_WORD,
    word,
    optional
  } as const
}
export const updateWordsAC = (word: WordsType, difficulty: string | undefined | null, optional: {} | undefined) => {
  return {
    type: APDATE_WORDS,
    word,
    difficulty,
    optional
  } as const
}
const setLoadingWordAC = (loading: boolean) => {
  return {
    type: SET_LOADING_WORD,
    loading
  } as const
}
export const createUserWordAC = (word: WordsType, difficulty?: string, optional?: {}) => {
  return {
    type: CREATE_USER_WORD,
    word,
    difficulty,
    optional
  } as const
}
//thunc

export const updateWords = (word: WordsType, difficulty: string | undefined | null, optional: {} | undefined) => (dispatch: Dispatch<ActionType>, getState: () => ReducerAppType): void => {
  const userId = getState().user.user.userId
  let status: string | undefined | null
  status = difficulty
  let param: {} | undefined
  param = optional
  if (difficulty === null || difficulty === undefined) {
    status = word.userWord?.difficulty
  } else status = difficulty
  if (!optional) {
    param = word.userWord?.optional
  } else param = optional
  api.put(`/users/${userId}/words/${word._id ?? word.id}`, {difficulty: status, optional: param})
    .then((res) => {
      dispatch(updateWordsAC(word, status, param))
    })
    .catch((err) => {
      dispatch(setErrorWordsAC(err.response ? err.response.data : err.message))
    })

}

export const setWords = (group: number, page: number) => (dispatch: Dispatch<ActionType>, getState: () => ReducerAppType): void => {
  const {group, page} = getState().words
  dispatch(setLoadingWordAC(true))
  api.get(`/words?group=${group}&page=${page}`)
    .then(res => {
      dispatch(setWordsAC(res.data))
      dispatch(setGroupsAC(group))
      dispatch(setPageAC(page))
      dispatch(setLoadingWordAC(false))
    })
    .catch(err => {
      dispatch(setErrorWordsAC(err.response ? err.response.data : err.message))
    })
    .finally(() => {
      dispatch(setLoadingWordAC(false))
    })
}

export const setAgregateWords = (group: number, page: number, filter: any) => (dispatch: Dispatch<ActionType>, getState: () => ReducerAppType): void => {
  const userId = getState().user.user.userId
  const wordsPerPage: number = 3600
  dispatch(setLoadingWordAC(true))
  api.get(`/users/${userId}/aggregatedWords`, {
    params: {
      wordsPerPage, filter
    }
  })
    .then(res => {
      dispatch(setAgregatedWordsAC(res.data[0].paginatedResults))
      dispatch(setLoadingWordAC(true))
    })
    .catch(err => {
      dispatch(setErrorWordsAC(err.response ? err.response.data : err.message))
    })
    .finally(() => {
      dispatch(setLoadingWordAC(false))
    })
}

export const deleteDifficaltyWordsId = (word: WordsType) => (dispatch: Dispatch<ActionType>, getState: () => ReducerAppType): void => {

  const userId = getState().user.user.userId
  api.delete(`/users/${userId}/words/${word._id ?? word.id}`)
    .then(res => {
      dispatch(deleteDifficaltyWordsAC(word))
    })

    .catch(err => {
      dispatch(setErrorWordsAC(err.response ? err.response.data : err.message))
    })
}

export const createUserGameWord = (word: WordsType, optional?: {}) => (dispatch: Dispatch<ActionType>, getState: () => ReducerAppType): void => {
  const userId = getState().user.user.userId
  api.post(`/users/${userId}/words/${word._id ?? word.id}`, {optional: optional})
    .then((res) => {
      dispatch(createUserGameWordAC(word, optional))
    })
    .catch(err => {
      dispatch(setErrorWordsAC(err.response ? err.response.data : err.message))
    })
}

export const createUserWord = (word: WordsType, difficulty?: string, optional?: {}) => (dispatch: Dispatch<ActionType>, getState: () => ReducerAppType): void => {
  const userId = getState().user.user.userId
  api.post(`/users/${userId}/words/${word._id ?? word.id}`, {difficulty: difficulty, optional: optional})
    .then((res) => {
      dispatch(createUserWordAC(word, difficulty, optional))
    })
    .catch(err => {
      dispatch(setErrorWordsAC(err.response ? err.response.data : err.message))
    })
}

export default WordsReducer


