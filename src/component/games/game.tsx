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
import { useDispatch } from 'react-redux';
import styles from './audioCallGame.module.scss'

const baseUrl = 'https://rs-lang-scorpion.herokuapp.com'

const shuffleArray = (array:any) => {
  array.sort(() => Math.random() - 0.5);
}

type PropsType = {
  words: Array<WordsType>
  statistics: StatistiksType
  onFinish: (el: boolean)=>void
}
const Game = ({ words, statistics, onFinish}:any) => {
 
  const [current, setCurrent] = useState<number>(0);
  const [list, setList] = useState([]);
  const [answer, setAnswer] = useState<WordsType | null>(null);
  const [skip, setSkip] = useState<boolean>(false);
  const [sound, setSound] = useState<boolean>(true);
  const dispatch = useDispatch()
  const currentWord: WordsType = words[current]; //1 элемент из массива
  const currentAudio = new Audio(`${baseUrl}/${words[current].audio}`);

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
    currentAudio.play();
  };

  const onHandlerAnswer = useCallback(
    (answerWord, skip = false) => {
      if (answer) return;
      const isAnswerCorrect = (currentWord.id ?? currentWord._id ) === (answerWord.id ?? answerWord._id)&& !skip;
      let count = currentWord.userWord?.optional.count ? currentWord.userWord?.optional.count : 0
     
      if (isAnswerCorrect) {
        count = count + 1
        sound && new Audio(correct).play();
        statistics.current.longestWinStrike += 1
        statistics.current.words.push({ ...currentWord, correct: true, newWord: true});  
        // if(currentWord.hasOwnProperty('userWord')){
        //   //@ts-ignore
        //   const dif = currentWord.userWord.difficulty
        //   if(currentWord.userWord?.optional.count === 2 && currentWord.userWord.difficulty!=='hard'){ 
        //     dispatch(updateWords(currentWord, dif, {learned: true, count: count, correct: true, uncorrect: false}))
        //   } else if(currentWord.userWord?.difficulty ==='hard' && currentWord.userWord?.optional.count === 4){
        //     dispatch(updateWords(currentWord, 'easy', {learned: true, count: count, correct: true, uncorrect: false}))
        //     setTimeout(()=>{
        //       dispatch(deleteDifficaltyWordsId(currentWord))
        //     }, 0)
        //     setTimeout(() => {
        //       dispatch(createUserWord(currentWord, 'easy', {learned: true, count: count, correct: true, uncorrect: false})) 
        //     }, 500);             
        //   } else { 
        //     dispatch(updateWords(currentWord, dif, {learned: false, count: count, correct: true, uncorrect: false}))}    
        // } else {
        //   dispatch(createUserGameWord(currentWord, {learned: false, count: count, correct: true, uncorrect: false})) 
        // }
        
      } else {
        count = 0
        statistics.current.longestWinStrike = 0
        sound && new Audio(error).play();
        statistics.current.words.push({ ...currentWord, correct: false, newWord: true}); 
        // if(currentWord.hasOwnProperty('userWord')){
        //    //@ts-ignore
        //    let dif = currentWord.userWord.difficulty
        //   if(currentWord.userWord?.optional.learned===true){
        //     dispatch(updateWords(currentWord, dif, {learned: false, count: count, correct: false, uncorrect: true}))
        //   }
        // } else {dispatch(createUserGameWord(currentWord, {learned: false, count: count, correct: false, uncorrect: true})) }
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
    currentAudio.play();

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


  const ViewAnswer = () => {
    return (
      <Zoom in={true}>
        <Box className={styles.ansverContainer}>
          <Box className={styles.ansverIcon} style={{ backgroundImage: `url(${baseUrl}/${currentWord.image})` }} />
          <Box className={styles.ansverWord}>
            <IconButton className={styles.ansverVolumeButton} color="default" component="span" onClick={onWordPlay}>
              <VolumeUpIcon className={styles.iconVolumeButton} />
            </IconButton>
            {currentWord.word}
          </Box>
        </Box>
      </Zoom >
    );
  };

  return (
    <>
      <Box className={styles.container}>
        <Box className={styles.content}>
          {
            !answer &&
            <Box className={styles.volumeContainer}>
              <IconButton color="default" component="span" onClick={onWordPlay}>
                <VolumeUpIcon className={styles.volumeIcon}/>
              </IconButton>
            </Box>
          }
          {answer && <ViewAnswer />}
        </Box>
        <Box className={styles.answersContainer}>
          {list && list.map((word:WordsType, i:number) => (
            <Box
            className={`
            ${styles.answers}
            ${answer ? ((word.id??word._id) === (answer.id??answer?._id) && (answer.id?? answer?._id) === (currentWord.id??currentWord._id)) && styles.answerCorrect : ''}
            ${answer ? ((word.id??word._id) === (answer.id??answer?._id) && (answer.id??answer?._id) !== (currentWord.id??currentWord._id)) && styles.answerUncorrect : ''}
            ${answer ? ((word.id??word._id) !== (answer.id??answer?._id) && (currentWord.id??currentWord._id) !== (word.id??word._id) && answer) && styles.unselectedWordsStyle:''}
            ${answer ?  ((word.id??word._id) !== (answer.id??answer?._id) && (currentWord.id??currentWord._id) === (word.id??word._id) && answer) && styles.wrongChoisRightWordStyle : ''}
          `}
              key={i}
              component="div"
              onClick={() => onHandlerAnswer(word)}
            >
              <Box component="span" className={styles.answerNum}>
                {((word._id ?? word.id) === (answer?._id ?? answer?.id) && (answer?._id ?? answer?.id) === (currentWord.id ?? currentWord._id) && !skip) ? <CheckCircleIcon className={styles.iconSuccess} /> : ''}
              </Box>
              <Box className={styles.answerWord} component="span">{word.wordTranslate}</Box>
            </Box>
          ))}
        </Box>
        {!answer && <Button className={styles.notKnow} variant="outlined" onClick={() => onHandlerAnswer(currentWord, true)}>не знаю</Button>}
        {answer && <Button className={styles.next} variant="outlined"  onClick={() => onHandlerNext()}>вперед</Button>}
        <Box className={`${styles.sound} ${sound ? styles.volumeSound : styles.muteSound}`} onClick={() => setSound(sound => !sound)}></Box>
      </Box>
    </>
  );
};

export default Game;