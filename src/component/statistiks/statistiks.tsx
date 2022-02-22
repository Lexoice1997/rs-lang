import styles from "./statistics.module.scss";
import { Check, CheckCircle, DoneAll } from "@material-ui/icons";
import { useEffect, useState } from "react";
import api, { getUserId } from "../../api/api";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const StatistiksPage = () => {
  const [data, setData] = useState<any>();
  const userId = getUserId();
  console.log(data)
  const {newWords} = useTypedSelector(state => state.sprintGame);

  async function getStatistics() {
     try{
      const response = await api.get(`/users/${userId}/statistics`)
      .catch((err)=>{})
      //@ts-ignore
      setData(response.data)
    }catch(err){
      console.log(err)
     }
   
  }

  useEffect(() => {
    getStatistics()
  }, [])

  return (
    <div className={styles.statisticsPage}>
      <h1>Статистика за сегодня</h1>

      <div className={styles.statisticsToday}>
        <h3><b>{data ? data?.learnedWords : 0}</b>слов изучено</h3>
      </div>

      <div className={styles.gameStatistics}>
        <div className={styles.gameCard}>
          <h3>Спринт</h3>
          <h4><Check/>Новых слов {data ? data.optional?.sprintGame?.numberOfNewWords: 0} слов.</h4>
          <h4><CheckCircle/>Правильных ответов: {data ? data.optional?.sprintGame?.percentCorrectAnswers: 0}%.</h4>
          <h4><DoneAll/>Самая длинная серия правильных ответов: { data?  data.optional?.sprintGame?.longestWinStrike : 0}.</h4>
        </div>

        <div className={styles.gameCard}>
          <h3>Аудиовызов</h3>
          <h4><Check/>Новых слов { data ? data.optional?.audioCall?.numberOfNewWords : 0} слов.</h4>
          <h4><CheckCircle/>Правильных ответов: {data? data.optional?.audioCall?.percentCorrectAnswers :0}%.</h4>
          <h4><DoneAll/>Самая длинная серия правильных ответов: { data ?  data.optional?.audioCall?.longestWinStrike : 0}.</h4>
        </div>
      </div>
    </div>
  )
};

export default  StatistiksPage;















//
//
//
// const statistics = {
//   learnedWords: 120,
//
//   optional: {
//     sprintGame: {
//       percentCorrectAnswers: 20,
//       numberOfNewWords: 10,
//       longestWinStrike: 10,
//     },
//
//     audioCallGame: {
//       percentCorrectAnswers: 20,
//       numberOfNewWords: 10,
//       longestWinStrike: 10,
//     },
//
//     newWords: {
//       mother: true,
//       father: true,
//       brother: true
//     },
//
//     playedWords: {
//       mother: {correct: 1, incorrect: 2},
//       father: {correct: 2, incorrect: 0},
//       brother: {correct: 0, incorrect: 1}
//     }
//   }
// }
//
//
// // после окончание игры
//
// const correctWords = [...]       // отгаданные слова
// const incorrectWords = [...]     // не отгаданные слова
//
// const statisticsData = api.get(`/users/{id}/statistics`); // берем сам объект с бекенда
//
//
// correctWords.forEach(word => {
//   if (statisticsData.optional.playedWords.hasOwnProperty(word)) { // если уже существует слова то прибавляем +1
//     const word = statisticsData.optional.playedWords.word;
//     word.correct = word.correct + 1
//   } else {
//     statisticsData.optional.playedWords.word = 1 //если не существует то создаем и даём значение + 1
//   }
// })
//
// //тут также как и правильные слова
// incorrectWords.forEach(word => {
//   if (statisticsData.optional.playedWords.hasOwnProperty(word)) {
//     const word = statisticsData.optional.playedWords.word;
//     word.correct = word.correct + 1
//   } else {
//     statisticsData.optional.playedWords.word = 1
//   }
// })
//
//
// // это массив новые слова
// const newWords = correctWords.map(word => {
//   if (!statisticsData.optional.newWords.hasOwnProperty(word)) { // если не существует это слова в объекте newWords, то туда дабавлеям слова с значением true
//     statisticsData.optional.newWords.word = true;
//
//     return word;
//   }
// })










































