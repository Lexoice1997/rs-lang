import Game from "./game"
//@ts-ignore
import correct from '../../assets/audio/correct.mp3'
//@ts-ignore
import error from '../../assets/audio/error.mp3'
import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, IconButton, Zoom } from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { createUserGameWord, createUserWord, deleteDifficaltyWordsId, updateWords, WordsType } from '../../redux/wordsReducer';
import { StatistiksType } from './audioCollPage';
import { useDispatch, useSelector } from 'react-redux';
import styles from './audioCallGame.module.scss'
import { setNewWordsAC } from '../../redux/gameReducer';
import { ReducerAppType } from '../../redux/store';
import Preloader from '../preloader/preloader';

const baseUrl = 'https://rs-lang-scorpion.herokuapp.com'

const shuffleArray = (array:any) => {
  array.sort(() => Math.random() - 0.5);
}
const GameContainer = ({words, statistics, onFinish}: any)=>{
    const [current, setCurrent] = useState<number>(0);
    const [list, setList] = useState([]);
    const [answer, setAnswer] = useState<WordsType | null>(null);
    const [skip, setSkip] = useState<boolean>(false);
    const [sound, setSound] = useState<boolean>(true);
    const dispatch = useDispatch()
    const currentWord: WordsType = words[current]; //1 элемент из массива
   
    const isLogin = useSelector<ReducerAppType, boolean>((state)=>state.user.isLogin);
    
    
    // const [currentAudio, setCurrentAudio]=useState<HTMLAudioElement | null>(null)
   let currentAudio:any
    useEffect(()=>{
       currentAudio = new Audio(`${baseUrl}/${words[current].audio}`);
    //  setCurrentAudio(currentAudio1)
    }, [current]);
  
    const setLocalStorage =(word: WordsType)=>{
      let localArr: Array<string> =JSON.parse(localStorage.getItem('arr') || '[]') 
        if(!localArr?.find((el: string)=>el===word._id)){
          localArr.push(word._id || word.id || '')
        }
      localStorage.setItem('arr', JSON.stringify(localArr))
    }
  
    const onHandlerNext = useCallback(() => {
      if (current === words.length - 1) {
        onFinish(true);
        return;
      }
      setCurrent(current + 1); // шагаем по массиву слов
      setAnswer(null);
      setSkip(false);
   }, [words, onFinish, current]);
  
    const onWordPlay = () => {  
      currentAudio?.play();   
    };
  
    const onHandlerAnswer = useCallback(
      (answerWord, skip = false) => {
        if (answer) return;
        const isAnswerCorrect = (currentWord.id ?? currentWord._id ) === (answerWord.id ?? answerWord._id)&& !skip;
        let count = currentWord.userWord?.optional?.count ? currentWord.userWord?.optional.count : 0
        let correctCount = currentWord.userWord?.optional?.correct ? currentWord.userWord?.optional.correct : 0
        let uncorrectCount = currentWord.userWord?.optional?.uncorrect ? currentWord.userWord?.optional.uncorrect : 0
        if (isAnswerCorrect) {
          count = count + 1
          correctCount = correctCount + 1
          sound && new Audio(correct).play();
          statistics.current.longestWinStrike += 1
          statistics.current.words.push({ ...currentWord, correct: true, newWord: true}); 
          
          if(isLogin){
            setLocalStorage(currentWord)
            if(currentWord.hasOwnProperty('userWord')){
              //@ts-ignore
              const dif = currentWord.userWord.difficulty
              if(currentWord.userWord?.optional?.count === 2 && currentWord.userWord.difficulty!=='hard'){ 
                dispatch(updateWords(currentWord, dif, {learned: true, count: count, correct: correctCount, uncorrect: uncorrectCount}))
              } else if(currentWord.userWord?.difficulty ==='hard' && currentWord.userWord?.optional?.count === 4){
                dispatch(updateWords(currentWord, 'easy', {learned: true, count: count, correct: correctCount, uncorrect: uncorrectCount}))
                setTimeout(()=>{
                  dispatch(deleteDifficaltyWordsId(currentWord))
                }, 0)
                setTimeout(() => {
                  dispatch(createUserWord(currentWord, 'easy', {learned: true, count: count, correct: correctCount, uncorrect: uncorrectCount})) 
                }, 500);             
              } else { 
                dispatch(updateWords(currentWord, dif, {learned: false, count: count, correct: correctCount, uncorrect: uncorrectCount}))}    
            } else {
              dispatch(createUserGameWord(currentWord, {learned: false, count: count, correct: correctCount, uncorrect: uncorrectCount})) 
            }
          }
         
          
        } else {
          count = 0
          uncorrectCount = uncorrectCount + 1
          statistics.current.longestWinStrike = 0
          sound && new Audio(error).play();
          statistics.current.words.push({ ...currentWord, correct: false, newWord: true});
          
         if(isLogin){
          setLocalStorage(currentWord)
          if(currentWord.hasOwnProperty('userWord') ){
            //@ts-ignore
            let dif = currentWord.userWord.difficulty
           if(currentWord.userWord?.optional?.learned===true){
             dispatch(updateWords(currentWord, dif, {learned: false, count: count, correct: correctCount, uncorrect: uncorrectCount}))
           }
         } else {dispatch(createUserGameWord(currentWord, {learned: false, count: count, correct: correctCount, uncorrect: uncorrectCount})) }
         }
        }
        setAnswer(answerWord);
        setSkip(skip);
  
      },
      [current, answer]
    );
  
    useEffect(() => {
      let answers = words.filter((w: any, idx: number) => idx !== current);
      shuffleArray(answers);
      answers = answers.slice(0, 4);
      answers.push(words[current]);
      shuffleArray(answers);
      setList(answers);
      currentAudio?.play();
  
      return () => {
        setAnswer(null);
        setSkip(false);
      }
    }, [current]);
  
    useEffect(() => {
      const keyHandler = (e:any) => {
        switch (e.code) {
          case 'Digit1'|| 'Numpad1':
            onHandlerAnswer(list[0]);
            break;
          case 'Digit2' || 'Numpad2':
            onHandlerAnswer(list[1]);
            break;
          case 'Digit3' || 'Numpad3':
            onHandlerAnswer(list[2]);
            break;
          case 'Digit4' || 'Numpad4':
            onHandlerAnswer(list[3]);
            break;
          case 'Digit5' || 'Numpad5':
            onHandlerAnswer(list[4]);
            break;
          case 'Space':
            onWordPlay();
            break;
          case 'Enter':
            !answer && onHandlerAnswer(currentWord, true);
            answer && onHandlerNext();
            break;
          default:
            break;
        }
      };
      window.addEventListener('keydown', keyHandler);
  
      return () => {
        window.removeEventListener('keydown', keyHandler);
      };
      
    }, [onHandlerAnswer, list, onWordPlay, onHandlerNext]);
    return(
        <Game
         words={words}
         statistics={statistics}
         onFinish={onFinish}
         currentWord={currentWord}
         onWordPlay={onWordPlay}
         answer = {answer}
         list= {list}
         onHandlerAnswer = {onHandlerAnswer}
         onHandlerNext = {onHandlerNext}
         setSound={setSound}
         sound={sound}
         skip={skip}
     />   
    )
}
export default GameContainer