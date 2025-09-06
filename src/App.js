import React, { useState } from 'react';
import { Star, Crown, Heart, Sparkles, Calculator, Plus, Minus, X, Divide } from 'lucide-react';
import RoundingGame from './components/RoundingGame';
// Import other games as you create them
// import AdditionGame from './components/AdditionGame';
// import SubtractionGame from './components/SubtractionGame';
// import MultiplicationGame from './components/MultiplicationGame';
// import DivisionGame from './components/DivisionGame';

const App = () => {
  const [currentGame, setCurrentGame] = useState('menu');

  const games = [
    {
      id: 'rounding',
      title: 'Rounding Adventure',
      subtitle: 'Master magical rounding!',
      icon: '🌸',
      color: 'from-pink-400 to-rose-400',
      component: RoundingGame,
      available: true
    },
    {
      id: 'addition',
      title: 'Addition Quest',
      subtitle: 'Add up the magic!',
      icon: '🧚‍♀️',
      color: 'from-green-400 to-emerald-400',
      component: null, // Will be AdditionGame
      available: false
    },
    {
      id: 'subtraction',
      title: 'Subtraction Safari',
      subtitle: 'Take away troubles!',
      icon: '🦄',
      color: 'from-blue-400 to-cyan-400',
      component: null, // Will be SubtractionGame
      available: false
    },
    {
      id: 'multiplication',
      title: 'Multiplication Magic',
      subtitle: 'Multiply the wonder!',
      icon: '✨',
      color: 'from-purple-400 to-violet-400',
      component: null, // Will be MultiplicationGame
      available: false
    },
    {
      id: 'division',
      title: 'Division Dynasty',
      subtitle: 'Share the sparkles!',
      icon: '👑',
      color: 'from-yellow-400 to-orange-400',
      component: null, // Will be DivisionGame
      available: false
    }
  ];

  const handleGameSelect = (gameId) => {
    setCurrentGame(gameId);
  };

  const handleBackToMenu = () => {
    setCurrentGame('menu');
  };

  // If a game is selected, render that game component
  const currentGameData = games.find(game => game.id === currentGame);
  if (currentGame !== 'menu' && currentGameData && currentGameData.component) {
    const GameComponent = currentGameData.component;
    return <GameComponent onBack={handleBackToMenu} />;
  }

  // Render main menu
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Crown className="text-yellow-400 mx-2" size={60} />
            <Sparkles className="text-pink-500 mx-2" size={60} />
            <Heart className="text-rose-400 mx-2" size={60} />
            <Star className="text-purple-500 mx-2" size={60} />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            👑 Princess Math Kingdom 👑
          </h1>
          <p className="text-2xl text-white drop-shadow-lg font-medium">
            Choose your magical math adventure!
          </p>
          <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 inline-block">
            <span className="text-white font-semibold">✨ Learn • Play • Sparkle ✨</span>
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {games.map((game) => (
            <div
              key={game.id}
              className={`relative bg-white rounded-3xl shadow-2xl p-8 text-center transform transition-all duration-300 border-4 border-pink-200 ${
                game.available 
                  ? 'hover:scale-105 cursor-pointer hover:shadow-3xl' 
                  : 'opacity-60 cursor-not-allowed'
              }`}
              onClick={() => game.available && handleGameSelect(game.id)}
            >
              {/* Coming Soon Badge */}
              {!game.available && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  Coming Soon! ✨
                </div>
              )}

              {/* Game Icon */}
              <div className={`bg-gradient-to-r ${game.color} rounded-2xl p-6 mb-6 mx-auto w-24 h-24 flex items-center justify-center text-4xl shadow-lg`}>
                {game.icon}
              </div>

              {/* Game Title */}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {game.title}
              </h3>
              
              {/* Game Subtitle */}
              <p className="text-gray-600 mb-4 text-lg">
                {game.subtitle}
              </p>

              {/* Play Button or Coming Soon */}
              {game.available ? (
                <button className={`bg-gradient-to-r ${game.color} text-white font-bold px-6 py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-white`}>
                  ✨ Play Now! ✨
                </button>
              ) : (
                <div className="bg-gray-300 text-gray-600 font-bold px-6 py-3 rounded-full border-2 border-gray-400">
                  🔒 Coming Soon 🔒
                </div>
              )}

              {/* Difficulty Preview */}
              {game.available && (
                <div className="mt-4 text-sm text-gray-500">
                  <div className="flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  </div>
                  <span className="text-xs mt-1 block">5 Difficulty Levels</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 text-center border-2 border-white/30">
          <h3 className="text-2xl font-bold text-white mb-4">
            🌟 Your Math Journey Awaits! 🌟
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-white">
            <div className="bg-white/20 rounded-2xl p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-bold mb-2">Adaptive Learning</h4>
              <p className="text-sm">Difficulty adjusts to your skill level</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-4">
              <div className="text-3xl mb-2">🏆</div>
              <h4 className="font-bold mb-2">Track Progress</h4>
              <p className="text-sm">Earn points and build streaks</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-4">
              <div className="text-3xl mb-2">💝</div>
              <h4 className="font-bold mb-2">Fun Learning</h4>
              <p className="text-sm">Princess theme makes math magical</p>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-white/80">
            <p>✨ More magical games coming soon! ✨</p>
            <p className="mt-2">Built with 💖 for young mathematicians</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
