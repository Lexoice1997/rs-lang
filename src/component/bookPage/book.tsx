import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Tooltip from '@material-ui/core/Tooltip';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Typography from "@material-ui/core/Typography";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReducerAppType } from "../../redux/store";
import { createUserWord, deleteDifficaltyWordsId, setAgregateWords, setGroupsAC, setLearnedWords, setPageAC, setWords, updateWords, WordsType } from "../../redux/wordsReducer";
import { SECTIONS_WORDS } from "../common/groopConstants";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import IconButton from '@material-ui/core/IconButton';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import styles from './boocPage.module.scss'
import { setIsLoginAC } from "../../redux/userReducer";
import AudioWordContainer from "../aydioWords/aydioWordsContainer";
import {Link, useHistory} from "react-router-dom";
import { SECTIONS_GAME } from "../common/gameConst";
import { setWordsGame, setWordsUser } from "../../redux/gameReducer";
import { Box, CardActionArea, InputLabel, MenuItem, Select } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Preloader from "../preloader/preloader";
import {SPRINT_GAME} from "../routs";
import api, { getUserId } from "../../api/api";
const BookPage = () => {

  const baseUrl = 'https://rs-lang-scorpion.herokuapp.com'
  const dispatch = useDispatch();
  const pages = [...Array(30)].map((e, i) => i + 0)
  const words = useSelector<ReducerAppType, Array<WordsType>>((state) => state.words.words)
  const page = +useSelector<ReducerAppType, number>((state) => state.words.page)
  const group = +useSelector<ReducerAppType, number>((state) => state.words.group)
  const isLogin = useSelector<ReducerAppType, boolean>((state) => state.user.isLogin)
  const audio = useRef(new Audio());
  const history = useHistory()
  const pathName = history.location.pathname
  // const learnedWords: number | undefined = (words.filter((el:any) => el.userWord?.optional.learned === true)).length ? (words.filter((el:any) => el.userWord?.optional.learned === true)).length : 0
  const isLoading = useSelector<ReducerAppType, boolean>((state) => state.words.isLoading)
  const learnedWords = (useSelector<ReducerAppType, Array<WordsType>>((state) => state.words.learnedWords)).length
  const [bg, setBg] = useState<string | undefined>('rgba(225, 140, 230, 1)')
  const userId = getUserId()

  let filter = {}

  if (isLogin && pathName === '/textBook') {
    filter = { "$and": [{ "page": page }, { "group": group }] }
  }
  if (isLogin && pathName === '/vocabulary') {
    filter = { "$or": [{ "userWord.difficulty": "hard" }] }
  }

  useEffect(() => {
    if (!isLogin && pathName === '/textBook') {
      dispatch(setWords(group, page))
    } else if (pathName === '/textBook' && isLogin) {
      dispatch(setAgregateWords(group, page, filter))
    } else if (pathName === '/vocabulary' && isLogin) {
      dispatch(setAgregateWords(group, page, filter))
    } else { dispatch(setWords(group, page)) }

  }, [group, page, isLogin])

  useEffect(() => {
    //@ts-ignore 
    const isLoginLocalStorage = JSON.parse(localStorage.getItem('user'))
    if (isLoginLocalStorage) {
      dispatch(setIsLoginAC(true))
    }
  }, [isLogin])

  async function putStatistics() {
    try {
      const dataStatistics = await api.get(`/users/${userId}/statistics`)
        .catch((err) => { })
      await api.put(`/users/${userId}/statistics`, {
        "learnedWords": learnedWords, "optional": {
          ...dataStatistics?.data?.optional
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => { 
    if (isLogin){
      filter = { "$or": [{ "userWord.optional.learned": true }] }
      dispatch(setLearnedWords(filter))
      putStatistics()
    } 
  }, [learnedWords])

  const onHandlerGroup = (e: any) => {
    let valueGroup: number = Number(localStorage.getItem('group'))
    valueGroup = +(e.target.value)
    localStorage.setItem('group', JSON.stringify(valueGroup))
    dispatch(setGroupsAC(+e.target.value))
    let bg = SECTIONS_WORDS.find((g) => {
      return g.group === (e.target.value)
    })
    setBg(bg?.backgroundBtn)
  }

  const onHandlerPage = (e: any) => {
    let valuePage: number = Number(localStorage.getItem('page'))
    valuePage = +e.target.value
    localStorage.setItem('page', JSON.stringify(valuePage))
    dispatch(setPageAC(+e.target.value))
  }


  const onHandlerNextPage = () => {
    if (page === 29) return
    let valuePage: number = Number(localStorage.getItem('page'))
    valuePage = page + 1
    localStorage.setItem('page', JSON.stringify(valuePage))
    dispatch(setPageAC(page + 1))
  }
  const onHandlerPrevPage = () => {
    if (page === 0) return
    let valuePage: number = Number(localStorage.getItem('page'))
    valuePage = page - 1
    localStorage.setItem('page', JSON.stringify(valuePage))

    dispatch(setPageAC(page - 1))
  }
  const onHandlerCreateDifficaltWord = (word: WordsType, difficult: string, optional: {}) => {
    if (word.hasOwnProperty('userWord')) {
      dispatch(updateWords(word, difficult, optional))
    } else dispatch(createUserWord(word, difficult, optional))
  }

  const onCreateLearnedWords = (word: WordsType, difficulty?: string, optional?: {}) => {
    if (word.hasOwnProperty('userWord')) {
      dispatch(updateWords(word, difficulty, optional))
    } else dispatch(createUserWord(word, difficulty, optional))
  }

  const onHandlerDeleteDifficaltWord = (word: WordsType, difficulty: string | undefined, optional: {} | undefined) => {
    dispatch(updateWords(word, difficulty, optional))
    dispatch(deleteDifficaltyWordsId(word))
  }

  const onHandlerFromDifficaltyToLearned = (word: WordsType, difficulty?: string, optional?: {}) => {
    dispatch(updateWords(word, difficulty, optional))
    setTimeout(() => {
      dispatch(deleteDifficaltyWordsId(word))
    }, 200)
    setTimeout(() => {
      dispatch(createUserWord(word, difficulty, optional))
    }, 500);
  }


  const onHandlerGame = (e: any) => {
    if (learnedWords === 20) return
    if (e.target.value === '/audioCallPage') {
      if (isLogin) {
        dispatch(setWordsUser(group, page, false))
        history.push(e.target.value)
      } else {
        dispatch(setWords(group, page))
        history.push(e.target.value)
      }
    }
  }


  return (
    <>
      {isLoading ? <Preloader /> : <div className={styles.bookPage}>
        {pathName === '/vocabulary' ? <h1>Сложные слова</h1> : <h1>Учебник</h1>}
        {pathName === '/textBook' ? <div className={styles.header}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="section-select-label">Раздел</InputLabel>
              <Select
                labelId="section-select-label"
                id="demo-simple-select"
                value={group}
                label="Group"
                onChange={onHandlerGroup}
                style={{ backgroundColor: `${bg}` }}
              >
                {SECTIONS_WORDS.map(g => <MenuItem style={{ backgroundColor: `${g.backgroundBtn}` }} key={g.group} value={g.group}>{g.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
          <>
            <Button variant="contained" onClick={onHandlerPrevPage}>prev</Button>

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="page-select-label">Страница</InputLabel>
                <Select
                  labelId="page-select-label"
                  id="demo-simple-select"
                  value={page}
                  label="Page"
                  onChange={onHandlerPage}
                >
                  {pages.map((p, i) => <MenuItem key={i} value={p}>{p + 1}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>
            <Button variant="contained" onClick={onHandlerNextPage}>next</Button>
          </>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="game-select-label">Игра</InputLabel>
              <Select
                labelId="game-select-label"
                id="demo-simple-select"
                label="Game"
                onChange={onHandlerGame}
              >
                <MenuItem  value='/audioCallPage'>Аудио вызов</MenuItem>
                <MenuItem value ='/sprint'><Link to={{
                    pathname:`${SPRINT_GAME}`,
                    state: {group: `${group}`, page: `${page}`, learned: true}
                  }}>Спринт</Link>
                  </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div> : ''}
        <Grid container>
          {!isLogin && pathName === '/vocabulary' ? <>Необходиомо авторизоваться</>
            :
            words.length === 0
              ? <Typography component="h5" variant="h5">Не найдено слов</Typography>
              : words.map((word, ind) => (

                <Grid key={ind} item xs={12} sm={6} md={4}>
                  <Card className={styles.card}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="250"
                        image={`${baseUrl}/${word.image}`}
                        alt={`${word.image}`}
                      />
                      <CardContent >
                        <Typography component="h5" variant="h5" className={styles.cardTitle}>
                          <Tooltip title={`${SECTIONS_WORDS[word.group].name}`}>
                            <BookmarkIcon className={styles.cardSubtitle} fontSize="large" style={{ color: `${SECTIONS_WORDS[word.group].backgroundBtn}` }} />
                          </Tooltip>
                          {word.word} - {word.transcription}
                          <AudioWordContainer word={word} audio={audio} />
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" className={styles.translate}>
                          {word.wordTranslate}
                        </Typography>
                        <Typography variant="subtitle1" >
                          <div dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary" className={styles.translate}>
                          {word.textMeaningTranslate}
                        </Typography>
                        <Typography variant="subtitle1">
                          <div dangerouslySetInnerHTML={{ __html: word.textExample }} />
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary" className={styles.translate}>
                          {word.textExampleTranslate}
                        </Typography>
                        <Typography component={'div'} className={styles.buttons}>
                          {
                            (isLogin && pathName === '/textBook')
                              ? <div className={styles.buttonsContainer}>
                                <Tooltip title="добавить в сложные слова">
                                  <IconButton
                                    component="span"
                                    disabled={word.userWord?.optional?.learned === true || word.userWord?.difficulty === 'hard' ? true : false}
                                    onClick={() => { onHandlerCreateDifficaltWord(word, 'hard', { count: 0 }) }}>
                                    <LocalLibraryIcon className={word.userWord?.difficulty === 'hard' ? styles.isDifficaltWord : ''} />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="добавить в изученные слова">
                                  <IconButton
                                    component="span"
                                    disabled={word.userWord?.optional?.learned === true || word.userWord?.difficulty === 'hard' ? true : false}
                                    onClick={() => { onCreateLearnedWords(word, 'easy', { learned: true, count: 1 }) }}>
                                    <ThumbUpAltIcon className={word.userWord?.optional?.learned === true ? styles.isLearnedWord : ''} />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title='ответил правильно'><SentimentSatisfiedAltIcon/></Tooltip>                               
                                <span> {word.userWord?.optional?.correct ? word.userWord?.optional.correct : 0} </span>
                                /
                                <Tooltip title='ответил неправильно'><SentimentVeryDissatisfiedIcon/></Tooltip>
                                
                                <span> {word.userWord?.optional?.uncorrect ? word.userWord?.optional.uncorrect : 0} </span>

                              </div>
                              : (isLogin && pathName === '/vocabulary')
                                ? <div>
                                  <Tooltip title="убрать из сложных слов">
                                    <IconButton
                                      component="span"
                                      onClick={() => { onHandlerDeleteDifficaltWord(word, "easy", { learned: false }) }}>
                                      <LocalLibraryIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title='в изученные слова'>
                                    <IconButton
                                      component="span"
                                      onClick={() => { onHandlerFromDifficaltyToLearned(word, "easy", { learned: true }) }}
                                    >
                                      <ThumbUpAltIcon />
                                    </IconButton>

                                  </Tooltip>
                                  <Tooltip title='ответил правильно'><SentimentSatisfiedAltIcon/></Tooltip>
                                  <span> {word.userWord?.optional?.correct ? word.userWord?.optional.correct : 0} </span>
                                  /
                                  <Tooltip title='ответил неправильно'><SentimentVeryDissatisfiedIcon/></Tooltip>
                                  <span> {word.userWord?.optional?.uncorrect ? word.userWord?.optional.uncorrect : 0} </span>
                                </div>
                                : ''
                          }
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
          }
        </Grid>
      </div>}
    </>
  );
};


export default BookPage


