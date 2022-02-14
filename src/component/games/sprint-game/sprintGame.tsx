import React, {useEffect, useState} from 'react';
import styles from './sprintGame.module.scss';
import {Close, Fullscreen, VolumeOff} from "@material-ui/icons";
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useSprint';
import { getRandomInt } from '../../../js';
import SprintDots from './sprintDots';
import SprintResult from './sprintResult';
import {useLocation} from 'react-router-dom'
import { NavLink } from 'react-router-dom';

const SprintGame: React.FC = () => {
  let location = useLocation();
  let [time, setTime] = useState(60);
  const {
        fetchWords,
        setWord,
        setTotalScore,
        setWinstrikeScore,
        setWinStrike,
        setBird,
        setCorrectAnswer,
        setIncorrectAnswer,
        resetData
      } = useActions()

  const {
        words,
        word,
        loading,
        error,
        totalScore,
        winStrikeScore,
        winStrike,
        bird} = useTypedSelector(state => state.sprintGame);

  function setQuestion() {
    const origin = getRandomInt(0, 19);
    const translate = getRandomInt(0, 19);
    const middle = getRandomInt(0, 19); 

    const arr = [origin, translate, middle];
    const randomNum = getRandomInt(0, 2);
    const resultNum = arr[randomNum];

    setWord(words, origin, resultNum)
  }

  function isCorrect() {
    if (word?.originWordId === word?.translateWordId) {
      setCorrectAnswer({origin: word!.originWord, translate: word!.translateWord})
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
      setBird(0)
      setWinstrikeScore(0)
      setWinStrike(0)
      setIncorrectAnswer({origin: word!.originWord, translate: word!.translateWord})
    }
    setQuestion()
  }

  function isIncorrect() {
    if (word?.originWordId !== word?.translateWordId) {
      setCorrectAnswer({origin: word!.originWord, translate: word!.translateWord})
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
      setBird(0)
      setWinstrikeScore(0)
      setWinStrike(0)
      setIncorrectAnswer({origin: word!.originWord, translate: word!.translateWord})
    }
    setQuestion();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
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

  function goHome() {
    resetData()

  }

  if (loading) {
    return <h1>Идет загрузка...</h1>
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
        <VolumeOff className={styles.sprintVolumeBtn}/>
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
