
import { Button, IconButton } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import Typography from "@material-ui/core/Typography";
import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setWordsGameAC } from "../../redux/gameReducer";


const GameStatistics = ({ statistics, onFinish}:any) => {
    console.log(statistics)
    const baseUrl = 'https://rs-lang-scorpion.herokuapp.com' 
    const history = useHistory()
    const audio = useRef();

    const onAudioPlay = useCallback((audioPath) => {
        //@ts-ignore
        audio.current?.pause();
        //@ts-ignore
        audio.current = new Audio(`${baseUrl}/${audioPath}`);
        //@ts-ignore
        audio.current.play();
    }, []);

    const dispatch = useDispatch();
    const correctWords = statistics.current.words.filter((word:any) => word.correct);
    const unCorrectWords = statistics.current.words.filter((word:any) => !word.correct);
    
   const setNewGame =()=>{
    dispatch(setWordsGameAC([]))
    onFinish(false)
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