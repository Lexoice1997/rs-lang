import { Box } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory} from "react-router-dom";
import { setWordsGame, setWordsGameAC } from "../../redux/gameReducer";
import { ReducerAppType } from "../../redux/store";
import { WordsType } from "../../redux/wordsReducer";
import { SECTIONS_WORDS } from "../common/groopConstants";
import Game from "./game";
import AudioColl from "./game";
import GameStatistics from "./gameStatistics";
export type StatistiksType = {
    words: Array<WordsType> 
    counter: number 
}

const AudioCallPage = () => {
    const [finished, setFinished] = useState(false);
    const history = useHistory();
    const statistics = useRef({ words: [], counter: 0});
    const dispatch = useDispatch();
    const [group, setGroup] = useState(0)
    const words = useSelector<ReducerAppType, Array<WordsType>>((state)=>state.game.wordsList)
    
    const onStartHandler = (group:number, page:number)=>{
        dispatch(setWordsGame(group, page))
    }

    console.log(words)
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
            <button onClick={()=>{onStartHandler(group, Math.round(Math.random() * 30))}}>Начать игру</button>
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