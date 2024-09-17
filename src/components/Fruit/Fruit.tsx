import classNames from 'classnames';
import { useEffect, useState } from 'react';

interface FruitProps {
  id: any;
  fruit: any;
  onSlice: () => void;
  setGameOver: (value: boolean) => void;
  setStartGameSliced: (value: boolean) => void;
  position: any;
  setFruits: any;
  sliceColor: string;
}

const Fruit = ({
  id,
  fruit,
  onSlice,
  position,
  setGameOver,
  setStartGameSliced,
  setFruits,
  sliceColor,
}: FruitProps) => {
  const [sliced, setSliced] = useState(false);

  useEffect(() => {
    if (sliced) {
      setTimeout(() => {
        onSlice();
      }, 500);
    }
  }, [sliced]);

  const [splashPosition, setSplashPosition] = useState({ x: 0, y: 0 });
  const [showSplash, setShowSplash] = useState(false);

  const handleSlice = async (fruit: string, event: any) => {
    const { clientX, clientY } = event;

    if (!sliced) {
      const boomSound = new Audio('Sounds/boom.mp3');
      const splatterSound = new Audio('Sounds/splatter.mp3');
      setSplashPosition({
        x: (clientX / window.innerWidth) * 100,
        y: clientY,
      });
      setShowSplash(true);

      setTimeout(() => {
        setShowSplash(false);
      }, 500);

      setSliced(true);
      if (fruit === 'boom') {
        setGameOver(true);
        setStartGameSliced(false);
        setFruits([]);
        boomSound.play();
      } else {
        splatterSound.play();
      }
    }
  };

  return (
    <>
      {showSplash && (
        <span
          style={{ left: `${splashPosition.x}%`, top: splashPosition.y }}
          className={`absolute ${sliced ? 'block' : 'hidden'}`}
        >
          <img alt='' src={`Images/${sliceColor}.png`} />
        </span>
      )}

      <div
        className={classNames(`fruit ${sliced ? 'sliced' : ''}`)}
        style={{
          left: `${splashPosition.x !== 0 ? `${splashPosition.x}%` : position.left}`,
          bottom: position.bottom,
        }}
        onMouseOver={(e) => handleSlice(fruit, e)}
        data-id={id}
      >
        <span className='whole'>
          <img alt='' src={`Images/${fruit}.png`} />
        </span>

        <span className='left-half'>
          <img alt='' src={`Images/${fruit}-1.png`} />
        </span>
        <span className='right-half'>
          <img alt='' src={`Images/${fruit}-2.png`} />
        </span>
      </div>
    </>
  );
};

export default Fruit;
