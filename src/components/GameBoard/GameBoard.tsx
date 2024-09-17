import { useEffect, useState } from 'react';
import Fruit from '../Fruit/Fruit';
import PlayGame from '../PlayGame/PlayGame';

const GameBoard = () => {
  const fruitsList = ['apple', 'banana', 'boom', 'peach', 'strawberry', 'watermelon'];
  const splashs = ['colorSplash1', 'colorSplash2', 'colorSplash3'];
  const [fruits, setFruits] = useState<any>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [startGameSliced, setStartGameSliced] = useState(false);
  const gameStartSound = new Audio('/Sounds/start.mp3');

  useEffect(() => {
    if (!gameOver && startGame) {
      const intervalId = setInterval(() => {
        const sliceColor = splashs[Math.floor(Math.random() * splashs.length)];
        const randomFruit = fruitsList[Math.floor(Math.random() * fruitsList.length)];

        setFruits((prevFruits: any) => [
          ...prevFruits,
          {
            id: Date.now(),
            fruit: randomFruit,
            position: {
              left: `${Math.floor(Math.random() * 60 + 20)}%`,
              bottom: `${Math.floor(Math.random() * 50)}px`,
            },
            sliceColor: sliceColor,
          },
        ]);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [gameOver, startGame]);

  const sliceFruit = (id: any) => {
    const isCheckGameOver = fruits.some((item: any) => item.id === id && item.fruit === 'boom');
    if (!isCheckGameOver) {
      setScore((prevScore) => prevScore + 1);
      setFruits((prevFruits: any) => prevFruits.filter((fruit: any) => fruit.id !== id));
    }
  };

  const hanldeRePlay = () => {
    gameStartSound.play();
    setGameOver(false);
    setScore(0);
  };

  const handlePlay = () => {
    setStartGameSliced(true);
    setTimeout(() => {
      setStartGame(true);
    }, 300);
  };

  return (
    <div className='game-board z-10'>
      {!startGame ? (
        <div className='flex flex-col h-full justify-center items-center'>
          <div className='flex gap-8'>
            <img className='w-[200px] max-sm:w-[120px]' alt='' src='Images/fruit.png' />
            <img className='w-[200px] max-sm:w-[120px]' alt='' src='Images/ninja.png' />
          </div>

          <PlayGame startGameSliced={startGameSliced} onSlice={handlePlay} />
        </div>
      ) : (
        <>
          {gameOver ? (
            <>
              <div>
                <p className='left-0 absolute top-4 text-white text-2xl'>Score: {score}</p>
              </div>
              <div className='flex flex-col h-full justify-center items-center'>
                <img className='w-[500px] max-sm:w-[300px]' alt='' src='Images/game-over.png' />
                <PlayGame startGameSliced={startGameSliced} onSlice={hanldeRePlay} />
              </div>
            </>
          ) : (
            <>
              <div>
                <p className='left-0 absolute top-4 text-white text-2xl'>Score: {score}</p>
              </div>
              {fruits?.map(({ id, fruit, position, sliceColor }: any) => (
                <Fruit
                  key={id}
                  id={id}
                  fruit={fruit}
                  position={position}
                  sliceColor={sliceColor}
                  setGameOver={setGameOver}
                  onSlice={() => sliceFruit(id)}
                  setStartGameSliced={setStartGameSliced}
                  setFruits={setFruits}
                />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default GameBoard;
