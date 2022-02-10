import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import styles from '../bookPage/boocPage.module.scss'

import { WordsType } from '../../redux/wordsReducer';

type PropsType={
    wordPlaying: string | null
    word: WordsType
    audio : any
    setWordPlaying : (wordId: string | null)=>void
}

function AdioWord ({wordPlaying, word, audio, setWordPlaying }: PropsType) {
    const baseUrl = 'https://rs-lang-scorpion.herokuapp.com';
    
    const playAudio = (audio: any, word: WordsType) => {
      const id = word._id ?? word.id 
      setWordPlaying(id as string) ;
      const audioList = [
        `${baseUrl}/${word.audio}`,
        `${baseUrl}/${word.audioMeaning}`,
        `${baseUrl}/${word.audioExample}`
      ];
  
      audio.src = audioList[0];
      audio.play();
  
      let index = 1;
      audio.onended = function () {
        if (index < audioList.length) {
          audio.src = audioList[index];
          audio.play();
          index++;
        } else {
          setWordPlaying(null);
        }
      }
    }
  
    const pauseAudio = (audio: any) => {
      audio.pause();
      setWordPlaying(null);
    }
  
    if (wordPlaying !== word._id ?? word.id) {
      return <PlayCircleOutlineIcon className={styles.audioIcon} color="action" fontSize="large" onClick={() => playAudio(audio, word)} />;
    } return <PauseCircleOutlineIcon className={styles.audioIcon} color="action" fontSize="large"  onClick={() => pauseAudio(audio)} />;
  }
  
  export default AdioWord;