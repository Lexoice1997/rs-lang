import React, {useEffect, useState} from 'react';
import styles from './sprintGame.module.scss';
import {Close, VolumeOff, VolumeUp} from "@material-ui/icons";
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useSprint';
import { getRandomInt } from '../../../js';
import SprintDots from './sprintDots';
import SprintResult from './sprintResult';
import {useLocation} from 'react-router-dom'
import { NavLink } from 'react-router-dom';
//@ts-ignore
import correctSound from '../../../assets/audio/correct.mp3';
//@ts-ignore
import errorSound from '../../../assets/audio/error.mp3';
import {getUserId} from "../../../api/api";

import {useSelector} from "react-redux";
import {ReducerAppType} from "../../../redux/store";
import {WordsType} from "../../../redux/wordsReducer";

const SprintGame: React.FC = () => {
  let location = useLocation <any>();
  let [time, setTime] = useState(60);
  const [newWords, setNewWords] = useState<number>(0);
  const [volume, setVolume] = useState(false);
  const [longestStrike, setLongestStrike] = useState<number>(0);
  const [indexWord, setIndexWord] = useState(0)
  const isLogin = useSelector<ReducerAppType, boolean>((state) => state.user.isLogin);

  const {
        fetchWords,
        setWord,
        setTotalScore,
        setWinstrikeScore,
        setWinStrike,
        setBird,
        setCorrectAnswer,
        setIncorrectAnswer,
        resetData,
        setLongestWinStrike,
        fetchWordsAgreggate,
      } = useActions()

  const {
        words,
        word,
        loading,
        error,
        totalScore,
        winStrikeScore,
        winStrike,
        longestWinStrike,
        bird
      } = useTypedSelector(state => state.sprintGame);

  const setLocalStorage = (word: WordsType) => {
    let localArr: Array<string> = JSON.parse(localStorage.getItem('arr') || '[]')
    if (!localArr?.find((el: string) => el === word._id)) {
      localArr.push(word._id || word.id || '')
      setNewWords(newWords + 1)
    }
    localStorage.setItem('arr', JSON.stringify(localArr))
  }

  function setQuestion() {
    const translate = getRandomInt(0, 19);

    const arr = [indexWord, translate];
    const randomNum = getRandomInt(0, 1);
    const resultNum = arr[randomNum];

    setWord(words, indexWord, resultNum)
    setIndexWord(indexWord + 1)

    setLocalStorage(words[indexWord])
  }

  function toggleVolume() {
    if (volume) {
      setVolume(false)
    } else {
      setVolume(true)
    }
  }

  function isCorrect() {
    if (word?.originWordId === word?.translateWordId) {
      volume && new Audio(correctSound).play();
      setCorrectAnswer({id: word!.originWordId, origin: word!.originWord, translate: word!.translateWord, audio: word!.audio, result: true, word: word!.word})
      setLongestStrike(longestStrike + 1)
      if (winStrike === 3) {
        setWinStrike(0)
        if (bird === 3) {
          setBird(3)
        } else {
          setBird(bird + 1)
        }
        setWinstrikeScore(bird)
      } else {
        setWinStrike(winStrike + 1);
      }
      setTotalScore(winStrikeScore);
    } else {
      volume && new Audio(errorSound).play();
      setBird(0)
      setWinstrikeScore(0)
      setWinStrike(0)
      setIncorrectAnswer({id: word!.originWordId, origin: word!.originWord, translate: word!.translateWord, audio: word!.audio, result: false, word: word!.word})

      if (longestWinStrike < longestStrike) {
        setLongestWinStrike(longestStrike)
      }
      setLongestStrike(0)
    }
    setQuestion()
  }

  function isIncorrect() {
    if (word?.originWordId !== word?.translateWordId) {
      volume && new Audio(correctSound).play();
      setCorrectAnswer({id: word!.originWordId, origin: word!.originWord, translate: word!.translateWord, audio: word!.audio, result: true, word: word!.word})
      setLongestStrike(longestStrike + 1)
      if (winStrike === 3) {
        setWinStrike(0)
        if (bird === 3) {
          setBird(3)
        } else {
          setBird(bird + 1)
        }
        setWinstrikeScore(bird)
      } else {
        setWinStrike(winStrike + 1);
      }
      setTotalScore(winStrikeScore);
    } else {
      volume && new Audio(errorSound).play();
      setBird(0)
      setWinstrikeScore(0)
      setWinStrike(0)
      setIncorrectAnswer({id: word!.originWordId, origin: word!.originWord, translate: word!.translateWord, audio: word!.audio, result: false, word: word!.word})

      if (longestWinStrike < longestStrike) {
        setLongestWinStrike(longestStrike)
      }
      setLongestStrike(0)
    }
    setQuestion();
  }

  function onKeyDown(event: any) {
    if (event.code === "ArrowLeft") {
      isIncorrect()
    }

    if (event.code === "ArrowRight") {
      isCorrect()
    }
  }
console.log(isLogin)
  useEffect(() => {
    if (isLogin) {
      fetchWordsAgreggate(location?.state.group, location.state.page, location.state.learned)
    } else {
      fetchWords(location.state.group, location.state.page)
    }
  }, [])

  useEffect(() => {
    if (words?.length > 0) {
      let timerId = setInterval(() => setTime(time -= 1), 1000);
      setTimeout(() => (clearInterval(timerId)), 60000);
      setWinstrikeScore(bird)
      setQuestion()
    }
  }, [words])
  if (loading) {
    return 	<div className={styles.sprintGame}>

    </div>
  }

  if (error) {
    return <h1>{error}</h1>
  }

  if (time <= 0 || indexWord === 19) {
    return (
      <div className={styles.sprintGame}>
        <SprintResult newWords={newWords}/>
        <NavLink to='/'><Close className={styles.sprintCloseBtn} onClick={resetData}/></NavLink>
      </div>
    )
  }

  return (
    <div className={styles.sprintGame} onKeyDown={onKeyDown} tabIndex={0}>
      <div className={styles.sprintGameHeader}>
        {volume ? <VolumeUp className={styles.sprintVolumeBtn} onClick={toggleVolume}/> : <VolumeOff className={styles.sprintVolumeBtn}  onClick={toggleVolume}/>}
      </div>
      <div className={styles.sprintGameBody}>
        <div className={styles.head}>
          <div className={styles.time}>{time}</div>
          <div className={styles.counter}>{totalScore}</div>
        </div>
        <div className={styles.body}>
          <SprintDots winStrike={winStrike} />
          <div className={styles.winstrike}>{winStrikeScore ? `+${winStrikeScore}` : ''}</div>
          <div className={styles.words}>
            <div className={styles.original}>{word?.originWord}</div>
            <div className={styles.translate}>{word?.translateWord}</div>
          </div>

          <div className={styles.buttons}>
            <button className={styles.button} onClick={isIncorrect}>Не верно</button>
            <button className={styles.button} onClick={isCorrect}>Верно</button>
          </div>
        </div>
      </div>
      <NavLink to="/"><Close className={styles.sprintCloseBtn} onClick={resetData}/></NavLink>
    </div>
  );
};

export default SprintGame;
