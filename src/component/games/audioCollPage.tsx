import { Box, Button, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWordsGame, setWordsGameAC, setWordsUser, setWordsUserAC } from "../../redux/gameReducer";
import { ReducerAppType } from "../../redux/store";
import { WordsType } from "../../redux/wordsReducer";
import { SECTIONS_WORDS } from "../common/groopConstants";
import Preloader from "../preloader/preloader";
import styles from './audioCallGame.module.scss'
import GameContainer from "./gameContainer";
import GameStatistics from "./gameStatistics";
export type StatistiksType = {
    words: Array<WordsType>
    counter: number
}

const AudioCallPage = () => {
    const [finished, setFinished] = useState(false);
    const statistics = useRef({ words: [], longestWinStrike: 0});
    const dispatch = useDispatch();
    const [group, setGroup] = useState<number>(0);
    const words = useSelector<ReducerAppType, Array<WordsType>>((state)=>state.game.wordsList);
    const isLogin = useSelector<ReducerAppType, boolean>((state)=>state.user.isLogin);
    const isLoading = useSelector<ReducerAppType, boolean>((state)=>state.game.isLoading);
    const onStartHandler = (group:number, page:number)=>{
        if(isLogin){
            dispatch(setWordsUser(group, page, true))

        }else dispatch(setWordsGame(group, page))
    }

   useEffect(()=>{
    return()=>{
    if(!isLogin){
        dispatch(setWordsGameAC([]))
    }else dispatch(setWordsUserAC([]))
    }
   },[])

    return (
        <>
        {isLoading ? <Preloader /> : <Box className={styles.audioCallWrapper}>{!finished ? <Box className={styles.audioCallContainer}>

            {words?.length === 0 && <>
                <Typography variant="h3" component="h3">Аудиовызов</Typography>
            <p className={styles.subtitle}>Вы можете воспользоваться мышькой или клавишами от 1 до 5 для выбора ответа. Используйте пробел для повтроного звучания слова
            Используйте клавишу Enter для подсказки или для перехода к следующему слову</p>
            <Box className={styles.buttonStartContainer} >
            <InputLabel className={styles.labelSelect} id="label">Cложность</InputLabel>
                <Select className={styles.groopSelect} labelId="label" id="select"
                value={group}
                onChange={(e: any) => setGroup(e.target.value)}>{SECTIONS_WORDS.map(g=>{
                return <MenuItem key={g.name} value={g.group}>{g.group + 1}</MenuItem>
            })}</Select>
            <Button variant="outlined" className={styles.startGameButton} onClick={()=>{onStartHandler(group, Math.round(Math.random() * 29))}}>Начать игру</Button></Box>
            </>}
            {words?.length > 0  && !finished &&  (
                <GameContainer
                    words={words}
                    statistics={statistics}
                    onFinish={setFinished}
                />
            )}

        </Box>
        :<GameStatistics statistics={statistics} onFinish={setFinished} />
        }
        </Box>}
        </>
    );
};


export default AudioCallPage;
