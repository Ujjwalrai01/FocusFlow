import React from 'react';
import { Play, Pause, RotateCcw, Headphones, Timer } from 'lucide-react';
import { AMBIENT_SOUNDS } from '../../data/constants';

const TimerSection = ({ theme, timeLeft, isRunning, currentMode, session, totalSessions, toggleTimer, resetTimer, formatTime, getModeColor, getModeTitle, progress, settings, soundEnabled, setSoundEnabled, currentAmbient, setCurrentAmbient, glitchEffect }) => {
  return (
    <div className="space-y-6">
      {/* Main Timer Display */}
      <div className={`bg-gradient-to-br ${theme.bg} rounded-lg p-8 border-2 ${getModeColor()} shadow-2xl ${glitchEffect ? 'animate-pulse' : ''}`}>
        {/* Mode indicator */}
        <div className="text-center mb-8">
          <div className={`inline-block px-6 py-3 border-2 ${getModeColor()} rounded-lg text-2xl font-bold mb-4`}>
            {getModeTitle()}
          </div>
          <div className="text-gray-400 text-lg">
            SESSION #{session} • TOTAL COMPLETED: {totalSessions}
          </div>
        </div>

        {/* Timer display */}
        <div className="text-center mb-8">
          <div className={`text-8xl md:text-9xl font-bold mb-6 ${getModeColor().split(' ')[0]} font-mono tracking-wider`}>
            {formatTime(timeLeft)}
          </div>
          
          {/* Circular Progress */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-gray-700"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className={currentMode === 'focus' ? `text-${theme.primary}` : currentMode === 'break' ? `text-${theme.secondary}` : `text-${theme.accent}`}
                style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-xl font-bold ${getModeColor().split(' ')[0]}`}>
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={toggleTimer}
            className={`px-8 py-4 border-2 ${getModeColor()} rounded-lg hover:bg-opacity-20 hover:bg-current transition-all transform hover:scale-105 active:scale-95 flex items-center space-x-2 text-lg font-bold`}
          >
            {isRunning ? <Pause size={28} /> : <Play size={28} />}
            <span>{isRunning ? 'PAUSE' : 'START'}</span>
          </button>
          
          <button 
            onClick={resetTimer}
            className="px-8 py-4 border-2 border-red-400 text-red-400 rounded-lg hover:bg-red-400 hover:bg-opacity-20 transition-all transform hover:scale-105 active:scale-95 flex items-center space-x-2 text-lg font-bold"
          >
            <RotateCcw size={28} />
            <span>RESET</span>
          </button>
        </div>
      </div>

      {/* Quick Settings */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Ambient Sounds */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
          <h3 className={`text-xl font-bold mb-4 text-${theme.primary} flex items-center`}>
            <Headphones className="mr-2" size={20} />
            AMBIENT SOUNDS
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {AMBIENT_SOUNDS.map(sound => (
              <button
                key={sound.id}
                onClick={() => setCurrentAmbient(sound.id)}
                className={`p-3 rounded border transition-all text-center ${
                  currentAmbient === sound.id 
                    ? `border-${theme.primary} bg-${theme.primary} bg-opacity-20 text-${theme.primary}` 
                    : 'border-gray-600 text-gray-400 hover:border-gray-400'
                }`}
              >
                <div className="text-2xl mb-1">{sound.emoji}</div>
                <div className="text-xs font-bold">{sound.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Timer Presets */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
          <h3 className={`text-xl font-bold mb-4 text-${theme.secondary} flex items-center`}>
            <Timer className="mr-2" size={20} />
            QUICK PRESETS
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className={`p-3 rounded border border-${theme.primary} text-${theme.primary} hover:bg-${theme.primary} hover:bg-opacity-20 transition-all`}>
              <div className="font-bold">25:00</div>
              <div className="text-xs">Focus</div>
            </button>
            <button className={`p-3 rounded border border-${theme.secondary} text-${theme.secondary} hover:bg-${theme.secondary} hover:bg-opacity-20 transition-all`}>
              <div className="font-bold">05:00</div>
              <div className="text-xs">Short Break</div>
            </button>
            <button className={`p-3 rounded border border-${theme.accent} text-${theme.accent} hover:bg-${theme.accent} hover:bg-opacity-20 transition-all`}>
              <div className="font-bold">15:00</div>
              <div className="text-xs">Long Break</div>
            </button>
            <button className={`p-3 rounded border border-purple-400 text-purple-400 hover:bg-purple-400 hover:bg-opacity-20 transition-all`}>
              <div className="font-bold">50:00</div>
              <div className="text-xs">Deep Work</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerSection;