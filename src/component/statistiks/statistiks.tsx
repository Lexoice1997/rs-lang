import styles from "./statistics.module.scss";
import { Check, CheckCircle, DoneAll } from "@material-ui/icons";
import { useEffect, useState } from "react";
import api, { getUserId } from "../../api/api";

const StatistiksPage = () => {
  const [data, setData] = useState<any>();
  const userId = getUserId();

  async function getStatistics() {
    const response = await api.get(`/users/${userId}/statistics`);
    setData(response.data)
  }

  useEffect(() => {
    getStatistics()
    
  }, [])
  console.log(data)

  return (
    <div className={styles.statisticsPage}>
      <h1>Статистика за сегодня</h1>

      <div className={styles.statisticsToday}>
        <h3><b>0</b>слов изучено</h3>
        <h3><b>0%</b>правильных ответов</h3>
      </div>

      <div className={styles.gameStatistics}>
        <div className={styles.gameCard}>
          <h3>Спринт</h3>
          <h4><Check/>Изучено {data && data.optional.sprintGame.numberOfNewWords} слов.</h4>
          <h4><CheckCircle/>Правильных ответов: {data && data.optional.sprintGame.percentCorrectAnswers}%.</h4>
          <h4><DoneAll/>Самая длинная серия правильных ответов: {data && data.optional.sprintGame.longestWinStrike}.</h4>
        </div>

        <div className={styles.gameCard}>
          <h3>Аудиовызов</h3>
          <h4><Check/>Изучего 0 слов.</h4>
          <h4><CheckCircle/>Правильных ответов: 0%.</h4>
          <h4><DoneAll/>Самая длинная серия правильных ответов: 0.</h4>
        </div>
      </div>
    </div>
  )
};


export default  StatistiksPage
