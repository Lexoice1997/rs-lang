import axios from 'axios';
import { Dispatch } from 'react';
import { getRandomInt } from '../../js';
import { ResultWord, SprintAction, SprintActionTypes } from '../../types/sprint';

export const fetchWords = (group: any) => {
  const page1: string = String(getRandomInt(0, 15))
  const page2: string = String(getRandomInt(15, 29))
  
  return async (dispatch: Dispatch<SprintAction>) => {
    try {
      dispatch({type: SprintActionTypes.FETCH_WORDS})
      const response1 = await axios.get(`https://rs-lang-scorpion.herokuapp.com/words?group=${group.title}&page=${page1}`)
      const response2 = await axios.get(`https://rs-lang-scorpion.herokuapp.com/words?group=${group.title}&page=${page2}`)
      dispatch({type: SprintActionTypes.FETCH_WORDS_SUCCESS, payload: [...response1.data, ...response2.data]})
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
                                            originWordId: words[indexOriginWord].id,
                                            translateWordId: words[indexTranslateWord].id }}
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