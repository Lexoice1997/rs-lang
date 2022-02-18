import api, { getUserId } from "../../api/api";
import { Button, IconButton } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import Typography from "@material-ui/core/Typography";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setWordsGameAC, setWordsUserAC } from "../../redux/gameReducer";
import { ReducerAppType } from "../../redux/store";
import styles from './audioCallStatistics.module.scss'
const GameStatistics = ({ statistics, onFinish}:any) => {
    console.log(statistics)
    const baseUrl = 'https://rs-lang-scorpion.herokuapp.com' 
    const history = useHistory()
    const audio = useRef();
    const dispatch = useDispatch();
    const isLogin = useSelector<ReducerAppType, boolean>((state)=>state.user.isLogin)
    const userId = getUserId()
    const correctWords = statistics.current.words.filter((word:any) => word.correct);
    const unCorrectWords = statistics.current.words.filter((word:any) => !word.correct);
    const longestWinStrike = statistics.current.longestWinStrike
    const percentCorrectAnswers = Math.round(correctWords.length / (correctWords.length + unCorrectWords.legth) * 100)
    const arrOfNewWords = statistics.current.words.filter((word: any)=> word.newWord).map((word:any)=>word.id??word._id)
    
    function newWords(arr:Array<string>): number{
        let newWordArr: Array<string> = []
        if(!localStorage.getItem('newWordsArr')){
            localStorage.setItem('newWordsArr', JSON.stringify(arr));
        }else if (localStorage.getItem('newWordsArr')){
            //@ts-ignore
         const arrFromLocalStorage = JSON.parse(localStorage.getItem('newWordsArr'));
         newWordArr = arr.filter((n:string) => arrFromLocalStorage.indexOf(n) === -1)
         localStorage.setItem('newWordsArr', JSON.stringify(arr));
        }
        console.log(newWordArr.length)
        return newWordArr.length
    }
    const numberOfNewWords = (statistics.current.words.filter((word: any)=> word.newWord)).length    
   async function putStatistics (){
       try{
        const dataStatistics = await api.get(`/users/${userId}/statistics`)
        await api.put(`/users/${userId}/statistics`, {"learnedWords": dataStatistics.data.learnedWords, "optional": {
            ...dataStatistics.data.optional,
            audioCall: {percentCorrectAnswers: percentCorrectAnswers, numberOfNewWords: 0, longestWinStrike: longestWinStrike},
        } })
       } catch(err){
        console.log(err)
       }
    }

    // useEffect(()=>{
    //     newWords(arrOfNewWords)
    //     putStatistics()
    // }, [])
    const onAudioPlay = useCallback((audioPath) => {
        //@ts-ignore
        audio.current?.pause();
        //@ts-ignore
        audio.current = new Audio(`${baseUrl}/${audioPath}`);
        //@ts-ignore
        audio.current.play();
    }, []);  

   const setNewGame =()=>{
     dispatch(setWordsGameAC([]))
     onFinish(false) 
   }

    return (
        <Box className={styles.container}>   
        <Box component="div" className={styles.table}>              
                <Typography component="h2" variant="h5" className={styles.subTitle}>
                    <Typography  component="span" className={styles.currentAnswer}>
                        Отвечено верно: {statistics.current.words.filter((word: any) => word.correct).length}
                    </Typography>
                </Typography>
                {statistics.current.words
                    .filter((word: any) => word.correct)
                    .map((word: any) => (
                        <Box key={(word.id??word._id)}>
                            <Word word={word} onAudioPlay={onAudioPlay} />
                        </Box>
                    ))}
                <Box className={styles.divider}/>
                <Typography className={styles.subTitle}  component="h3" variant="h5" gutterBottom>
                    <Typography component="span" className={styles.unCurrentAnswer}>
                        Отвечено не верно: {statistics.current.words.filter((word: any) => !word.correct).length}
                    </Typography>
                </Typography>
                {statistics.current.words
                    .filter((word: any) => !word.correct)
                    .map((word: any) => (
                        <Box key={(word.id??word._id)}>
                            <Word word={word} onAudioPlay={onAudioPlay} />
                        </Box>
                    ))}
            </Box>
            <Box className={styles.buttonsContainer}>
                <Button variant="outlined" className={styles.statisticsButton} onClick={setNewGame}>играть еще</Button>
                <Button variant="outlined" className={styles.statisticsButton} onClick={()=>history.push('/games')}>к списку игр</Button>
            </Box>
        </Box>
    );
};

const Word = ({ word, onAudioPlay }: any) => {
    
    return (
        <Box component="div" className={styles.word}>
            <IconButton color="default" onClick={() => onAudioPlay(word.audio)}>
                <VolumeUpIcon />
            </IconButton>
            <Box component="div">
                <Box component="span" className={styles.wordText}>
                    {word.word}
                </Box>
                <Box component="span" className={styles.wordTranslate}> - </Box>
                <Box component="span" className={styles.wordTranslate}>
                    {word.wordTranslate}
                </Box>
            </Box>
        </Box>
    );
};

export default GameStatistics;