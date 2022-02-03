import { Button, makeStyles } from "@material-ui/core";
import "./mainPage.scss";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(5),
    backgroundColor: "#94A7AE",
  }
}))

const StartPage = () => {
  const classes = useStyles();

  return (
    <div>
      <div className="main-page">
        <section className="main-page__promo">
          <h2 className="main-page__title">Увеличь словарный запас с RSLang</h2>
          <p className="main-page__description">Традиционные и новые эффективные подходы к изучению слов, мотивация в виде статистики, различные уровни сложности - все это ты найдешь в RSLang.</p>
          <Button className={classes.button} size="large">Смотреть видео</Button>
        </section>
      </div>
    </div>
  )
};

export default StartPage
