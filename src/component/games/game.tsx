//@ts-ignore
import correct from '../../assets/audio/correct.mp3'
//@ts-ignore
import error from '../../assets/audio/error.mp3'
import {useCallback, useEffect, useRef, useState} from "react";
import {Box, Button, IconButton, Zoom} from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {
  createUserGameWord,
  createUserWord,
  deleteDifficaltyWordsId,
  updateWords,
  WordsType
} from '../../redux/wordsReducer';
import {StatistiksType} from './audioCollPage';
import {useDispatch, useSelector} from 'react-redux';
import styles from './audioCallGame.module.scss'
import {setNewWordsAC} from '../../redux/gameReducer';
import {ReducerAppType} from '../../redux/store';
import Preloader from '../preloader/preloader';

const baseUrl = 'https://rs-lang-scorpion.herokuapp.com'

const Game = ({currentWord, onWordPlay, answer, list, onHandlerAnswer, onHandlerNext, setSound, sound, skip, currentAudio}:any) => {
  const onWordPlayA = () => { 
    currentAudio?.play();   
  };
  const ViewAnswer = () => {
    return (
      <Zoom in={true}>
        <Box className={styles.ansverContainer}>
          <Box className={styles.ansverIcon} style={{backgroundImage: `url(${baseUrl}/${currentWord.image})`}}/>
          <Box className={styles.ansverWord}>
            <IconButton className={styles.ansverVolumeButton} color="default" component="span" onClick={()=>onWordPlayA()}>
              <VolumeUpIcon className={styles.iconVolumeButton}/>
            </IconButton>
            {currentWord.word}
          </Box>
        </Box>
      </Zoom>
    );
  };

  return (
    <>
      <Box className={styles.container}>
        <Box className={styles.content}>
          {
            !answer &&
            <Box className={styles.volumeContainer}>
              <IconButton color="default" component="span" onClick={()=>onWordPlayA()}>
                <VolumeUpIcon className={styles.volumeIcon}/>
              </IconButton>
            </Box>
          }
          {answer && <ViewAnswer/>}
        </Box>
        <Box className={styles.answersContainer}>
          {list && list.map((word: WordsType, i: number) => (
            <Box
              className={`
            ${styles.answers}
            ${answer ? ((word.id ?? word._id) === (answer.id ?? answer?._id) && (answer.id ?? answer?._id) === (currentWord.id ?? currentWord._id)) && styles.answerCorrect : ''}
            ${answer ? ((word.id ?? word._id) === (answer.id ?? answer?._id) && (answer.id ?? answer?._id) !== (currentWord.id ?? currentWord._id)) && styles.answerUncorrect : ''}
            ${answer ? ((word.id ?? word._id) !== (answer.id ?? answer?._id) && (currentWord.id ?? currentWord._id) !== (word.id ?? word._id) && answer) && styles.unselectedWordsStyle : ''}
            ${answer ? ((word.id ?? word._id) !== (answer.id ?? answer?._id) && (currentWord.id ?? currentWord._id) === (word.id ?? word._id) && answer) && styles.wrongChoisRightWordStyle : ''}
          `}
              key={i}
              component="div"
              onClick={() => onHandlerAnswer(word)}
            >
              <Box component="span" className={styles.answerNum}>
                {((word._id ?? word.id) === (answer?._id ?? answer?.id) && (answer?._id ?? answer?.id) === (currentWord.id ?? currentWord._id) && !skip) ?
                  <CheckCircleIcon className={styles.iconSuccess}/> : ''}
              </Box>
              <Box className={styles.answerWord} component="span">{word.wordTranslate}</Box>
            </Box>
          ))}
        </Box>
        {!answer && <Button className={styles.notKnow} variant="outlined" onClick={() => onHandlerAnswer(currentWord, true)}>не знаю</Button>}
        {answer && <Button className={styles.next} variant="outlined"  onClick={() => onHandlerNext()}>вперед</Button>}
        <Box className={`${styles.sound} ${sound ? styles.volumeSound : styles.muteSound}`} onClick={() => setSound((sound:any) => !sound)}></Box>
      </Box>
    </>
  );
};

export default Game;
