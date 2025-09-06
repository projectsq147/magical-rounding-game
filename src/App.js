import React, { useState, useEffect } from 'react';
import { Star, Trophy, Sparkles, RotateCcw, Target, Heart, Crown } from 'lucide-react';

const RoundingGame = () => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [roundTo, setRoundTo] = useState(10);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [difficulty, setDifficulty] = useState(3);
  const [feedback, setFeedback] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [options, setOptions] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const roundingTargets = [10, 100, 1000, 10000, 100000];
  
  const generateQuestion = () => {
    let num, roundToValue;
    
    if (difficulty === 1) {
      // Easy: 2-3 digit numbers, round to 10 only
      num = Math.floor(Math.random() * 900) + 10; // 10-999
      roundToValue = 10;
    } else if (difficulty === 2) {
      // Medium-Easy: 3-4 digit numbers, round to 10 or 100
      num = Math.floor(Math.random() * 9000) + 100; // 100-9999
      roundToValue = roundingTargets[Math.floor(Math.random() * 2)]; // 10 or 100
    } else if (difficulty === 3) {
      // Medium: 4-5 digit numbers, round to 100, 1000, or 10000
      num = Math.floor(Math.random() * 90000) + 1000; // 1000-99999
      roundToValue = roundingTargets[Math.floor(Math.random() * 3) + 1]; // 100, 1000, or 10000
    } else if (difficulty === 4) {
      // Hard: 5-6 digit numbers, any target
      num = Math.floor(Math.random() * 900000) + 10000; // 10000-999999
      roundToValue = roundingTargets[Math.floor(Math.random() * 4) + 1]; // 100, 1000, 10000, or 100000
    } else {
      // Expert: 6+ digit numbers, any target
      num = Math.floor(Math.random() * 9000000) + 100000; // 100000-9999999
      roundToValue = roundingTargets[Math.floor(Math.random() * 5)]; // Any target
    }
    
    setCurrentNumber(num);
    setRoundTo(roundToValue);
    
    // Generate correct answer
    const correctAnswer = Math.round(num / roundToValue) * roundToValue;
    
    // Generate wrong options more strategically
    const wrongOptions = [];
    
    // Add the number rounded to adjacent place values (common mistakes)
    if (roundToValue > 10) {
      const lowerRound = Math.round(num / (roundToValue / 10)) * (roundToValue / 10);
      if (lowerRound !== correctAnswer && wrongOptions.length < 3) {
        wrongOptions.push(lowerRound);
      }
    }
    
    if (roundToValue < 100000) {
      const higherRound = Math.round(num / (roundToValue * 10)) * (roundToValue * 10);
      if (higherRound !== correctAnswer && wrongOptions.length < 3) {
        wrongOptions.push(higherRound);
      }
    }
    
    // Add truncated version (another common mistake)
    const truncated = Math.floor(num / roundToValue) * roundToValue;
    if (truncated !== correctAnswer && !wrongOptions.includes(truncated) && wrongOptions.length < 3) {
      wrongOptions.push(truncated);
    }
    
    // Add ceiling version
    const ceiling = Math.ceil(num / roundToValue) * roundToValue;
    if (ceiling !== correctAnswer && !wrongOptions.includes(ceiling) && wrongOptions.length < 3) {
      wrongOptions.push(ceiling);
    }
    
    // Add some random nearby values if we need more options
    while (wrongOptions.length < 3) {
      const offset = (Math.random() - 0.5) * roundToValue * 4;
      const wrongAnswer = correctAnswer + Math.round(offset / roundToValue) * roundToValue;
      if (wrongAnswer !== correctAnswer && !wrongOptions.includes(wrongAnswer) && wrongAnswer >= 0) {
        wrongOptions.push(wrongAnswer);
      }
    }
    
    // Take only 3 wrong options and mix with correct answer
    const allOptions = [correctAnswer, ...wrongOptions.slice(0, 3)];
    allOptions.sort(() => Math.random() - 0.5);
    
    setOptions(allOptions);
    setShowAnswer(false);
    setSelectedAnswer(null);
    setFeedback('');
  };

  const checkAnswer = (selectedValue) => {
    const correctAnswer = Math.round(currentNumber / roundTo) * roundTo;
    setSelectedAnswer(selectedValue);
    setShowAnswer(true);
    setQuestionsAnswered(questionsAnswered + 1);
    
    if (selectedValue === correctAnswer) {
      const points = difficulty * 10 + 10; // More points for higher difficulty
      setScore(score + points);
      setStreak(streak + 1);
      
      const encouragements = [
        '✨ Absolutely magical! ✨',
        '🌸 Perfect, sweetie! 🌸', 
        '💖 You\'re a star! 💖',
        '🦄 Unicorn-level amazing! 🦄',
        '💫 Sparkling success! 💫',
        '🌺 Beautifully done! 🌺',
        '👑 Queen of rounding! 👑',
        '🎀 Fabulous work! 🎀'
      ];
      
      setFeedback(`${encouragements[Math.floor(Math.random() * encouragements.length)]} +${points} points!`);
    } else {
      setStreak(0);
      const gentle = [
        '🌸 Oops! Don\'t worry, you\'ve got this! 🌸',
        '💕 Close one! The answer is ',
        '✨ Almost there! It\'s actually ',
        '🦋 No worries! The correct answer is ',
        '🌺 Keep trying! The answer is '
      ];
      setFeedback(`${gentle[Math.floor(Math.random() * gentle.length)]}${correctAnswer.toLocaleString()}. You\'re doing great! 💪`);
    }
  };

  const nextQuestion = () => {
    generateQuestion();
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setStreak(0);
    setQuestionsAnswered(0);
    generateQuestion();
  };

  const resetGame = () => {
    setGameStarted(false);
    setScore(0);
    setStreak(0);
    setQuestionsAnswered(0);
    setFeedback('');
  };

  useEffect(() => {
    if (gameStarted) {
      generateQuestion();
    }
  }, [difficulty]);

  const getDifficultyInfo = () => {
    switch(difficulty) {
      case 1: return { 
        name: "Princess Beginner", 
        color: "bg-gradient-to-r from-pink-400 to-rose-400", 
        description: "Tiny treasures (10s only)",
        range: "10 - 999",
        icon: "🌸"
      };
      case 2: return { 
        name: "Fairy Explorer", 
        color: "bg-gradient-to-r from-purple-400 to-pink-400", 
        description: "Magic numbers (10s & 100s)",
        range: "100 - 9,999",
        icon: "🧚‍♀️"
      };
      case 3: return { 
        name: "Sparkle Sorceress", 
        color: "bg-gradient-to-r from-blue-400 to-purple-400", 
        description: "Enchanted digits (100s, 1000s & 10,000s)",
        range: "1,000 - 99,999",
        icon: "✨"
      };
      case 4: return { 
        name: "Crystal Queen", 
        color: "bg-gradient-to-r from-teal-400 to-blue-400", 
        description: "Royal challenges (all targets)",
        range: "10,000 - 999,999",
        icon: "👑"
      };
      case 5: return { 
        name: "Unicorn Goddess", 
        color: "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500", 
        description: "Legendary mastery",
        range: "100,000 - 9,999,999",
        icon: "🦄"
      };
      default: return { name: "Explorer", color: "bg-gray-500", description: "", range: "", icon: "✨" };
    }
  };

  const getRoundingHelper = () => {
    const digitPosition = Math.log10(roundTo);
    const nextDigit = Math.floor(currentNumber / (roundTo / 10)) % 10;
    
    return {
      position: digitPosition,
      lookAt: nextDigit,
      shouldRoundUp: nextDigit >= 5
    };
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center transform hover:scale-105 transition-transform duration-300 border-4 border-pink-200">
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <Sparkles className="text-pink-500 mx-2" size={48} />
              <Crown className="text-purple-500 mx-2" size={48} />
              <Heart className="text-pink-500 mx-2" size={48} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              ✨ Magical Rounding Adventure ✨
            </h1>
            <p className="text-gray-600 text-lg">Become the ultimate rounding princess! 👑</p>
          </div>

          {/* Difficulty Slider */}
          <div className="mb-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200">
            <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center justify-center">
              <Target className="mr-2" size={24} />
              Choose Your Adventure Level
            </h3>
            
            <div className="mb-4">
              <input
                type="range"
                min="1"
                max="5"
                value={difficulty}
                onChange={(e) => setDifficulty(parseInt(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-pink-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #fbb6ce 0%, #fbb6ce ${(difficulty-1)*25}%, #e0e7ff ${(difficulty-1)*25}%, #e0e7ff 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Easy</span>
                <span>Medium</span>
                <span>Hard</span>
              </div>
            </div>

            <div className={`${getDifficultyInfo().color} text-white rounded-2xl p-4 mb-4`}>
              <div className="text-2xl mb-2">{getDifficultyInfo().icon}</div>
              <div className="text-xl font-bold">{getDifficultyInfo().name}</div>
              <div className="text-sm opacity-90">{getDifficultyInfo().description}</div>
              <div className="text-xs opacity-75 mt-1">Numbers: {getDifficultyInfo().range}</div>
            </div>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-purple-600 hover:text-purple-800 text-sm font-medium"
            >
              {showSettings ? '🔼 Hide Details' : '🔽 Show All Levels'}
            </button>

            {showSettings && (
              <div className="mt-4 space-y-2 text-left">
                {[1,2,3,4,5].map(level => {
                  const info = getDifficultyInfo();
                  const levelInfo = (() => {
                    switch(level) {
                      case 1: return { name: "Princess Beginner", desc: "Tiny treasures (10s only)", range: "10 - 999", icon: "🌸", color: "from-pink-400 to-rose-400" };
                      case 2: return { name: "Fairy Explorer", desc: "Magic numbers (10s & 100s)", range: "100 - 9,999", icon: "🧚‍♀️", color: "from-purple-400 to-pink-400" };
                      case 3: return { name: "Sparkle Sorceress", desc: "Enchanted digits (100s, 1000s & 10,000s)", range: "1,000 - 99,999", icon: "✨", color: "from-blue-400 to-purple-400" };
                      case 4: return { name: "Crystal Queen", desc: "Royal challenges (all targets)", range: "10,000 - 999,999", icon: "👑", color: "from-teal-400 to-blue-400" };
                      case 5: return { name: "Unicorn Goddess", desc: "Legendary mastery", range: "100,000 - 9,999,999", icon: "🦄", color: "from-pink-500 via-purple-500 to-indigo-500" };
                    }
                  })();
                  
                  return (
                    <div key={level} className={`rounded-lg p-3 text-sm ${level === difficulty ? 'bg-purple-100 border-2 border-purple-300' : 'bg-gray-50'}`}>
                      <div className="font-semibold text-gray-800">{levelInfo.icon} {levelInfo.name}</div>
                      <div className="text-gray-600 text-xs">{levelInfo.desc} • {levelInfo.range}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xl px-8 py-4 rounded-full hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg border-2 border-white"
          >
            ✨ Start My Adventure! ✨
          </button>
        </div>
      </div>
    );
  }

  const difficultyInfo = getDifficultyInfo();
  const helper = getRoundingHelper();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border-4 border-pink-200">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className={`${difficultyInfo.color} text-white px-4 py-2 rounded-full font-bold flex items-center text-sm border-2 border-white shadow-lg`}>
                <span className="mr-2 text-lg">{difficultyInfo.icon}</span>
                {difficultyInfo.name}
              </div>
              <div className="text-gray-600 text-sm">
                <div>{difficultyInfo.description}</div>
                <div className="text-xs text-gray-500">Range: {difficultyInfo.range}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center text-pink-600 font-bold bg-pink-100 px-3 py-1 rounded-full">
                <Star className="mr-1" size={18} />
                {score}
              </div>
              <div className="flex items-center text-purple-600 font-bold bg-purple-100 px-3 py-1 rounded-full">
                🔥 {streak}
              </div>
              <div className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                Q: {questionsAnswered}
              </div>
              <button
                onClick={resetGame}
                className="flex items-center bg-gradient-to-r from-gray-400 to-gray-500 text-white px-3 py-2 rounded-full hover:from-gray-500 hover:to-gray-600 transition-all duration-300 text-sm shadow-lg"
              >
                <RotateCcw className="mr-1" size={14} />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 text-center border-4 border-purple-200">
          <div className="mb-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              ✨ Round this magical number to the nearest {roundTo.toLocaleString()} ✨
            </h2>
            <div className="text-sm text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg p-2 inline-block">
              💡 Look at the {getRoundingHelper().position === 1 ? 'ones' : 
                          getRoundingHelper().position === 2 ? 'tens' : 
                          getRoundingHelper().position === 3 ? 'hundreds' : 
                          getRoundingHelper().position === 4 ? 'thousands' : 'ten-thousands'} place to decide!
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white rounded-3xl p-8 mb-6 transform hover:scale-105 transition-transform duration-300 border-4 border-white shadow-xl">
            <div className="text-5xl md:text-6xl font-bold mb-2 font-mono tracking-wider drop-shadow-lg">
              {currentNumber.toLocaleString()}
            </div>
            <div className="text-lg opacity-90 font-medium">
              ✨ Round to nearest {roundTo.toLocaleString()} ✨
            </div>
          </div>

          {/* Rounding Helper */}
          {!showAnswer && (
            <div className="bg-gradient-to-r from-yellow-50 to-pink-50 border-l-4 border-pink-400 p-4 mb-6 text-left rounded-lg border border-pink-200">
              <div className="text-sm text-pink-800">
                <strong>🌸 Princess Tip:</strong> Look at the digit {helper.lookAt} in the {
                  roundTo === 10 ? 'ones' :
                  roundTo === 100 ? 'tens' :
                  roundTo === 1000 ? 'hundreds' :
                  roundTo === 10000 ? 'thousands' :
                  'ten-thousands'
                } place. Since it's {helper.lookAt}, you should round {helper.shouldRoundUp ? 'UP ⬆️' : 'DOWN ⬇️'}.
              </div>
            </div>
          )}

          {/* Answer Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {options.map((option, index) => {
              const correctAnswer = Math.round(currentNumber / roundTo) * roundTo;
              const isCorrect = option === correctAnswer;
              const isSelected = selectedAnswer === option;
              
              let buttonClass = "bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 text-gray-800 border-2 border-pink-300";
              
              if (showAnswer) {
                if (isCorrect) {
                  buttonClass = "bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-600 shadow-xl transform scale-105";
                } else if (isSelected && !isCorrect) {
                  buttonClass = "bg-gradient-to-r from-rose-400 to-pink-500 text-white border-rose-600";
                } else {
                  buttonClass = "bg-gray-200 text-gray-600 border-gray-300";
                }
              }
              
              return (
                <button
                  key={index}
                  onClick={() => !showAnswer && checkAnswer(option)}
                  disabled={showAnswer}
                  className={`${buttonClass} font-bold text-lg py-4 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 font-mono shadow-lg`}
                >
                  {option.toLocaleString()}
                  {showAnswer && isCorrect && " ✨"}
                  {showAnswer && isSelected && !isCorrect && " 💔"}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`text-xl font-bold mb-6 p-6 rounded-2xl border-2 ${
              feedback.includes('magical') || feedback.includes('Perfect') || feedback.includes('amazing')
                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300' 
                : 'bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border-pink-300'
            } shadow-lg`}>
              {feedback}
            </div>
          )}

          {/* Next Button */}
          {showAnswer && (
            <button
              onClick={nextQuestion}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-bold text-xl px-8 py-4 rounded-full hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-xl border-2 border-white"
            >
              ✨ Next Adventure! ✨
            </button>
          )}
        </div>

        {/* Advanced Tips */}
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center border-4 border-indigo-200">
          <h3 className="font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-3 text-lg">
            💖 Princess Rounding Secrets 💖
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border-2 border-pink-200">
              <div className="font-semibold text-pink-800 mb-2">🌸 Find the Magic Spot</div>
              <div className="text-pink-700">Locate the place value you're rounding to</div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border-2 border-purple-200">
              <div className="font-semibold text-purple-800 mb-2">✨ Look to the Right</div>
              <div className="text-purple-700">Check the digit immediately to the right</div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-4 border-2 border-blue-200">
              <div className="font-semibold text-blue-800 mb-2">👑 Apply Royal Rules</div>
              <div className="text-blue-700">5+ rounds up, less than 5 rounds down</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoundingGame;
