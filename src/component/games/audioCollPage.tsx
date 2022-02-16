import { Box } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWordsGame, setWordsGameAC, setWordsUser, setWordsUserAC } from "../../redux/gameReducer";
import { ReducerAppType } from "../../redux/store";
import { WordsType } from "../../redux/wordsReducer";
import { SECTIONS_WORDS } from "../common/groopConstants";
import Game from "./game";
import GameStatistics from "./gameStatistics";
export type StatistiksType = {
    words: Array<WordsType> 
    counter: number 
}

const AudioCallPage = () => {
    const [finished, setFinished] = useState(false);
    const statistics = useRef({ words: [], longestWinStrike: 0});
    const dispatch = useDispatch();
    const [group, setGroup] = useState<number>(0)
    const words = useSelector<ReducerAppType, Array<WordsType>>((state)=>state.game.wordsList)
    const isLogin = useSelector<ReducerAppType, boolean>((state)=>state.user.isLogin)
    const onStartHandler = (group:number, page:number)=>{
        if(!isLogin){
            dispatch(setWordsGame(group, page))   
        }else  dispatch(setWordsUser(group, page, true))
    }

   useEffect(()=>{
    return()=>{
    dispatch(setWordsGameAC([]))    
    }
   },[])
    
    return (
        <>{!finished ? <Box>
            {words.length === 0 && <><select  value={group} onChange={(e: any) => setGroup(e.target.value)}>{SECTIONS_WORDS.map(g=>{
                return <option key={g.name} value={g.group}>{g.group + 1}</option>
            })}</select>
            <button onClick={()=>{onStartHandler(group, 0)}}>Начать игру</button>
            </>}
            {words.length > 0  && !finished && (
                <Game
                    words={words}
                    statistics={statistics}
                    onFinish={setFinished}
                />    
            )}
            
        </Box>
        :<GameStatistics statistics={statistics} onFinish={setFinished} />
        }    
        </>
    );
};


export default AudioCallPage;