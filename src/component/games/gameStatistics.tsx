import api from "../../api/api";
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



const GameStatistics = ({ statistics, onFinish}:any) => {
    console.log(statistics)
    const baseUrl = 'https://rs-lang-scorpion.herokuapp.com' 
    const history = useHistory()
    const audio = useRef();
    const dispatch = useDispatch();
    const isLogin = useSelector<ReducerAppType, boolean>((state)=>state.user.isLogin)
    const userId = useSelector<ReducerAppType, string>((state)=>state.user.user.userId)
    const correctWords = statistics.current.words.filter((word:any) => word.correct);
    const unCorrectWords = statistics.current.words.filter((word:any) => !word.correct);
    const longestWinStrike = statistics.current.longestWinStrike
    const percentCorrectAnswers = Math.round(correctWords.length / (correctWords.length + unCorrectWords.legth) * 100)
    const numberOfNewWords = (statistics.current.words.filter((word: any)=> (word.newWord && word.userWord.optional.count===1) || word.newWord && word.userWord.optional.count===0)).length
    const learnedWords = (statistics.current.words.filter((word:any)=>word.userWord.optional.learned)).length  
    console.log(userId)    
   async function putStatistics (){
       try{
        const dataStatistics = await api.get(`/users/${userId}/statistics`)
        await api.put(`/users/${userId}/statistics`, {"learnedWords": learnedWords, "optional": {
            ...dataStatistics.data.optional,
            audioCall: {percentCorrectAnswers: percentCorrectAnswers, numberOfNewWords: numberOfNewWords, longestWinStrike: longestWinStrike},
        } })
       } catch(err){
        console.log(err)
       }
    }

    useEffect(()=>{
        putStatistics()
    }, [])
    const onAudioPlay = useCallback((audioPath) => {
        //@ts-ignore
        audio.current?.pause();
        //@ts-ignore
        audio.current = new Audio(`${baseUrl}/${audioPath}`);
        //@ts-ignore
        audio.current.play();
    }, []);  

   const setNewGame =()=>{
    if(!isLogin){
     dispatch(setWordsGameAC([]))
     onFinish(false)
    }else {
     dispatch(setWordsUserAC ([]))
     onFinish(false)}   
   }

    return (
        <>   
        <Box component="div" >              
                <Typography component="h2" variant="h5">
                    <Typography  component="span">
                        Знаю: {statistics.current.words.filter((word: any) => word.correct).length}
                    </Typography>
                </Typography>
                {statistics.current.words
                    .filter((word: any) => word.correct)
                    .map((word: any) => (
                        <Box  key={(word.id??word._id)}>
                            <Word word={word} onAudioPlay={onAudioPlay} />
                        </Box>
                    ))}
                <Divider variant="middle"  />
                <Typography  component="h3" variant="h5" gutterBottom>
                    <Typography component="span" >
                        Ошибок: {statistics.current.words.filter((word: any) => !word.correct).length}
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
            <Box >
                <Button onClick={setNewGame}>играть еще</Button>
                <Button onClick={()=>history.push('/games')}>к списку игр</Button>
            </Box>
        </>
    );
};

const Word = ({ word, onAudioPlay }: any) => {
    
    return (
        <Box component="div" >
            <IconButton color="default" onClick={() => onAudioPlay(word.audio)}>
                <VolumeUpIcon />
            </IconButton>
            <Box component="div">
                <Box component="span">
                    {word.word}
                </Box>
                <Box component="span"> - </Box>
                <Box component="span">
                    {word.wordTranslate}
                </Box>
            </Box>
        </Box>
    );
};

export default GameStatistics;