import { MenuBook, VolumeUp} from '@material-ui/icons';
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import styles from './sprintGame.module.scss';
import {NavLink} from 'react-router-dom';
import {GAMES_PAGE,  TEXTBOOK_PAGE} from '../../routs';
import {Extension} from '@material-ui/icons';
import {makeStyles} from '@material-ui/styles';
import api, {getUserId} from "../../../api/api";
import React, {FC, useEffect, useState} from "react";
import {
  createUserWord,
  deleteDifficaltyWordsId,
  updateWords,
  WordsType
} from "../../../redux/wordsReducer";
import {useDispatch, useSelector} from "react-redux";
import {ReducerAppType} from "../../../redux/store";

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: '80px',
    color: 'white'
  }
}))

interface Group {
  newWords: number
}

const SprintResult: FC<Group> = ({newWords}) => {
  const classes = useStyles();
  const {correctAnswer, incorrectAnswer, totalScore, longestWinStrike} = useTypedSelector(state => state.sprintGame);
  const userId = getUserId();
  const dispatch = useDispatch()

  const isLogin = useSelector<ReducerAppType, boolean>((state) => state.user.isLogin);
  const baseUrl = 'https://rs-lang-scorpion.herokuapp.com';

  const getAudioCorrectWord = (index: number) => {
    const currentAudio = new Audio(`${baseUrl}/${correctAnswer[index].audio}`);
    currentAudio.play()
  }

  const getAudioIncorrectWord = (index: number) => {
    const currentAudio = new Audio(`${baseUrl}/${incorrectAnswer[index].audio}`);
    currentAudio.play()
  }

  async function putStatistics() {
    try {
      const dataStatistics = await api.get(`/users/${userId}/statistics`).then(response => response.data).catch((e) => console.log(e));
      await api.put(`/users/${userId}/statistics`, {
        "learnedWords": dataStatistics.learnedWords,
        "optional":
          {
            ...dataStatistics.optional,
            sprintGame:
              {
                percentCorrectAnswers: Math.round(correctAnswer.length / (correctAnswer.length + incorrectAnswer.length) * 100),
                numberOfNewWords: newWords,
                longestWinStrike: longestWinStrike,
              }
          }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    putStatistics()
  }, [])

  useEffect(() => {
    if (isLogin && correctAnswer.length > 0) {
      correctAnswer.forEach((word: any) => {
        const currentWord = word.word;
        let count = currentWord.userWord?.optional.count ? currentWord.userWord?.optional.count : 0;
        let correctCount = currentWord.userWord?.optional.correct ? currentWord.userWord?.optional.correct : 0;
        let uncorrectCount = currentWord.userWord?.optional.uncorrect ? currentWord.userWord?.optional.uncorrect : 0;

        if (currentWord.hasOwnProperty('userWord')) {
          console.log(1)
          //@ts-ignore
          const dif = currentWord.userWord.difficulty;
          count = count + 1;
          correctCount = correctCount + 1;

          if (currentWord.userWord?.optional.count === 2 && currentWord.userWord.difficulty !== 'hard') {
            dispatch(updateWords(currentWord, dif, {learned: true, count: count, correctCount: correctCount, uncorrect: uncorrectCount}))
          } else if (currentWord.userWord?.optional.count === 4 && currentWord.userWord.difficulty === 'hard') {
            dispatch(updateWords(currentWord, "easy", {learned: true, count: count, correctCount: correctCount, uncorrect: uncorrectCount}))
            setTimeout(() => {
              dispatch(deleteDifficaltyWordsId(currentWord))
            }, 0)
            setTimeout(() => {
              dispatch(createUserWord(currentWord, 'easy', {
                learned: true,
                count: count,
                correct: correctCount,
                uncorrect: uncorrectCount
              }))
            }, 500);
          } else {
            dispatch(updateWords(currentWord, dif, {learned: false, count: count, correctCount: correctCount, uncorrect: uncorrectCount}))
          }
        } else {
          count = count + 1;
          correctCount = correctCount +1;
          dispatch(createUserWord(currentWord, 'easy', {learned: true, count: count, correct: correctCount, uncorrect: uncorrectCount}))
        }
      })
    }

    if (isLogin && incorrectAnswer.length > 0) {
      incorrectAnswer.forEach((word: any) => {
        const currentWord = word.word;
        let count = currentWord.userWord?.optional.count ? currentWord.userWord?.optional.count : 0;
        let correctCount = currentWord.userWord?.optional.correct ? currentWord.userWord?.optional.correct : 0;
        let uncorrectCount = currentWord.userWord?.optional.uncorrect ? currentWord.userWord?.optional.uncorrect : 0;

        if (currentWord.hasOwnProperty('userWord')) {
          console.log(2)
          //@ts-ignore
          const dif = currentWord.userWord.difficulty;
          count = 0;
          uncorrectCount = uncorrectCount + 1;
          dispatch(updateWords(currentWord, dif, {learned: false, count: count, correctCount: correctCount, uncorrect: uncorrectCount}))
        } else {
          count = 0;
          uncorrectCount = uncorrectCount + 1;
          dispatch(createUserWord(currentWord, 'easy', {learned: false, count: count, correct: correctCount, uncorrect: uncorrectCount}))
        }
      })
    }
  }, [correctAnswer.length, incorrectAnswer.length])

  return (
    <div className={styles.root}>
      <div className={`${styles.sprintResult}`}>
        <div className={styles.resultHead}>
          <h3>Результаты</h3>
          <p>Вы набрали {totalScore} очков</p>
        </div>

        <div className={styles.resultBody}>
          <div>
            <h5>Я знаю <span className={styles.correct}>{correctAnswer.length}</span></h5>
            {correctAnswer.map((word, index) => (
              <div className={styles.answers}>
                <div></div>
                <VolumeUp className={styles.volumeUp} color="inherit" onClick={() => (getAudioCorrectWord(index))}/>
                <h6>{word.origin} - {word.translate}</h6>
              </div>
            ))}
          </div>
          <div>
            <h5>Я не знаю <span className={styles.incorrect}>{incorrectAnswer.length}</span></h5>
            {incorrectAnswer.map((word, index) => (
              <div className={styles.answers}>
                <VolumeUp className={styles.volumeUp} color="secondary" onClick={() => (getAudioIncorrectWord(index))}/>
                <h6>{word.origin} - {word.translate}</h6>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.navbar}>
        <NavLink to={TEXTBOOK_PAGE}><MenuBook className={classes.button}/></NavLink>
        <NavLink to={GAMES_PAGE}><Extension className={classes.button}/></NavLink>
      </div>
    </div>
  )
}

export default SprintResult;

