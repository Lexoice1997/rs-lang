import { FindReplace, MenuBook, VolumeUp } from '@material-ui/icons';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import styles from './sprintGame.module.scss';
import { NavLink } from 'react-router-dom';
import { GAMES_PAGE, SPRINT_GAME, TEXTBOOK_PAGE } from '../../routs';
import { Extension } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: '80px',
    color: 'white'
  }
}))

const SprintResult = () => {
   const classes = useStyles();
  const {correctAnswer, incorrectAnswer, totalScore} = useTypedSelector(state => state.sprintGame);

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
            {correctAnswer.map((word) => (
              <div className={styles.answers}>
                <VolumeUp color="inherit"/>
                <h6>{word.origin} - {word.translate}</h6>
              </div>
            ))}
          </div>
          <div>
            <h5>Я не знаю <span className={styles.incorrect}>{incorrectAnswer.length}</span></h5>
            {incorrectAnswer.map((word) => (
              <div className={styles.answers}>
              <VolumeUp color="secondary"/>
              <h6>{word.origin} - {word.translate}</h6>
            </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.navbar}>
        <NavLink to={SPRINT_GAME}><FindReplace className={classes.button}/></NavLink>
        <NavLink to={TEXTBOOK_PAGE}><MenuBook className={classes.button}/></NavLink>
        <NavLink to={GAMES_PAGE}><Extension className={classes.button}/></NavLink>
      </div>
    </div>
  )
}

export default SprintResult;
