//@ts-ignore
import correct from '../../assets/audio/correct.mp3'
//@ts-ignore
import error from '../../assets/audio/error.mp3'
import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, IconButton, Zoom } from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { createLernedWords, deleteDifficaltyWordsId, updateWords, WordsType } from '../../redux/wordsReducer';
import { StatistiksType } from './audioCollPage';
import { useDispatch } from 'react-redux';

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
      if (isAnswerCorrect) {
        sound && new Audio(correct).play();
        statistics.current.counter+=1
        statistics.current.words.push({ ...currentWord, correct: true});
        // if(currentWord.userWord?.difficulty){
        //   dispatch(updateWords(currentWord, null, {learned: true} ))
        //   dispatch(deleteDifficaltyWordsId(currentWord))
        // }else {dispatch(createLernedWords(currentWord, {learned: true}))}
      } else {
        statistics.current.counter=0
        sound && new Audio(error).play();
        statistics.current.words.push({ ...currentWord, correct: false });
        // if(currentWord.userWord?.difficulty){
        //   dispatch(updateWords(currentWord, null, {learned: false} ))
        //   dispatch(deleteDifficaltyWordsId(currentWord))
        // }else {dispatch(createLernedWords(currentWord, {learned: false}))}
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
        case 'Digit1':
          onHandlerAnswer(list[0]);
          break;
        case 'Digit2':
          onHandlerAnswer(list[1]);
          break;
        case 'Digit3':
          onHandlerAnswer(list[2]);
          break;
        case 'Digit4':
          onHandlerAnswer(list[3]);
          break;
        case 'Digit5':
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
        <Box >
          <Box style={{ backgroundImage: `url(${baseUrl}/${currentWord.image})` }} />
          <Box >
            <IconButton color="default" component="span" onClick={onWordPlay}>
              <VolumeUpIcon  />
            </IconButton>
            {currentWord.word}
          </Box>
        </Box>
      </Zoom >
    );
  };

  return (
    <>
      <Box >
        <Box >
          {
            !answer &&
            <Box >
              <IconButton color="default" component="span" onClick={onWordPlay}>
                <VolumeUpIcon />
              </IconButton>
            </Box>
          }
          {answer && <ViewAnswer />}
        </Box>
        <Box >
          {list && list.map((word:WordsType, idx:number) => (
            <Box
              key={idx}
              component="div"
              onClick={() => onHandlerAnswer(word)}
            >
              <Box component="span">
                {((word._id ?? word.id) === (answer?._id ?? answer?.id) && (answer?._id ?? answer?.id) === (currentWord.id ?? currentWord._id) && !skip) ? <CheckCircleIcon  /> : idx + 1}
              </Box>
              <Box component="span">{word.wordTranslate}</Box>
            </Box>
          ))}
        </Box>
        {!answer && <Button variant="outlined" onClick={() => onHandlerAnswer(currentWord, true)}>не знаю</Button>}
        {answer && <Button variant="outlined"  onClick={() => onHandlerNext()}><ArrowRightAltIcon /></Button>}
        <Box onClick={() => setSound(sound => !sound)}></Box>
      </Box>
    </>
  );
};

export default Game;