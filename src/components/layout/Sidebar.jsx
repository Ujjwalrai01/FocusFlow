import React from 'react';
import { Home, Timer, CheckCircle, BarChart3, Brain, Users, Trophy, Settings, Folder, User, ChevronDown, ChevronUp } from 'lucide-react';

const menuItems = [
  { id: 'dashboard', name: 'Dashboard', icon: Home, folder: '📊 Overview' },
  { id: 'timer', name: 'Focus Timer', icon: Timer, folder: '⏰ Timer' },
  { id: 'tasks', name: 'Task Manager', icon: CheckCircle, folder: '📝 Tasks' },
  { id: 'analytics', name: 'Analytics', icon: BarChart3, folder: '📈 Analytics' },
  { id: 'focus-tools', name: 'Focus Tools', icon: Brain, folder: '🧠 Tools' },
  { id: 'social', name: 'Community', icon: Users, folder: '👥 Social' },
  { id: 'achievements', name: 'Achievements', icon: Trophy, folder: '🏆 Rewards' },
  { id: 'settings', name: 'Settings', icon: Settings, folder: '⚙️ Config' }
];

const Sidebar = ({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen, theme }) => {
  return (
    <div className={`${sidebarOpen ? 'w-72' : 'w-16'} transition-all duration-300 bg-gray-900/80 backdrop-blur-sm border-r border-gray-700 flex flex-col h-full`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h1 className={`text-xl font-bold text-${theme.primary} mb-1`}>FOCUSFLOW</h1>
              <p className="text-xs text-gray-400">v2.1.0 // PRODUCTIVITY OS</p>
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded border border-${theme.primary} text-${theme.primary} hover:bg-${theme.primary} hover:bg-opacity-20`}
          >
            {sidebarOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 py-4 space-y-1">
        {menuItems.map(item => (
          <div key={item.id}>
            {sidebarOpen && (
              <div className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider font-bold">
                <Folder size={12} className="inline mr-2" />
                {item.folder}
              </div>
            )}
            <button
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left transition-all hover:bg-gray-800 ${
                activeSection === item.id 
                  ? `bg-${theme.primary} bg-opacity-20 border-r-2 border-${theme.primary} text-${theme.primary}` 
                  : 'text-gray-300'
              }`}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {sidebarOpen && <span className="ml-3 font-medium">{item.name}</span>}
            </button>
          </div>
        ))}
      </div>

      {/* User Profile */}
      {sidebarOpen && (
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r from-${theme.primary} to-${theme.secondary} flex items-center justify-center`}>
              <User size={16} className="text-black" />
            </div>
            <div>
              <p className={`text-sm font-bold text-${theme.primary}`}>CyberNinja</p>
              <p className="text-xs text-gray-400">Level 7 • 42 Sessions</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;