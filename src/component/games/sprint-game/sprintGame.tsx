import React from 'react';
import './sprintGame.scss';
import {Close, Fullscreen, VolumeOff} from "@material-ui/icons";

const SprintGame = () => {
  return (
    <div className="sprint-game">
      <div className="sprint-game__header">
        <VolumeOff />
        <Fullscreen />
      </div>
      <Close className="sprint-close-btn"/>
    </div>
  );
};

export default SprintGame;
