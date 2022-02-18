import { FindReplace, MenuBook, VolumeUp } from '@material-ui/icons';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import styles from './sprintGame.module.scss';
import { NavLink } from 'react-router-dom';
import { GAMES_PAGE, SPRINT_GAME, TEXTBOOK_PAGE } from '../../routs';
import { Extension } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import api, {getUserId} from "../../../api/api";
import {useEffect, useRef} from "react";

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: '80px',
    color: 'white'
  }
}))

const SprintResult = () => {
  const classes = useStyles();
  const {correctAnswer, incorrectAnswer, totalScore, longestWinStrike} = useTypedSelector(state => state.sprintGame);
  const userId = getUserId();

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
      const dataStatistics = await api.get(`/users/${userId}/statistics`);
      api.put(`/users/${userId}/statistics`, {"learnedWords": dataStatistics.data.learnedWords, 
      "optional": 
          {...dataStatistics.data.optional,
          sprintGame: 
                    { percentCorrectAnswers: Math.round(correctAnswer.length / (correctAnswer.length + incorrectAnswer.length) * 100),
                      numberOfNewWords: 0,
                      longestWinStrike: longestWinStrike,
                    }}})
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    putStatistics()
  }, [])

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
              <VolumeUp  className={styles.volumeUp} color="secondary" onClick={() => (getAudioIncorrectWord(index))}/>
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
