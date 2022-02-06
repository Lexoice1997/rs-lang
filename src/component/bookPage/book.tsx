import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import FolderIcon from '@material-ui/icons/Folder';
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReducerAppType } from "../../redux/store";
import { createDifficaltWords, setGroupsAC, setPageAC, setWords, WordsType } from "../../redux/wordsReducer";
import { SECTIONS_EBOOK } from "../common/groopConstants";
import styles from './boocPage.module.scss'
import { idText } from "typescript";
import { setIsLoginAC } from "../../redux/userReducer";

const BookPage = ()=>{

    const baseUrl = 'https://rs-lang-scorpion.herokuapp.com'
    const dispatch = useDispatch();
    const pages = [...Array(30)].map((e,i)=> i+1)

    const [games, setGames] = useState([{name: 'Спринт', url: '/sprint'}, {name: 'Аудиовызов', url: '/audiocoll'}])
    const words = useSelector<ReducerAppType, Array<WordsType>>((state)=>state.words.words)
    const page = useSelector<ReducerAppType, number>((state)=>state.words.page)
    const group = useSelector<ReducerAppType, number>((state)=>state.words.group)
    const isLogin = useSelector<ReducerAppType, boolean>((state)=>state.user.isLogin)


    useEffect(() => { 
        dispatch(setWords(group, page))
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
         valueGroup = e.target.value
         localStorage.setItem('group', JSON.stringify(valueGroup))  
        dispatch(setGroupsAC(e.target.value))
   }
   
   const onHandlerPage=(e: any)=>{
    let valuePage: number = Number(localStorage.getItem('page'))
    valuePage = e.target.value
    localStorage.setItem('page', JSON.stringify(valuePage))
    dispatch(setPageAC(e.target.value))
}

    const onHandlerCreateDifficaltWord =(word: WordsType, difficalt: string)=>{
       
        dispatch(createDifficaltWords(word, difficalt))
    }
    return (
        <div>
            <h2>Учебник</h2>
            <div>
                 <select value={group} onChange={onHandlerGroup}>{SECTIONS_EBOOK.map(g=>{
                     return <option value={g.group}>{g.name}</option>})}</select>
                 <><button>назад</button> 
                 <select value = {page} onChange={onHandlerPage}>{pages.map((p, i)=>{return <option  key={i} value={p}>{p}</option>})}</select> 
                 <button>вперед</button> </>
                <select>{games.map((g, i)=>{return <option key={i} value={g.url}>{g.name}</option>})}</select>
             </div>
        <Grid container>
          {
            words.length === 0
              ? <Typography component="h5" variant="h5">Не найдено слов</Typography>
              : words.map(word => (
                <Grid key={word.id} item xs={12} sm={12} md={12}>
                  <Card  variant="outlined">
                    <CardMedia
                      className={styles.cardPicture}
                      image={`${baseUrl}/${word.image}`}
                    />
  
                    <div>
                      <CardContent >
                        <Typography component="h5" variant="h5">
                          <Tooltip title={`${SECTIONS_EBOOK[word.group].name}`}>
                            <FolderIcon  style={{ color: `${SECTIONS_EBOOK[word.group].backgroundBtn}`}} />
                          </Tooltip>
                          {word.word} - {word.transcription}
                          {/* <WordsAudio  audio={audio} word={word} /> */}
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
                    {isLogin ? <><button onClick={()=>{onHandlerCreateDifficaltWord(word, 'hard')}}>сложное слово</button>
                        <button>изученное</button>
                    
                    </> : ''}
                  </Card>
                </Grid>
              ))
            

          }
        </Grid>
      </div>
    );
   
};


export default BookPage


