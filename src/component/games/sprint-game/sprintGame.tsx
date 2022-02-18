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

const SprintGame: React.FC = () => {
  let location = useLocation();
  let [time, setTime] = useState(60);
  const [volume, setVolume] = useState(false);
  const [longestStrike, setLongestStrike] = useState(0);
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
        bird,
      } = useTypedSelector(state => state.sprintGame);

  function setQuestion() {
    const origin = getRandomInt(0, 19);
    const translate = getRandomInt(0, 19);
    const middle = getRandomInt(0, 19);

    const arr = [origin, translate, middle];
    const randomNum = getRandomInt(0, 2);
    const resultNum = arr[randomNum];

    setWord(words, origin, resultNum)
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
      setCorrectAnswer({origin: word!.originWord, translate: word!.translateWord, audio: word!.audio})
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
      setIncorrectAnswer({origin: word!.originWord, translate: word!.translateWord, audio: word!.audio})

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
      setCorrectAnswer({origin: word!.originWord, translate: word!.translateWord, audio: word!.audio})
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
      setIncorrectAnswer({origin: word!.originWord, translate: word!.translateWord, audio: word!.audio})

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

  useEffect(() => {
    fetchWords(location.state)
  }, [])

  useEffect(() => {
    if (words.length > 0) {
      let timerId = setInterval(() => setTime(time -= 1), 1000);
      setTimeout(() => (clearInterval(timerId)), 60000);
      setWinstrikeScore(bird)
      setQuestion()
    }
  }, [words])

  console.log(time)

  if (loading) {
    return 	<div className={styles.sprintGame}>
    
    </div>
  }

  if (error) {
    return <h1>{error}</h1>
  }

  if (time <= 0) {
    return (
      <div className={styles.sprintGame}>
        <SprintResult />
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
