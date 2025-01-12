// import React, { useState, useEffect, useCallback } from 'react';
// import { ArrowUp, ArrowRight, ArrowDown, ArrowLeft, Play } from 'lucide-react';

// type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';

// function App() {
//   const [sequence, setSequence] = useState<Direction[]>([]);
//   const [playerSequence, setPlayerSequence] = useState<Direction[]>([]);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isShowingSequence, setIsShowingSequence] = useState(false);
//   const [gameOver, setGameOver] = useState(false);
//   const [activeButton, setActiveButton] = useState<Direction | null>(null);

//   const buttons: { direction: Direction; color: string; icon: React.ReactNode }[] = [
//     { direction: 'UP', color: 'bg-green-500', icon: <ArrowUp className="w-8 h-8" /> },
//     { direction: 'RIGHT', color: 'bg-red-500', icon: <ArrowRight className="w-8 h-8" /> },
//     { direction: 'DOWN', color: 'bg-yellow-500', icon: <ArrowDown className="w-8 h-8" /> },
//     { direction: 'LEFT', color: 'bg-blue-500', icon: <ArrowLeft className="w-8 h-8" /> },
//   ];

//   const generateNextSequence = useCallback(() => {
//     const directions: Direction[] = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
//     const nextDirection = directions[Math.floor(Math.random() * directions.length)];
//     setSequence(prev => [...prev, nextDirection]);
//   }, []);

//   const showSequence = useCallback(async () => {
//     setIsShowingSequence(true);
//     for (let i = 0; i < sequence.length; i++) {
//       await new Promise(resolve => setTimeout(resolve, 500));
//       setActiveButton(sequence[i]);
//       await new Promise(resolve => setTimeout(resolve, 500));
//       setActiveButton(null);
//     }
//     setIsShowingSequence(false);
//   }, [sequence]);

//   const startGame = () => {
//     setSequence([]);
//     setPlayerSequence([]);
//     setGameOver(false);
//     setIsPlaying(true);
//     generateNextSequence();
//   };

//   const handleButtonClick = (direction: Direction) => {
//     if (isShowingSequence || !isPlaying || gameOver) return;

//     const newPlayerSequence = [...playerSequence, direction];
//     setPlayerSequence(newPlayerSequence);

//     // Check if the player's sequence matches the game sequence
//     if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
//       setGameOver(true);
//       setIsPlaying(false);
//       return;
//     }

//     // If player completed the sequence correctly
//     if (newPlayerSequence.length === sequence.length) {
//       setPlayerSequence([]);
//       setTimeout(() => {
//         generateNextSequence();
//       }, 1000);
//     }
//   };

//   useEffect(() => {
//     if (sequence.length > 0 && isPlaying) {
//       showSequence();
//     }
//   }, [sequence, isPlaying, showSequence]);

//   return (
//     <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold mb-8 text-white">Simon Says</h1>
        
//         <div className="relative w-64 h-64 mb-8">
//           {buttons.map(({ direction, color, icon }) => {
//             const isActive = activeButton === direction;
//             const basePosition = "absolute w-24 h-24 flex items-center justify-center transition-all duration-200";
//             const positions = {
//               'UP': 'top-0 left-1/2 -translate-x-1/2',
//               'RIGHT': 'right-0 top-1/2 -translate-y-1/2',
//               'DOWN': 'bottom-0 left-1/2 -translate-x-1/2',
//               'LEFT': 'left-0 top-1/2 -translate-y-1/2'
//             };
            
//             return (
//               <button
//                 key={direction}
//                 onClick={() => handleButtonClick(direction)}
//                 disabled={isShowingSequence || !isPlaying || gameOver}
//                 className={`
//                   ${basePosition}
//                   ${positions[direction]}
//                   ${color}
//                   ${isActive ? 'opacity-100 scale-110' : 'opacity-75 hover:opacity-100'}
//                   rounded-lg shadow-lg transform transition-all
//                   disabled:cursor-not-allowed
//                 `}
//               >
//                 {icon}
//               </button>
//             );
//           })}
//         </div>

//         <div className="mb-8">
//           <p className="text-2xl font-semibold text-white mb-2">
//             Level: {sequence.length}
//           </p>
//           {gameOver && (
//             <p className="text-xl text-red-500 font-bold">
//               Game Over! Final Score: {sequence.length - 1}
//             </p>
//           )}
//         </div>

//         {(!isPlaying || gameOver) && (
//           <button
//             onClick={startGame}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center mx-auto gap-2 transition-colors"
//           >
//             <Play className="w-5 h-5" />
//             {gameOver ? 'Play Again' : 'Start Game'}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;




// WORKING


// import React, { useState, useEffect, useCallback } from 'react';
// import { ArrowUp, ArrowRight, ArrowDown, ArrowLeft, Play } from 'lucide-react';

// type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';

// function App() {
//   const [sequence, setSequence] = useState<Direction[]>([]);
//   const [playerSequence, setPlayerSequence] = useState<Direction[]>([]);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isShowingSequence, setIsShowingSequence] = useState(false);
//   const [gameOver, setGameOver] = useState(false);
//   const [activeButton, setActiveButton] = useState<Direction | null>(null);
//   const [level, setLevel] = useState<number | null>(null); // Null until the game starts
//   const [score, setScore] = useState<number | null>(null); // Null until the game starts

//   const buttons: { direction: Direction; color: string; icon: React.ReactNode }[] = [
//     { direction: 'UP', color: 'bg-green-500', icon: <ArrowUp className="w-8 h-8" /> },
//     { direction: 'RIGHT', color: 'bg-red-500', icon: <ArrowRight className="w-8 h-8" /> },
//     { direction: 'DOWN', color: 'bg-yellow-500', icon: <ArrowDown className="w-8 h-8" /> },
//     { direction: 'LEFT', color: 'bg-blue-500', icon: <ArrowLeft className="w-8 h-8" /> },
//   ];

//   const handleKeyDown = useCallback((event: KeyboardEvent) => {
//     if (isShowingSequence || gameOver || !isPlaying) return; // Ignore input during sequence display, game over, or if not playing

//     let selectedDirection: Direction | null = null;

//     switch (event.key) {
//       case 'ArrowUp':
//         selectedDirection = 'UP';
//         break;
//       case 'ArrowRight':
//         selectedDirection = 'RIGHT';
//         break;
//       case 'ArrowDown':
//         selectedDirection = 'DOWN';
//         break;
//       case 'ArrowLeft':
//         selectedDirection = 'LEFT';
//         break;
//       default:
//         break;
//     }

//     if (selectedDirection) {
//       setPlayerSequence((prev) => [...prev, selectedDirection]);
//       setActiveButton(selectedDirection);

//       // Reset the active button after a short delay to mimic button press effect
//       setTimeout(() => setActiveButton(null), 300);
//     }
//   }, [isShowingSequence, gameOver, isPlaying]);

//   useEffect(() => {
//     window.addEventListener('keydown', handleKeyDown);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [handleKeyDown]);

//   const handleButtonClick = (direction: Direction) => {
//     if (!isShowingSequence && !gameOver && isPlaying) {
//       setPlayerSequence((prev) => [...prev, direction]);
//     }
//   };

//   const startGame = () => {
//     setIsPlaying(true);
//     setGameOver(false);
//     setPlayerSequence([]);
//     const initialSequence = [getRandomDirection()];
//     setSequence(initialSequence);
//     setLevel(1);
//     setScore(0);
//     playSequence(initialSequence);
//   };

//   const getRandomDirection = (): Direction => {
//     const directions: Direction[] = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
//     return directions[Math.floor(Math.random() * directions.length)];
//   };

//   const playSequence = (sequenceToPlay: Direction[]) => {
//     setIsShowingSequence(true);
//     let i = 0;
//     const interval = setInterval(() => {
//       setActiveButton(sequenceToPlay[i]);
//       setTimeout(() => setActiveButton(null), 500);
//       i++;
//       if (i >= sequenceToPlay.length) {
//         clearInterval(interval);
//         setIsShowingSequence(false);
//       }
//     }, 1000);
//   };

//   useEffect(() => {
//     if (playerSequence.length === sequence.length && sequence.length > 0) {
//       if (JSON.stringify(playerSequence) === JSON.stringify(sequence)) {
//         // Player got the sequence correct
//         setScore((prev) => (prev !== null ? prev + sequence.length * 10 : 0));
//         setLevel((prev) => (prev !== null ? prev + 1 : 1));
//         const newSequence = [...sequence, getRandomDirection()];
//         setSequence(newSequence);
//         setPlayerSequence([]);
//         playSequence(newSequence);
//       } else {
//         // Player failed
//         setGameOver(true);
//         setIsPlaying(false);
//       }
//     }
//   }, [playerSequence, sequence]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
//       <h1 className="text-4xl font-bold mb-8">Simon Says</h1>
//       {level !== null && score !== null && (
//         <div className="text-lg mb-4">Level: {level} | Score: {score}</div>
//       )}
//       <div className="grid grid-cols-3 gap-4">
//         {buttons.map((button) => (
//           <div
//             key={button.direction}
//             onClick={() => handleButtonClick(button.direction)}
//             className={`w-24 h-24 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ${
//               activeButton === button.direction ? button.color : 'bg-gray-700'
//             }`}
//           >
//             {button.icon}
//           </div>
//         ))}
//       </div>
//       {gameOver && (
//         <p className="text-red-500 mt-4">
//           Game Over! Final Score: {score}. Press Play to try again.
//         </p>
//       )}
//       <button
//         onClick={startGame}
//         className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         <Play className="inline-block mr-2" /> Play
//       </button>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp, ArrowRight, ArrowDown, ArrowLeft, Play } from 'lucide-react';

type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';

function App() {
  const [sequence, setSequence] = useState<Direction[]>([]);
  const [playerSequence, setPlayerSequence] = useState<Direction[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [activeButton, setActiveButton] = useState<Direction | null>(null);
  const [level, setLevel] = useState<number | null>(null); // Null until the game starts
  const [score, setScore] = useState<number | null>(null); // Null until the game starts

  const buttons: { direction: Direction; color: string; icon: React.ReactNode }[] = [
    { direction: 'UP', color: 'bg-green-500', icon: <ArrowUp className="w-8 h-8" /> },
    { direction: 'RIGHT', color: 'bg-red-500', icon: <ArrowRight className="w-8 h-8" /> },
    { direction: 'DOWN', color: 'bg-yellow-500', icon: <ArrowDown className="w-8 h-8" /> },
    { direction: 'LEFT', color: 'bg-blue-500', icon: <ArrowLeft className="w-8 h-8" /> },
  ];

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (isShowingSequence || gameOver || !isPlaying) return; // Ignore input during sequence display, game over, or if not playing

    let selectedDirection: Direction | null = null;

    switch (event.key) {
      case 'ArrowUp':
        selectedDirection = 'UP';
        break;
      case 'ArrowRight':
        selectedDirection = 'RIGHT';
        break;
      case 'ArrowDown':
        selectedDirection = 'DOWN';
        break;
      case 'ArrowLeft':
        selectedDirection = 'LEFT';
        break;
      default:
        break;
    }

    if (selectedDirection) {
      setPlayerSequence((prev) => [...prev, selectedDirection]);
      setActiveButton(selectedDirection);

      // Reset the active button after a short delay to mimic button press effect
      setTimeout(() => setActiveButton(null), 300);
    }
  }, [isShowingSequence, gameOver, isPlaying]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleButtonClick = (direction: Direction) => {
    if (!isShowingSequence && !gameOver && isPlaying) {
      setPlayerSequence((prev) => [...prev, direction]);
    }
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setPlayerSequence([]);
    const initialSequence = [getRandomDirection()];
    setSequence(initialSequence);
    setLevel(1);
    setScore(0);
    playSequence(initialSequence);
  };

  const getRandomDirection = (): Direction => {
    const directions: Direction[] = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
    return directions[Math.floor(Math.random() * directions.length)];
  };

  const playSequence = (sequenceToPlay: Direction[]) => {
    setIsShowingSequence(true);
    let i = 0;
    const interval = setInterval(() => {
      setActiveButton(sequenceToPlay[i]);
      setTimeout(() => setActiveButton(null), 500);
      i++;
      if (i >= sequenceToPlay.length) {
        clearInterval(interval);
        setIsShowingSequence(false);
      }
    }, 1000);
  };

  useEffect(() => {
    if (playerSequence.length === sequence.length && sequence.length > 0) {
      if (JSON.stringify(playerSequence) === JSON.stringify(sequence)) {
        // Player got the sequence correct
        setScore((prev) => (prev !== null ? prev + 1 : 1)); // Increment score by 1
        setLevel((prev) => (prev !== null ? prev + 1 : 1));
        const newSequence = [...sequence, getRandomDirection()];
        setSequence(newSequence);
        setPlayerSequence([]);
        playSequence(newSequence);
      } else {
        // Player failed
        setGameOver(true);
        setIsPlaying(false);
      }
    }
  }, [playerSequence, sequence]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Simon Says</h1>
      {level !== null && score !== null && (
        <div className="text-lg mb-4">Level: {level} | Score: {score}</div>
      )}
      <div className="relative w-64 h-64">
        <div
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ${
            activeButton === 'UP' ? 'bg-green-500' : 'bg-gray-700'
          }`}
          onClick={() => handleButtonClick('UP')}
        >
          <ArrowUp className="w-8 h-8" />
        </div>
        <div
          className={`absolute top-1/2 right-0 transform -translate-y-1/2 w-24 h-24 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ${
            activeButton === 'RIGHT' ? 'bg-red-500' : 'bg-gray-700'
          }`}
          onClick={() => handleButtonClick('RIGHT')}
        >
          <ArrowRight className="w-8 h-8" />
        </div>
        <div
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-24 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ${
            activeButton === 'DOWN' ? 'bg-yellow-500' : 'bg-gray-700'
          }`}
          onClick={() => handleButtonClick('DOWN')}
        >
          <ArrowDown className="w-8 h-8" />
        </div>
        <div
          className={`absolute top-1/2 left-0 transform -translate-y-1/2 w-24 h-24 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ${
            activeButton === 'LEFT' ? 'bg-blue-500' : 'bg-gray-700'
          }`}
          onClick={() => handleButtonClick('LEFT')}
        >
          <ArrowLeft className="w-8 h-8" />
        </div>
      </div>
      {gameOver && (
        <p className="text-red-500 mt-4">
          Game Over! Final Score: {score}. Press Play to try again.
        </p>
      )}
      <button
        onClick={startGame}
        className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <Play className="inline-block mr-2" /> Play
      </button>
    </div>
  );
}

export default App;
