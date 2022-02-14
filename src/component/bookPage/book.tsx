import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Typography from "@material-ui/core/Typography";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReducerAppType } from "../../redux/store";
import {createDifficaltWords, createLernedWords, deleteDifficaltyWordsId, setAgregateWords, setGroupsAC, setPageAC, setWords, updateWords, WordsType } from "../../redux/wordsReducer";
import { SECTIONS_WORDS } from "../common/groopConstants";
import styles from './boocPage.module.scss'
import { setIsLoginAC } from "../../redux/userReducer";
import AudioWordContainer from "../aydioWords/aydioWordsContainer";
import { useHistory } from "react-router-dom";
import { SECTIONS_GAME } from "../common/gameConst";
import { setWordsGame, setWordsUser } from "../../redux/gameReducer";


const BookPage = ()=>{

    const baseUrl = 'https://rs-lang-scorpion.herokuapp.com'
    const dispatch = useDispatch();
    const pages = [...Array(30)].map((e,i)=> i+0)
    const words = useSelector<ReducerAppType, Array<WordsType>>((state)=>state.words.words)
    const page = +useSelector<ReducerAppType, number>((state)=>state.words.page)
    const group = +useSelector<ReducerAppType, number>((state)=>state.words.group)
    const isLogin = useSelector<ReducerAppType, boolean>((state)=>state.user.isLogin)
    const audio = useRef(new Audio());
    const history = useHistory()
    const pathName = history.location.pathname
    
    let filter = {}

    if(isLogin && pathName ==='/textBook'){  
      filter={"$and": [{ "page": page }, {"group":group }]}  
    }
    if(isLogin && pathName ==='/vocabulary'){  
      filter={"$or":[{"userWord.difficulty":"hard"}]}  
    }
    
    useEffect(() => {
      if(!isLogin && pathName ==='/textBook'){
        dispatch(setWords(group, page))
      } else if(pathName ==='/textBook' && isLogin){
        dispatch(setAgregateWords(group, page, filter))
      } else if(pathName ==='/vocabulary' && isLogin){
        dispatch(setAgregateWords( group, page, filter)) 
      } else {dispatch(setWords(group, page))}

    }, [group, page])

    useEffect(() => {
        //@ts-ignore 
        const isLoginLocalStorage = JSON.parse(localStorage.getItem('user'))
        if(isLoginLocalStorage){
            dispatch(setIsLoginAC(true))
        }
    }, [isLogin])

   const onHandlerGroup=(e: any)=>{
       let valueGroup: number = Number(localStorage.getItem('group'))
         valueGroup = +(e.target.value)
         localStorage.setItem('group', JSON.stringify(valueGroup))  
        dispatch(setGroupsAC(e.target.value))
   }
   
   const onHandlerPage=(e: any)=>{
    let valuePage: number = Number(localStorage.getItem('page'))
    valuePage = e.target.value
    localStorage.setItem('page', JSON.stringify(valuePage))
    dispatch(setPageAC(+e.target.value))
  }

  const onHandlerNextPage = ()=>{
    if(page===29) return 
    let valuePage: number = Number(localStorage.getItem('page'))
    valuePage = page+1
    localStorage.setItem('page', JSON.stringify(valuePage))
   dispatch(setPageAC(page+1))
   
  }

  const onHandlerPrevPage = ()=>{
    if(page===0) return
    
    let valuePage: number = Number(localStorage.getItem('page'))
    valuePage = page-1
    localStorage.setItem('page', JSON.stringify(valuePage))
    dispatch(setPageAC(page-1))
    
  }
    const onHandlerCreateDifficaltWord =(word: WordsType, difficalt: string)=>{
      dispatch(createDifficaltWords(word, difficalt))
    }

  const onCreateLearnedWords = (word: any, optional: {})=>{
      dispatch(createLernedWords(word, optional))
  }

  const onHandlerDeleteDifficaltWord =(word: WordsType, difficulty: string | undefined, optional: {}| undefined)=>{
    dispatch(updateWords(word, difficulty, optional))
    dispatch(deleteDifficaltyWordsId(word))  
  }

  const onHandlerFromDifficaltyToLearned=(word: WordsType, difficulty:string, optional: {})=>{
    dispatch(createLernedWords(word, optional))
    dispatch(updateWords(word, difficulty, optional))
    dispatch(deleteDifficaltyWordsId(word))   
  }
  
  

  const onHandlerGame =(e: any)=>{
  
  if(e.target.value ==='/audioCallPage'){
    if(isLogin){
      filter={
        "$and": [
          {"$or":[
            {"userWord.optional.learned": false},
            {"userWord.difficulty":"hard"},
            {"userWord":null}
          ]},
          {"page": page }, {"group":group }
        ]
      } 
      dispatch(setWordsUser(group, page, filter))
      history.push(e.target.value)
    }else {
      dispatch(setWords(group, page))
      history.push(e.target.value)
    }
   }
   if(e.target.value ==='/sprint'){
    if(isLogin){
      filter={
        "$and": [
          {"$or":[
            {"userWord.optional.learned": false},
            {"userWord.difficulty":"hard"},
            {"userWord":null}
          ]},
          {"page": page }, {"group":group }
        ]
      } 
      dispatch(setWordsUser(group, page, filter))
      history.push(e.target.value)
    }else {
      dispatch(setWords(group, page))
      history.push(e.target.value)
    }
   }

  }
    return (
        <div>
            {pathName==='/vocabulary' ? <h2>Сложные слова</h2> : <h2>Учебник</h2>}
            <div>
                 <select value={group} onChange={onHandlerGroup}>{SECTIONS_WORDS.map(g=>{
                     return <option key={g.group} value={g.group}>{g.name}</option>})}</select>
                 <>
                 <button  onClick={onHandlerPrevPage }>prev</button> 
                 <select value = {page} onChange={onHandlerPage}>{pages.map((p, i)=>{return <option  key={i} value={p}>{p+1}</option>})}</select> 
                 <button onClick={onHandlerNextPage}>next</button>
                 </>
                <select onChange={onHandlerGame}>{SECTIONS_GAME.map((g, i)=>{return <option key={g.name} value={g.url}>{g.name}</option>})}</select>
             </div>
        <Grid container>
          {!isLogin && pathName==='/vocabulary' ? <>Необходиомо авторизоваться</> 
          : 
            words.length === 0
              ? <Typography component="h5" variant="h5">Не найдено слов</Typography>
              : words.map(word => (
                <Grid key={word._id} item xs={12} sm={12} md={12}>
                  <Card  variant="outlined">
                    <CardMedia
                      className={styles.cardPicture}
                      image={`${baseUrl}/${word.image}`}
                    />
  
                    <div>
                      <CardContent >
                        <Typography component="h5" variant="h5" className={styles.cardTitle}>
                          <Tooltip title={`${SECTIONS_WORDS[word.group].name}`}>
                            <BookmarkIcon className={styles.cardSubtitle} fontSize="large" style={{ color: `${SECTIONS_WORDS[word.group].backgroundBtn}`}} />
                          </Tooltip>
                          {word.word} - {word.transcription}
                          <AudioWordContainer  word={word} audio={audio} />
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {word.wordTranslate}
                        </Typography>
                        <Typography variant="subtitle1" >
                          <div dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
                        </Typography>
                        <Typography variant="subtitle1" >
                          { word.textMeaningTranslate}
                        </Typography>
                        <Typography variant="subtitle1">
                          <div dangerouslySetInnerHTML={{ __html: word.textExample }} />
                        </Typography>
                        <Typography variant="subtitle1" >
                          {word.textExampleTranslate}
                        </Typography>
                      </CardContent>
                    </div> 
                    {
                    (isLogin && pathName ==='/textBook')
                    ? <><button className={word.userWord?.difficulty==='hard' ? styles.isDifficaltWord : '' } disabled={word.userWord?.optional?.learned === true || word.userWord?.difficulty==='hard' ? true : false} onClick={()=>{onHandlerCreateDifficaltWord(word, 'hard')}}>сложные слова</button>
                        <button className={word.userWord?.optional?.learned === true ? styles.isLearnedWord : ''} disabled={word.userWord?.optional?.learned === true || word.userWord?.difficulty==='hard' ? true : false} onClick={()=>{onCreateLearnedWords(word, {learned: true})}}>изученные слова</button>
                        <span>отгадано {0}</span>
                        <span>неотгадано {0}</span>
                      </> 
                    : (isLogin && pathName ==='/vocabulary' ) 
                    ? <><button onClick={()=>{onHandlerDeleteDifficaltWord(word, "easy", {learned: false})}}>убрать из сложных слов</button>
                        <button onClick={()=>{onHandlerFromDifficaltyToLearned(word, "easy", {learned: true})}}>в изученные слова</button>
                        <span>отгадано {0}</span>
                        <span>неотгадано {0}</span>
                      </>
                      
                    : ''
                    }
                  </Card>
                </Grid>
              ))
          }
       </Grid>
      </div>
    );
   
};


export default BookPage


