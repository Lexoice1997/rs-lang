import { makeStyles } from "@material-ui/core";
import "./about.scss";
import {GitHub} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: "345px",
    maxHeight: "500px",
  },
}))

const AboutPage = () => {
  const classes = useStyles();

  return (
    <div className="team">
      <div className="team-member">
        <div className="team-member__avatar team-member__katy"></div>
        <p className="team-member__name">Одинец Екатерина</p>
        <p className="team-member__role">Developer</p>
        <p className="team_member__description">Сделала авторизацию, электронный учебник, список слов и игру аудиовызов.</p>
        <a target="_blank" rel="noreferrrer" href="https://github.com/adzinetskatsiaryna">
          <GitHub fontSize="large"/>
        </a>
      </div>

      <div className="team-member">
        <div className="team-member__avatar team-member__azamat"></div>
        <p className="team-member__name">Азамат Бердимуратов</p>
        <p className="team-member__role">Developer</p>
        <p className="team_member__description">Сделал главную страницу, игру спринт, настроил бекенд.</p>
        <a target="_blank" rel="noreferrrer" href="https://github.com/adzinetskatsiaryna">
          <GitHub fontSize="large"/>
        </a>
      </div>
    </div>
  )
}

export default AboutPage;