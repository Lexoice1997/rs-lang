import styles from "./games.module.scss";
import {Link, NavLink} from "react-router-dom";
import {SPRINT_GAME} from "../routs";
import { useHistory } from "react-router-dom";
import {getRandomInt} from "../../js";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {ReducerAppType} from "../../redux/store";
import {setWordsGame, setWordsUser} from "../../redux/gameReducer";

const GamesPage = () => {
  const history = useHistory()
  const [page, setPage] = useState(0)

  useEffect(() => {
    const pageGame: number = getRandomInt(0, 29)
    setPage(pageGame)
  }, [])
  return (
    <div className={styles.games}>
      <div className={`${styles.game} ${styles.gameFirst}`}>
        <div className={`${styles.imgSprint} ${styles.img}`}></div>
        <div className={styles.head}>
          <div className={styles.name}>Спринт</div>
          <div className={styles.title}>
            Тренировка Спринт поможет тебе проверить знаешь ли ты правильный перевод.
            <br></br>Игра длится 1 минуту или пока не закончаться слова.
          </div>
          <div className={styles.level}>
            <Link to={{
                pathname:`${SPRINT_GAME}`,
                state: {group:'0', page: `${page}`, learned: false}
              }}><div className={styles.firstLvl}>1</div></Link>
            <Link to={{
                pathname:`${SPRINT_GAME}`,
                state: {group:'1', page: `${page}`, learned: false}
              }}><div className={styles.secondLvl}>2</div></Link>
            <Link to={{
                pathname:`${SPRINT_GAME}`,
                state: {group:'2', page: `${page}`, learned: false}
              }}><div className={styles.thirdLvl}>3</div></Link>
            <Link to={{
                pathname:`${SPRINT_GAME}`,
                state: {group:'3', page: `${page}`, learned: false}
              }}><div className={styles.fourthLvl}>4</div></Link>
            <Link to={{
                pathname:`${SPRINT_GAME}`,
                state: {group:'4', page: `${page}`, learned: false}
              }}><div className={styles.fifthLvl}>5</div></Link>
            <Link to={{
                pathname:`${SPRINT_GAME}`,
                state: {group:'5', page: `${page}`, learned: false}
              }}><div className={styles.sixthLvl}>6</div></Link>
          </div>
        </div>
      </div>

      <div className={`${styles.game} ${styles.gameSecond}`} onClick={()=>history.push('/audioCallPage')}>
        <div className={`${styles.imgAudio} ${styles.img}`}></div>
        <div className={styles.head}>
        <div className={styles.name}>Аудиовызов</div>
          <div className={styles.title}> Тренировка Аудиовызов улучшает восприятие речи на слух.
      </div>
      </div>
      </div>
    </div>

  )
}

export default GamesPage;
