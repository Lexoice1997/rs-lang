
import CardContent from "@material-ui/core/CardContent";


import styles from '../bookPage/boocPage.module.scss'

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { ReducerAppType } from "../../redux/store";
import { setDifficultWordsId, WordsType } from "../../redux/wordsReducer";
import { useEffect } from "react";

const VocabularyPage = ()=>{
  const baseUrl = 'https://rs-lang-scorpion.herokuapp.com'
  const agregateWords = useSelector<ReducerAppType, Array<any>>((state)=>state.words.agregateWords)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(setDifficultWordsId())
  },[])
  
    return (
        <div>
        <Grid container>
          {
            agregateWords.length === 0
              ? <Typography component="h5" variant="h5">Не найдено слов</Typography>
              : agregateWords.map(word => (
                <Grid key={word.id} item xs={12} sm={12} md={12}>
                  <Card  variant="outlined">
                    <CardMedia
                      className={styles.cardPicture}
                      image={`${baseUrl}/${word.image}`}
                    />
  
                   
                      <CardContent >
                        <Typography component="h5" variant="h5">
                          {/* <Tooltip title={`${SECTIONS_EBOOK[word.group].name}`}>
                            <FolderIcon  style={{ color: `${SECTIONS_EBOOK[word.group].backgroundBtn}`}} />
                          </Tooltip> */}
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
                   
                  </Card>
               </Grid>
              ))}
              </Grid>

        </div>
    )
};


export default  VocabularyPage