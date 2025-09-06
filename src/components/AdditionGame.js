import React from 'react';
import { ArrowLeft } from 'lucide-react';

const AdditionGame = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-emerald-300 to-teal-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center border-4 border-green-200">
        <button
          onClick={onBack}
          className="flex items-center text-green-600 hover:text-green-800 mb-4 font-medium"
        >
          <ArrowLeft size={20} className="mr-2" />
          ← Back to Math Kingdom
        </button>
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          🧚‍♀️ Addition Quest 🧚‍♀️
        </h1>
        <p className="text-2xl text-gray-600 mb-8">Coming Soon!</p>
        <div className="text-6xl mb-4">🚧</div>
        <p className="text-gray-500">This magical adventure is being crafted...</p>
      </div>
    </div>
  );
};

export default AdditionGame;
