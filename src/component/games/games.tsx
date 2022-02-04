import "./games.scss";

const GamesPage = () => {
  return (
    <div className="games">
      <div className="game game-1">
        <div className="game__img game__img-sprint"></div>
        <div className="game__head">
        <div className="game__name">Спринт</div>
          <div className="game__title">
            Тренировка Спринт поможет тебе проверить знаешь ли ты правильный перевод.
            <br></br>Игра длится 1 минуту или пока не закончаться слова.
          </div>
        </div>
      </div>

      <div className="game game-2">
        <div className="game__img game__img-audio"></div>
        <div className="game__head">
        <div className="game__name">Аудиовызов</div>
          <div className="game__title">
            Тренировка Аудиовызов улучшает восприятие речи на слух.
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamesPage;
