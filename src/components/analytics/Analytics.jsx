import React from 'react';
import { BarChart3 } from 'lucide-react';

const Analytics = ({ theme, analyticsData }) => (
  <div className="space-y-6">
    <h2 className={`text-2xl font-bold text-${theme.primary}`}>Analytics Dashboard</h2>
    
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
        <h3 className={`text-xl font-bold mb-4 text-${theme.secondary}`}>Weekly Performance</h3>
        <div className="space-y-4">
          {analyticsData.daily.map(day => (
            <div key={day.day} className="flex items-center justify-between">
              <span className="text-gray-300">{day.day}</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-800 rounded-full h-2">
                  <div 
                    className={`h-2 bg-gradient-to-r from-${theme.primary} to-${theme.secondary} rounded-full transition-all duration-1000`}
                    style={{ width: `${(day.sessions / 12) * 100}%` }}
                  ></div>
                </div>
                <span className={`text-${theme.primary} font-bold w-8`}>{day.sessions}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
        <h3 className={`text-xl font-bold mb-4 text-${theme.accent}`}>Monthly Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-800/50 rounded">
            <p className={`text-2xl font-bold text-${theme.primary}`}>{analyticsData.monthly.totalSessions}</p>
            <p className="text-sm text-gray-400">Total Sessions</p>
          </div>
          <div className="text-center p-4 bg-gray-800/50 rounded">
            <p className={`text-2xl font-bold text-${theme.secondary}`}>{Math.floor(analyticsData.monthly.totalTime / 60)}h</p>
            <p className="text-sm text-gray-400">Focus Time</p>
          </div>
          <div className="text-center p-4 bg-gray-800/50 rounded">
            <p className={`text-2xl font-bold text-${theme.accent}`}>{analyticsData.monthly.avgDaily}</p>
            <p className="text-sm text-gray-400">Daily Average</p>
          </div>
          <div className="text-center p-4 bg-gray-800/50 rounded">
            <p className={`text-2xl font-bold text-yellow-400`}>{analyticsData.monthly.bestStreak}</p>
            <p className="text-sm text-gray-400">Best Streak</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Analytics;