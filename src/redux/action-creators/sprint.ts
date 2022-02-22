import axios from 'axios';
import {Dispatch} from 'react';
import {ResultWord, SprintAction, SprintActionTypes} from '../../types/sprint';
import api, {getUserId} from "../../api/api";

export const fetchWords = (group: any, page: any) => {
  const userId = getUserId()

  return async (dispatch: Dispatch<SprintAction>) => {
    debugger
    try {
      dispatch({type: SprintActionTypes.FETCH_WORDS})
      const response1 = await axios.get(`https://rs-lang-scorpion.herokuapp.com/words?group=${group}&page=${page}`)
      const optionResponse =  await api.get(`/users/${userId}/words`);
      dispatch({type: SprintActionTypes.FETCH_WORDS_SUCCESS, payload: response1.data})
      //dispatch({type: SprintActionTypes.SET_OPTION, payload: optionResponse.data})
    } catch(e) {
      dispatch({
        type: SprintActionTypes.FETCH_WORDS_ERROR,
        payload: "Произошла ошибка при загрузке пользователя"
      })
    }
  }
}

export const fetchWordsAgreggate = (group: any, page: any, learned: boolean) => {
  const userId = getUserId()
  let wordsPerPage: number = 20;

  let filter = {
    "$and": [
      {
        "$or": [
          {"userWord.optional.learned": learned},
          {"userWord.difficulty": "hard"},
          {"userWord": null}
        ]
      },
      {"page": +group}, {"group": +page}
    ]
  }

  return async (dispatch: Dispatch<SprintAction>) => {
    try {
      dispatch({type: SprintActionTypes.FETCH_WORDS})
      const response1 = await api.get(`/users/${userId}/aggregatedWords`, {
        params: {
          wordsPerPage, filter
        }
      })
      dispatch({type: SprintActionTypes.SET_USER_WORDS, payload: response1.data[0].paginatedResults})
    } catch(e) {
      dispatch({
        type: SprintActionTypes.FETCH_WORDS_ERROR,
        payload: "Произошла ошибка при загрузке пользователя"
      })
    }
  }
}

export const setWord = (words: any, indexOriginWord: number, indexTranslateWord: number): SprintAction => {
  return {type: SprintActionTypes.SET_WORD, payload:
                                            {originWord: words[indexOriginWord].word,
                                            translateWord: words[indexTranslateWord].wordTranslate,
                                            originWordId: (words[indexOriginWord].id ?? words[indexOriginWord]._id),
                                            translateWordId: (words[indexTranslateWord].id ?? words[indexTranslateWord]._id),
                                            audio: words[indexOriginWord].audio,
                                            word: words[indexOriginWord]}}
}

export const setTotalScore = (score: number): SprintAction => {
  return {type: SprintActionTypes.SET_TOTAL_SCORE, payload: score}
}

export const setWinStrike = (winStrike: number): SprintAction => {
  return {type: SprintActionTypes.SET_WINSTRIKE, payload: winStrike}
}

export const setBird = (bird: number): SprintAction => {
  return {type: SprintActionTypes.SET_BIRD, payload: bird}
}

export const setCorrectAnswer = (answer: ResultWord): SprintAction => {
  return {type: SprintActionTypes.SET_CORRECT_ANSWER, payload: answer}
}

export const setIncorrectAnswer = (answer: ResultWord): SprintAction => {
  return {type: SprintActionTypes.SET_INCORRECT_ANSWER, payload: answer}
}

export const setWinstrikeScore = (bird: number): SprintAction => {
  if (bird === 1) {
    return {type: SprintActionTypes.SET_WINSTRIKE_SCORE, payload: 20}
  }
  if (bird === 2) {
    return {type: SprintActionTypes.SET_WINSTRIKE_SCORE, payload: 40}
  }
  if (bird === 3) {
    return {type: SprintActionTypes.SET_WINSTRIKE_SCORE, payload: 80}
  }
  return {type: SprintActionTypes.SET_WINSTRIKE_SCORE, payload: 10}
}

export const resetData = (): SprintAction => {
  return {type: SprintActionTypes.RESET_DATA}
}

export const setLongestWinStrike = (longestWinStrike: number): SprintAction => {
  return {type: SprintActionTypes.SET_LONGEST_WINSTRIKE, payload: longestWinStrike}
}

export const setNewWords = (count: number): SprintAction => {
  return {type: SprintActionTypes.SET_NEW_WORDS, payload: count}
}
