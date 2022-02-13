import styles from "./games.module.scss";
import {Link, NavLink} from "react-router-dom";
import {SPRINT_GAME} from "../routs";

const GamesPage = () => {
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
                state: {title:'0'}  
              }}><div className={styles.firstLvl}>1</div></Link>
            <Link to={{
                pathname:`${SPRINT_GAME}`,
                state: {title:'1'}  
              }}><div className={styles.secondLvl}>2</div></Link>
            <Link to={{
                pathname:`${SPRINT_GAME}`,
                state: {title:'2'}  
              }}><div className={styles.thirdLvl}>3</div></Link>
            <Link to={{
                pathname:`${SPRINT_GAME}`,
                state: {title:'3'}  
              }}><div className={styles.fourthLvl}>4</div></Link>
            <Link to={{
                pathname:`${SPRINT_GAME}`,
                state: {title:'4'}  
              }}><div className={styles.fifthLvl}>5</div></Link>
            <Link to={{
                pathname:`${SPRINT_GAME}`,
                state: {title:'5'}  
              }}><div className={styles.sixthLvl}>6</div></Link>
          </div>
        </div>
      </div>
     

      <div className={`${styles.game} ${styles.gameSecond}`}>
        <div className={`${styles.imgAudio} ${styles.img}`}></div>
        <div className={styles.head}>
        <div className={styles.name}>Аудиовызов</div>
          <div className={styles.title}>
            Тренировка Аудиовызов улучшает восприятие речи на слух.
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamesPage;
