import { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import { ReducerAppType } from "../../redux/store";
import { ActionType, setWordPlayingAC, WordsType } from "../../redux/wordsReducer";
import AdioWord from "./audioWord";

type PropsType = {
    wordPlaying: string | null
    setWordPlayingAC: (wordId: string | null)=>void
    audio: any
    word: WordsType 
}


function AudioWordContainer({ wordPlaying, setWordPlayingAC, audio, word }: PropsType) {
    const audioCurrent = audio.current;
  
    useEffect(() => {
      return () => {
        audioCurrent.pause();
        setWordPlayingAC(null);
      }
      
    }, []);
  
    return <AdioWord wordPlaying={wordPlaying} setWordPlaying={setWordPlayingAC}  audio={audioCurrent} word={word} />;
  }
  
  const mapStateToProps = (state: ReducerAppType) => {
    return {
      wordPlaying: state.words.wordPlaying,
    }
  }
  
  const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => {
    return {
      setWordPlayingAC: (wordId: string | null) => dispatch(setWordPlayingAC(wordId)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AudioWordContainer);