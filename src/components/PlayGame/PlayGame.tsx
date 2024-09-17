import classNames from 'classnames';
import React from 'react';
interface PlayGameProps {
  onSlice: () => void;
  startGameSliced: boolean;
}
function PlayGame({ onSlice, startGameSliced }: PlayGameProps) {
  return (
    <div className='relative flex items-center justify-center w-[195px] h-[195px] mt-6'>
      <img className='new-game absolute' alt='' src='Images/new-game.png' />
      <div
        className={classNames(`fruit-play ${startGameSliced ? 'sliced' : ''}`)}
        onMouseOver={onSlice}
      >
        <span className={`${startGameSliced ? 'hidden' : ''}`}>
          <img className='new-game-fruit' alt='' src={`Images/watermelon.png`} />
        </span>
        <span className={`${startGameSliced ? 'left-half block' : 'hidden'}`}>
          <img alt='' src={`Images/watermelon-1.png`} />
        </span>
        <span className={`${startGameSliced ? 'right-half block' : 'hidden'}`}>
          <img alt='' src={`Images/watermelon-2.png`} />
        </span>
      </div>
    </div>
  );
}

export default PlayGame;
