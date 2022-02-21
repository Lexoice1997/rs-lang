import { WordsType } from "../redux/wordsReducer";
import {SET_USER_WORDS} from "../redux/gameReducer";

export interface Word {
  originWord?: string;
  translateWord?: string;
  originWordId?: string;
  translateWordId?: string;
  audio?: string;
  word?: WordsType;
}

export interface ResultWord {
  id?: string,
  _id?: string,
  origin?: string;
  translate?: string;
  audio?: string;
  result?: boolean;
  word?: WordsType
}

export interface SprintState {
  words: Array<WordsType>;
  word?: Word;
  loading: boolean;
  error: null | string;
  totalScore: number;
  winStrikeScore: number;
  winStrike: number;
  bird: number;
  correctAnswer: Array<ResultWord>;
  incorrectAnswer: Array<ResultWord>;
  longestWinStrike: number;
  page: number;
  group: any;
  option: any;
  newWords: number;
}
export enum SprintActionTypes {
  FETCH_WORDS = 'FETCH_WORDS',
  SET_WORD = 'SET_WORD',
  SET_TOTAL_SCORE = 'SET_TOTAL_SCORE',
  SET_WINSTRIKE_SCORE = 'SET_WINSTRIKE_SCORE',
  SET_WINSTRIKE = 'SET_WINSTRIKE',
  SET_BIRD = 'SET_BIRD',
  SET_CORRECT_ANSWER = 'SET_CORRECT_ANSWER',
  SET_INCORRECT_ANSWER = 'SET_INCORRECT_ANSWER',
  RESET_DATA = 'RESET_DATA',
  SET_LONGEST_WINSTRIKE = 'SET_LONGEST_WINSTRIKE',
  SET_PAGE = 'SET_PAGE',
  SET_GROUP = 'SET_GROUP',
  SET_OPTION = 'SET_OPTION',
  SET_USER_WORDS = 'SET_USER_WORDS',
  SET_NEW_WORDS = 'SET_NEW_WORDS',
  FETCH_WORDS_SUCCESS = 'FETCH_WORDS_SUCCESS',
  FETCH_WORDS_ERROR = 'FETCH_WORDS_ERROR',
}

interface FetchWordsAction {
  type: SprintActionTypes.FETCH_WORDS
}

interface SetWordAction {
  type: SprintActionTypes.SET_WORD;
  payload: Word;
}

interface SetTotalScore {
  type: SprintActionTypes.SET_TOTAL_SCORE;
  payload: number;
}

interface SetWinstrikeScore {
  type: SprintActionTypes.SET_WINSTRIKE_SCORE;
  payload: number;
}

interface SetWinStrike {
  type: SprintActionTypes.SET_WINSTRIKE;
  payload: number;
}

interface SetBird {
  type: SprintActionTypes.SET_BIRD;
  payload: number;
}

interface SetCorrectAnswer {
  type: SprintActionTypes.SET_CORRECT_ANSWER;
  payload: ResultWord;
}

interface SetIncorrectAnswer {
  type: SprintActionTypes.SET_INCORRECT_ANSWER;
  payload: ResultWord;
}

interface ResetData {
  type: SprintActionTypes.RESET_DATA;
}

interface SetLongestWinStrike {
  type: SprintActionTypes.SET_LONGEST_WINSTRIKE;
  payload: number;
}

interface SetPage {
  type: SprintActionTypes.SET_PAGE;
  payload: number;
}

interface SetGroup {
  type: SprintActionTypes.SET_GROUP;
  payload: any;
}

interface SetOption {
  type: SprintActionTypes.SET_OPTION;
  payload: any;
}

interface SetUserWordsSprint {
  type: SprintActionTypes.SET_USER_WORDS;
  payload: any;
}

interface SetNewWords {
  type: SprintActionTypes.SET_NEW_WORDS;
  payload: number;
}

interface FetchWordsSuccessAction {
  type: SprintActionTypes.FETCH_WORDS_SUCCESS;
  payload: Array<WordsType>
}

interface FetchWordsErrorAction {
  type: SprintActionTypes.FETCH_WORDS_ERROR;
  payload: string;
}

export type SprintAction = FetchWordsAction
                          | FetchWordsSuccessAction
                          | FetchWordsErrorAction
                          | SetWordAction
                          | SetTotalScore
                          | SetWinstrikeScore
                          | SetWinStrike
                          | SetBird
                          | SetCorrectAnswer
                          | SetIncorrectAnswer
                          | ResetData
                          | SetLongestWinStrike
                          | SetPage
                          | SetGroup
                          | SetOption
                          | SetUserWordsSprint
                          | SetNewWords;
