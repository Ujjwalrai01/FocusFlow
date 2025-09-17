import React, { useState, useEffect } from 'react';
import { THEMES } from './data/constants';
import Sidebar from './components/layout/Sidebar';
import MobileHeader from './components/layout/MobileHeader';
import Dashboard from './components/dashboard/Dashboard';
import TimerSection from './components/timer/TimerSection';
import TaskManager from './components/tasks/TaskManager';
import Analytics from './components/analytics/Analytics';
import Achievements from './components/achievements/Achievements';
import Section from './components/ui/Section';
// Import other components as they are created //

const FocusFlow = () => {
  // Navigation & UI States
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('cyber');
  
  // Timer States
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentMode, setCurrentMode] = useState('focus');
  const [session, setSession] = useState(1);
  const [totalSessions, setTotalSessions] = useState(42);
  
  // Task Management
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete quarterly report analysis', completed: false, priority: 'high', sessions: 3, estimatedSessions: 5, tags: ['work', 'urgent'], dueDate: '2025-09-20', project: 'Q3 Review' },
    { id: 2, title: 'Master React advanced patterns', completed: true, priority: 'medium', sessions: 8, estimatedSessions: 8, tags: ['learning', 'coding'], dueDate: '2025-09-25', project: 'Skill Development' },
    { id: 3, title: 'Design new landing page', completed: false, priority: 'medium', sessions: 2, estimatedSessions: 4, tags: ['design', 'creative'], dueDate: '2025-09-22', project: 'Website Redesign' }
  ]);
  
  // Analytics Data
  const [analyticsData] = useState({
    daily: [
      { day: 'Mon', sessions: 8, minutes: 200 },
      { day: 'Tue', sessions: 6, minutes: 150 },
      { day: 'Wed', sessions: 10, minutes: 250 },
      { day: 'Thu', sessions: 7, minutes: 175 },
      { day: 'Fri', sessions: 9, minutes: 225 },
      { day: 'Sat', sessions: 4, minutes: 100 },
      { day: 'Sun', sessions: 5, minutes: 125 }
    ],
    monthly: { totalSessions: 156, totalTime: 3900, avgDaily: 5.2, bestStreak: 12 }
  });
  
  // Settings
  const [settings, setSettings] = useState({
    focusTime: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsUntilLongBreak: 4,
    notifications: true,
    autoStart: false,
    darkMode: true
  });
  
  // UI states
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentAmbient, setCurrentAmbient] = useState('none');
  const [glitchEffect, setGlitchEffect] = useState(false);
  
  // Stats
  const [stats] = useState({
    todaySessions: 8,
    totalTime: 3420,
    streak: 5,
    level: 7,
    badges: ['first-session', 'streak-3', 'early-bird'],
    weeklyGoal: 35,
    weeklyProgress: 28
  });

  const theme = THEMES[currentTheme];

  // Timer logic
  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    triggerGlitch();
    playSound('complete');
    
    if (currentMode === 'focus') {
      if (session % settings.sessionsUntilLongBreak === 0) {
        setCurrentMode('longbreak');
        setTimeLeft(settings.longBreak * 60);
      } else {
        setCurrentMode('break');
        setTimeLeft(settings.shortBreak * 60);
      }
    } else {
      setCurrentMode('focus');
      setTimeLeft(settings.focusTime * 60);
      setSession(prev => prev + 1);
    }
  };

  const triggerGlitch = () => {
    setGlitchEffect(true);
    setTimeout(() => setGlitchEffect(false), 1000);
  };

  const playSound = (type) => {
    if (!soundEnabled) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'complete') {
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.2);
    } else if (type === 'click') {
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    }
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    playSound('click');
  };

  const resetTimer = () => {
    setIsRunning(false);
    const time = currentMode === 'focus' ? settings.focusTime : 
                  currentMode === 'break' ? settings.shortBreak : settings.longBreak;
    setTimeLeft(time * 60);
    playSound('click');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getModeColor = () => {
    switch (currentMode) {
      case 'focus': return `text-${theme.primary} border-${theme.primary}`;
      case 'break': return `text-${theme.secondary} border-${theme.secondary}`;
      case 'longbreak': return `text-${theme.accent} border-${theme.accent}`;
      default: return `text-${theme.primary} border-${theme.primary}`;
    }
  };

  const getModeTitle = () => {
    switch (currentMode) {
      case 'focus': return 'FOCUS TIME';
      case 'break': return 'SHORT BREAK';
      case 'longbreak': return 'LONG BREAK';
      default: return 'FOCUS TIME';
    }
  };

  const progress = currentMode === 'focus' 
    ? ((settings.focusTime * 60 - timeLeft) / (settings.focusTime * 60)) * 100
    : currentMode === 'break'
    ? ((settings.shortBreak * 60 - timeLeft) / (settings.shortBreak * 60)) * 100
    : ((settings.longBreak * 60 - timeLeft) / (settings.longBreak * 60)) * 100;

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard theme={theme} stats={stats} tasks={tasks} analytics={analyticsData} />;
      case 'timer':
        return (
          <TimerSection
            theme={theme}
            timeLeft={timeLeft}
            isRunning={isRunning}
            currentMode={currentMode}
            session={session}
            totalSessions={totalSessions}
            toggleTimer={toggleTimer}
            resetTimer={resetTimer}
            formatTime={formatTime}
            getModeColor={getModeColor}
            getModeTitle={getModeTitle}
            progress={progress}
            settings={settings}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
            currentAmbient={currentAmbient}
            setCurrentAmbient={setCurrentAmbient}
            glitchEffect={glitchEffect}
          />
        );
      case 'tasks':
        return <TaskManager theme={theme} tasks={tasks} />;
      case 'analytics':
        return <Analytics theme={theme} analyticsData={analyticsData} />;
      case 'achievements':
        return <Achievements theme={theme} stats={stats} />;
      case 'settings':
        return <div>Settings component will go here</div>;
      default:
        return <div>Section not found.</div>;
    }
  };

  return (
    <div className={`flex h-screen w-full bg-gray-950 text-white font-sans ${currentTheme} ${currentTheme === 'retro' ? 'font-mono' : ''}`}>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute inset-0 z-40 bg-gray-950/90 backdrop-blur-sm">
          {/* A simple placeholder for now */}
          <div className="p-6 text-right">
            <button onClick={() => setMobileMenuOpen(false)} className="text-white">
              <X size={24} />
            </button>
          </div>
          <div className="p-6">
            <Sidebar 
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              sidebarOpen={true}
              setSidebarOpen={() => setMobileMenuOpen(false)}
              theme={theme}
            />
          </div>
        </div>
      )}

      {/* Main Layout */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        theme={theme}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileHeader activeSection={activeSection} setMobileMenuOpen={setMobileMenuOpen} theme={theme} />
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default FocusFlow;













// import React, { useState, useEffect, useCallback } from 'react';
// import { Play, Pause, RotateCcw, Settings, Trophy, Volume2, VolumeX, Calendar, BarChart3, Target, Clock, Zap, Star, Users, Coffee, Brain, Gamepad2, Moon, Sun, BookOpen, CheckCircle, Plus, X, Edit3, Save, Trash2, Filter, TrendingUp, Award, Shield, Flame, Timer, Music, Home, User, ChevronDown, ChevronUp, Menu, Bell, Folder, FileText, Database, Headphones, Activity, Heart, Briefcase, Sparkles, MapPin } from 'lucide-react';

// // ===========================================
// // 📁 DATA & CONSTANTS (data/)
// // ===========================================

// const THEMES = {
//   cyber: { primary: 'cyan-400', secondary: 'purple-500', accent: 'pink-500', bg: 'from-cyan-900/20 to-purple-900/20' },
//   matrix: { primary: 'green-400', secondary: 'lime-500', accent: 'emerald-400', bg: 'from-green-900/20 to-lime-900/20' },
//   neon: { primary: 'yellow-400', secondary: 'orange-500', accent: 'red-400', bg: 'from-yellow-900/20 to-orange-900/20' },
//   retro: { primary: 'pink-400', secondary: 'blue-500', accent: 'purple-400', bg: 'from-pink-900/20 to-blue-900/20' }
// };

// const AMBIENT_SOUNDS = [
//   { id: 'none', name: 'Silence', emoji: '🔇', category: 'minimal' },
//   { id: 'rain', name: 'Rain Storm', emoji: '🌧️', category: 'nature' },
//   { id: 'cafe', name: 'Coffee Shop', emoji: '☕', category: 'urban' },
//   { id: 'ocean', name: 'Ocean Waves', emoji: '🌊', category: 'nature' },
//   { id: 'forest', name: 'Forest Birds', emoji: '🌲', category: 'nature' },
//   { id: 'fireplace', name: 'Crackling Fire', emoji: '🔥', category: 'cozy' },
//   { id: 'synthwave', name: 'Synthwave', emoji: '🎵', category: 'music' },
//   { id: 'lofi', name: 'Lo-Fi Hip Hop', emoji: '🎧', category: 'music' }
// ];

// const ACHIEVEMENTS = [
//   { id: 'first-session', name: 'First Focus', desc: 'Complete your first session', icon: '🎯', rarity: 'common' },
//   { id: 'streak-3', name: 'Getting Warmed Up', desc: '3 sessions in a row', icon: '🔥', rarity: 'common' },
//   { id: 'streak-7', name: 'On Fire', desc: '7 day streak', icon: '🚀', rarity: 'rare' },
//   { id: 'early-bird', name: 'Early Bird', desc: 'Focus before 6 AM', icon: '🌅', rarity: 'uncommon' },
//   { id: 'night-owl', name: 'Night Owl', desc: 'Focus after 11 PM', icon: '🦉', rarity: 'uncommon' },
//   { id: 'marathon', name: 'Marathon Runner', desc: '20 sessions in one day', icon: '🏃', rarity: 'legendary' },
//   { id: 'centurion', name: 'Centurion', desc: '100 total sessions', icon: '💯', rarity: 'epic' },
//   { id: 'zen-master', name: 'Zen Master', desc: '50 meditation sessions', icon: '🧘', rarity: 'rare' }
// ];

// // ===========================================
// // 📁 COMPONENTS/LAYOUT (components/layout/)
// // ===========================================

// const Sidebar = ({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen, theme }) => {
//   const menuItems = [
//     { id: 'dashboard', name: 'Dashboard', icon: Home, folder: '📊 Overview' },
//     { id: 'timer', name: 'Focus Timer', icon: Timer, folder: '⏰ Timer' },
//     { id: 'tasks', name: 'Task Manager', icon: CheckCircle, folder: '📝 Tasks' },
//     { id: 'analytics', name: 'Analytics', icon: BarChart3, folder: '📈 Analytics' },
//     { id: 'focus-tools', name: 'Focus Tools', icon: Brain, folder: '🧠 Tools' },
//     { id: 'social', name: 'Community', icon: Users, folder: '👥 Social' },
//     { id: 'achievements', name: 'Achievements', icon: Trophy, folder: '🏆 Rewards' },
//     { id: 'settings', name: 'Settings', icon: Settings, folder: '⚙️ Config' }
//   ];

//   return (
//     <div className={`${sidebarOpen ? 'w-72' : 'w-16'} transition-all duration-300 bg-gray-900/80 backdrop-blur-sm border-r border-gray-700 flex flex-col h-full`}>
//       {/* Sidebar Header */}
//       <div className="p-4 border-b border-gray-700">
//         <div className="flex items-center justify-between">
//           {sidebarOpen && (
//             <div>
//               <h1 className={`text-xl font-bold text-${theme.primary} mb-1`}>FOCUSFLOW</h1>
//               <p className="text-xs text-gray-400">v2.1.0 // PRODUCTIVITY OS</p>
//             </div>
//           )}
//           <button 
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className={`p-2 rounded border border-${theme.primary} text-${theme.primary} hover:bg-${theme.primary} hover:bg-opacity-20`}
//           >
//             {sidebarOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//           </button>
//         </div>
//       </div>

//       {/* Menu Items */}
//       <div className="flex-1 py-4 space-y-1">
//         {menuItems.map(item => (
//           <div key={item.id}>
//             {sidebarOpen && (
//               <div className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider font-bold">
//                 <Folder size={12} className="inline mr-2" />
//                 {item.folder}
//               </div>
//             )}
//             <button
//               onClick={() => setActiveSection(item.id)}
//               className={`w-full flex items-center px-4 py-3 text-left transition-all hover:bg-gray-800 ${
//                 activeSection === item.id 
//                   ? `bg-${theme.primary} bg-opacity-20 border-r-2 border-${theme.primary} text-${theme.primary}` 
//                   : 'text-gray-300'
//               }`}
//             >
//               <item.icon size={20} className="flex-shrink-0" />
//               {sidebarOpen && <span className="ml-3 font-medium">{item.name}</span>}
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* User Profile */}
//       {sidebarOpen && (
//         <div className="p-4 border-t border-gray-700">
//           <div className="flex items-center space-x-3">
//             <div className={`w-10 h-10 rounded-full bg-gradient-to-r from-${theme.primary} to-${theme.secondary} flex items-center justify-center`}>
//               <User size={16} className="text-black" />
//             </div>
//             <div>
//               <p className={`text-sm font-bold text-${theme.primary}`}>CyberNinja</p>
//               <p className="text-xs text-gray-400">Level 7 • 42 Sessions</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const MobileHeader = ({ activeSection, setMobileMenuOpen, theme }) => {
//   const sectionNames = {
//     dashboard: 'Dashboard',
//     timer: 'Focus Timer',
//     tasks: 'Tasks',
//     analytics: 'Analytics',
//     'focus-tools': 'Focus Tools',
//     social: 'Community',
//     achievements: 'Achievements',
//     settings: 'Settings'
//   };

//   return (
//     <div className="lg:hidden bg-gray-900/90 backdrop-blur-sm border-b border-gray-700 p-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className={`text-lg font-bold text-${theme.primary}`}>FOCUSFLOW</h1>
//           <p className="text-xs text-gray-400">{sectionNames[activeSection]}</p>
//         </div>
//         <button 
//           onClick={() => setMobileMenuOpen(true)}
//           className={`p-2 rounded border border-${theme.primary} text-${theme.primary}`}
//         >
//           <Menu size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// // ===========================================
// // 📁 COMPONENTS/DASHBOARD (components/dashboard/)
// // ===========================================

// const Dashboard = ({ theme, stats, tasks, analytics }) => {
//   return (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <div className={`bg-gradient-to-r ${theme.bg} rounded-lg p-6 border border-gray-700`}>
//         <div className="flex flex-col md:flex-row md:items-center justify-between">
//           <div>
//             <h2 className={`text-2xl md:text-3xl font-bold text-${theme.primary} mb-2`}>
//               Welcome back, CyberNinja! 🚀
//             </h2>
//             <p className="text-gray-300">Ready to crush your productivity goals today?</p>
//           </div>
//           <div className="mt-4 md:mt-0 flex items-center space-x-4">
//             <div className={`px-4 py-2 bg-${theme.primary} bg-opacity-20 rounded-lg border border-${theme.primary}`}>
//               <span className={`text-${theme.primary} font-bold`}>Level {stats.level}</span>
//             </div>
//             <div className={`px-4 py-2 bg-${theme.secondary} bg-opacity-20 rounded-lg border border-${theme.secondary}`}>
//               <span className={`text-${theme.secondary} font-bold`}>{stats.streak}🔥 Streak</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Stats Grid */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
//           <div className="flex items-center justify-between mb-2">
//             <Clock className={`text-${theme.primary}`} size={20} />
//             <span className="text-2xl">⏰</span>
//           </div>
//           <p className="text-2xl font-bold text-white">{stats.todaySessions}</p>
//           <p className="text-sm text-gray-400">Today's Sessions</p>
//         </div>

//         <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
//           <div className="flex items-center justify-between mb-2">
//             <TrendingUp className={`text-${theme.secondary}`} size={20} />
//             <span className="text-2xl">📈</span>
//           </div>
//           <p className="text-2xl font-bold text-white">{Math.floor(stats.totalTime / 60)}h</p>
//           <p className="text-sm text-gray-400">Total Focus Time</p>
//         </div>

//         <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
//           <div className="flex items-center justify-between mb-2">
//             <Target className={`text-${theme.accent}`} size={20} />
//             <span className="text-2xl">🎯</span>
//           </div>
//           <p className="text-2xl font-bold text-white">{Math.round((stats.weeklyProgress / stats.weeklyGoal) * 100)}%</p>
//           <p className="text-sm text-gray-400">Weekly Goal</p>
//         </div>

//         <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
//           <div className="flex items-center justify-between mb-2">
//             <Award className={`text-yellow-400`} size={20} />
//             <span className="text-2xl">🏆</span>
//           </div>
//           <p className="text-2xl font-bold text-white">{stats.badges.length}</p>
//           <p className="text-sm text-gray-400">Achievements</p>
//         </div>
//       </div>

//       {/* Today's Focus & Quick Actions */}
//       <div className="grid lg:grid-cols-2 gap-6">
//         {/* Today's Tasks */}
//         <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
//           <h3 className={`text-xl font-bold text-${theme.primary} mb-4 flex items-center`}>
//             <CheckCircle className="mr-2" size={20} />
//             Today's Focus
//           </h3>
//           <div className="space-y-3">
//             {tasks.slice(0, 3).map(task => (
//               <div key={task.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded border">
//                 <div className="flex items-center space-x-3">
//                   <div className={`w-3 h-3 rounded-full ${
//                     task.priority === 'high' ? 'bg-red-400' : 
//                     task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
//                   }`}></div>
//                   <span className={task.completed ? 'line-through text-gray-500' : 'text-white'}>{task.title}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-xs text-gray-400">{task.sessions}/{task.estimatedSessions}</span>
//                   <div className={`w-8 h-8 rounded border-2 ${task.completed ? `bg-${theme.primary} border-${theme.primary}` : 'border-gray-600'} flex items-center justify-center`}>
//                     {task.completed && <CheckCircle size={16} className="text-black" />}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
//           <h3 className={`text-xl font-bold text-${theme.secondary} mb-4 flex items-center`}>
//             <Zap className="mr-2" size={20} />
//             Quick Actions
//           </h3>
//           <div className="grid grid-cols-2 gap-3">
//             <button className={`p-4 bg-${theme.primary} bg-opacity-20 rounded-lg border border-${theme.primary} text-${theme.primary} hover:bg-opacity-30 transition-all`}>
//               <Timer size={24} className="mx-auto mb-2" />
//               <p className="text-sm font-bold">Start Focus</p>
//             </button>
//             <button className={`p-4 bg-${theme.secondary} bg-opacity-20 rounded-lg border border-${theme.secondary} text-${theme.secondary} hover:bg-opacity-30 transition-all`}>
//               <Plus size={24} className="mx-auto mb-2" />
//               <p className="text-sm font-bold">Add Task</p>
//             </button>
//             <button className={`p-4 bg-${theme.accent} bg-opacity-20 rounded-lg border border-${theme.accent} text-${theme.accent} hover:bg-opacity-30 transition-all`}>
//               <Music size={24} className="mx-auto mb-2" />
//               <p className="text-sm font-bold">Ambients</p>
//             </button>
//             <button className={`p-4 bg-purple-400 bg-opacity-20 rounded-lg border border-purple-400 text-purple-400 hover:bg-opacity-30 transition-all`}>
//               <BarChart3 size={24} className="mx-auto mb-2" />
//               <p className="text-sm font-bold">Analytics</p>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Weekly Progress */}
//       <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
//         <h3 className={`text-xl font-bold text-${theme.accent} mb-4 flex items-center`}>
//           <Activity className="mr-2" size={20} />
//           This Week's Progress
//         </h3>
//         <div className="flex flex-wrap justify-between items-center mb-4">
//           {analytics.daily.map((day, index) => (
//             <div key={day.day} className="text-center flex-1 min-w-0 mx-1">
//               <div className={`w-full h-24 bg-gray-800 rounded mb-2 flex items-end justify-center overflow-hidden`}>
//                 <div 
//                   className={`w-full bg-gradient-to-t from-${theme.primary} to-${theme.secondary} transition-all duration-1000`}
//                   style={{ height: `${(day.sessions / 12) * 100}%` }}
//                 ></div>
//               </div>
//               <p className="text-xs text-gray-400 mb-1">{day.day}</p>
//               <p className={`text-sm font-bold text-${theme.primary}`}>{day.sessions}</p>
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-between text-sm text-gray-400">
//           <span>Goal: {stats.weeklyGoal} sessions</span>
//           <span className={`text-${theme.primary} font-bold`}>{stats.weeklyProgress}/{stats.weeklyGoal}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ===========================================
// // 📁 COMPONENTS/TIMER (components/timer/)
// // ===========================================

// const TimerSection = ({ theme, timeLeft, isRunning, currentMode, session, totalSessions, toggleTimer, resetTimer, formatTime, getModeColor, getModeTitle, progress, settings, soundEnabled, setSoundEnabled, currentAmbient, setCurrentAmbient, glitchEffect }) => {
//   return (
//     <div className="space-y-6">
//       {/* Main Timer Display */}
//       <div className={`bg-gradient-to-br ${theme.bg} rounded-lg p-8 border-2 ${getModeColor()} shadow-2xl ${glitchEffect ? 'animate-pulse' : ''}`}>
//         {/* Mode indicator */}
//         <div className="text-center mb-8">
//           <div className={`inline-block px-6 py-3 border-2 ${getModeColor()} rounded-lg text-2xl font-bold mb-4`}>
//             {getModeTitle()}
//           </div>
//           <div className="text-gray-400 text-lg">
//             SESSION #{session} • TOTAL COMPLETED: {totalSessions}
//           </div>
//         </div>

//         {/* Timer display */}
//         <div className="text-center mb-8">
//           <div className={`text-8xl md:text-9xl font-bold mb-6 ${getModeColor().split(' ')[0]} font-mono tracking-wider`}>
//             {formatTime(timeLeft)}
//           </div>
          
//           {/* Circular Progress */}
//           <div className="relative w-32 h-32 mx-auto mb-8">
//             <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
//               <circle
//                 cx="50"
//                 cy="50"
//                 r="45"
//                 stroke="currentColor"
//                 strokeWidth="10"
//                 fill="transparent"
//                 className="text-gray-700"
//               />
//               <circle
//                 cx="50"
//                 cy="50"
//                 r="45"
//                 stroke="currentColor"
//                 strokeWidth="10"
//                 fill="transparent"
//                 strokeDasharray={`${2 * Math.PI * 45}`}
//                 strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
//                 className={currentMode === 'focus' ? `text-${theme.primary}` : currentMode === 'break' ? `text-${theme.secondary}` : `text-${theme.accent}`}
//                 style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
//               />
//             </svg>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <span className={`text-xl font-bold ${getModeColor().split(' ')[0]}`}>
//                 {Math.round(progress)}%
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="flex flex-wrap justify-center gap-4">
//           <button 
//             onClick={toggleTimer}
//             className={`px-8 py-4 border-2 ${getModeColor()} rounded-lg hover:bg-opacity-20 hover:bg-current transition-all transform hover:scale-105 active:scale-95 flex items-center space-x-2 text-lg font-bold`}
//           >
//             {isRunning ? <Pause size={28} /> : <Play size={28} />}
//             <span>{isRunning ? 'PAUSE' : 'START'}</span>
//           </button>
          
//           <button 
//             onClick={resetTimer}
//             className="px-8 py-4 border-2 border-red-400 text-red-400 rounded-lg hover:bg-red-400 hover:bg-opacity-20 transition-all transform hover:scale-105 active:scale-95 flex items-center space-x-2 text-lg font-bold"
//           >
//             <RotateCcw size={28} />
//             <span>RESET</span>
//           </button>
//         </div>
//       </div>

//       {/* Quick Settings */}
//       <div className="grid md:grid-cols-2 gap-6">
//         {/* Ambient Sounds */}
//         <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
//           <h3 className={`text-xl font-bold mb-4 text-${theme.primary} flex items-center`}>
//             <Headphones className="mr-2" size={20} />
//             AMBIENT SOUNDS
//           </h3>
//           <div className="grid grid-cols-2 gap-3">
//             {AMBIENT_SOUNDS.map(sound => (
//               <button
//                 key={sound.id}
//                 onClick={() => setCurrentAmbient(sound.id)}
//                 className={`p-3 rounded border transition-all text-center ${
//                   currentAmbient === sound.id 
//                     ? `border-${theme.primary} bg-${theme.primary} bg-opacity-20 text-${theme.primary}` 
//                     : 'border-gray-600 text-gray-400 hover:border-gray-400'
//                 }`}
//               >
//                 <div className="text-2xl mb-1">{sound.emoji}</div>
//                 <div className="text-xs font-bold">{sound.name}</div>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Timer Presets */}
//         <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
//           <h3 className={`text-xl font-bold mb-4 text-${theme.secondary} flex items-center`}>
//             <Timer className="mr-2" size={20} />
//             QUICK PRESETS
//           </h3>
//           <div className="grid grid-cols-2 gap-3">
//             <button className={`p-3 rounded border border-${theme.primary} text-${theme.primary} hover:bg-${theme.primary} hover:bg-opacity-20 transition-all`}>
//               <div className="font-bold">25:00</div>
//               <div className="text-xs">Focus</div>
//             </button>
//             <button className={`p-3 rounded border border-${theme.secondary} text-${theme.secondary} hover:bg-${theme.secondary} hover:bg-opacity-20 transition-all`}>
//               <div className="font-bold">05:00</div>
//               <div className="text-xs">Short Break</div>
//             </button>
//             <button className={`p-3 rounded border border-${theme.accent} text-${theme.accent} hover:bg-${theme.accent} hover:bg-opacity-20 transition-all`}>
//               <div className="font-bold">15:00</div>
//               <div className="text-xs">Long Break</div>
//             </button>
//             <button className={`p-3 rounded border border-purple-400 text-purple-400 hover:bg-purple-400 hover:bg-opacity-20 transition-all`}>
//               <div className="font-bold">50:00</div>
//               <div className="text-xs">Deep Work</div>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ===========================================
// // 📁 MAIN APP COMPONENT
// // ===========================================

// const FocusFlow = () => {
//   // Navigation & UI States
//   const [activeSection, setActiveSection] = useState('dashboard');
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [currentTheme, setCurrentTheme] = useState('cyber');
  
//   // Timer States
//   const [timeLeft, setTimeLeft] = useState(25 * 60);
//   const [isRunning, setIsRunning] = useState(false);
//   const [currentMode, setCurrentMode] = useState('focus');
//   const [session, setSession] = useState(1);
//   const [totalSessions, setTotalSessions] = useState(42);
  
//   // Task Management
//   const [tasks, setTasks] = useState([
//     { id: 1, title: 'Complete quarterly report analysis', completed: false, priority: 'high', sessions: 3, estimatedSessions: 5, tags: ['work', 'urgent'], dueDate: '2025-09-20', project: 'Q3 Review' },
//     { id: 2, title: 'Master React advanced patterns', completed: true, priority: 'medium', sessions: 8, estimatedSessions: 8, tags: ['learning', 'coding'], dueDate: '2025-09-25', project: 'Skill Development' },
//     { id: 3, title: 'Design new landing page', completed: false, priority: 'medium', sessions: 2, estimatedSessions: 4, tags: ['design', 'creative'], dueDate: '2025-09-22', project: 'Website Redesign' }
//   ]);
  
//   // Analytics Data
//   const [analyticsData] = useState({
//     daily: [
//       { day: 'Mon', sessions: 8, minutes: 200 },
//       { day: 'Tue', sessions: 6, minutes: 150 },
//       { day: 'Wed', sessions: 10, minutes: 250 },
//       { day: 'Thu', sessions: 7, minutes: 175 },
//       { day: 'Fri', sessions: 9, minutes: 225 },
//       { day: 'Sat', sessions: 4, minutes: 100 },
//       { day: 'Sun', sessions: 5, minutes: 125 }
//     ],
//     monthly: { totalSessions: 156, totalTime: 3900, avgDaily: 5.2, bestStreak: 12 }
//   });
  
//   // Settings
//   const [settings, setSettings] = useState({
//     focusTime: 25,
//     shortBreak: 5,
//     longBreak: 15,
//     sessionsUntilLongBreak: 4,
//     notifications: true,
//     autoStart: false,
//     darkMode: true
//   });
  
//   // UI states
//   const [showSettings, setShowSettings] = useState(false);
//   const [soundEnabled, setSoundEnabled] = useState(true);
//   const [currentAmbient, setCurrentAmbient] = useState('none');
//   const [glitchEffect, setGlitchEffect] = useState(false);
  
//   // Stats
//   const [stats] = useState({
//     todaySessions: 8,
//     totalTime: 3420,
//     streak: 5,
//     level: 7,
//     badges: ['first-session', 'streak-3', 'early-bird'],
//     weeklyGoal: 35,
//     weeklyProgress: 28
//   });

//   const theme = THEMES[currentTheme];

//   // Timer logic
//   useEffect(() => {
//     let interval = null;
    
//     if (isRunning && timeLeft > 0) {
//       interval = setInterval(() => {
//         setTimeLeft(time => time - 1);
//       }, 1000);
//     } else if (timeLeft === 0) {
//       handleTimerComplete();
//     }
    
//     return () => clearInterval(interval);
//   }, [isRunning, timeLeft]);

//   const handleTimerComplete = () => {
//     setIsRunning(false);
//     triggerGlitch();
//     playSound('complete');
    
//     if (currentMode === 'focus') {
//       if (session % settings.sessionsUntilLongBreak === 0) {
//         setCurrentMode('longbreak');
//         setTimeLeft(settings.longBreak * 60);
//       } else {
//         setCurrentMode('break');
//         setTimeLeft(settings.shortBreak * 60);
//       }
//     } else {
//       setCurrentMode('focus');
//       setTimeLeft(settings.focusTime * 60);
//       setSession(prev => prev + 1);
//     }
//   };

//   const triggerGlitch = () => {
//     setGlitchEffect(true);
//     setTimeout(() => setGlitchEffect(false), 1000);
//   };

//   const playSound = (type) => {
//     if (!soundEnabled) return;
    
//     const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     const oscillator = audioContext.createOscillator();
//     const gainNode = audioContext.createGain();
    
//     oscillator.connect(gainNode);
//     gainNode.connect(audioContext.destination);
    
//     if (type === 'complete') {
//       oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
//       oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
//       oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.2);
//     } else if (type === 'click') {
//       oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
//     }
    
//     gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
//     gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
//     oscillator.start(audioContext.currentTime);
//     oscillator.stop(audioContext.currentTime + 0.3);
//   };

//   const toggleTimer = () => {
//     setIsRunning(!isRunning);
//     playSound('click');
//   };

//   const resetTimer = () => {
//     setIsRunning(false);
//     const time = currentMode === 'focus' ? settings.focusTime : 
//                  currentMode === 'break' ? settings.shortBreak : settings.longBreak;
//     setTimeLeft(time * 60);
//     playSound('click');
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const getModeColor = () => {
//     switch (currentMode) {
//       case 'focus': return `text-${theme.primary} border-${theme.primary}`;
//       case 'break': return `text-${theme.secondary} border-${theme.secondary}`;
//       case 'longbreak': return `text-${theme.accent} border-${theme.accent}`;
//       default: return `text-${theme.primary} border-${theme.primary}`;
//     }
//   };

//   const getModeTitle = () => {
//     switch (currentMode) {
//       case 'focus': return 'FOCUS TIME';
//       case 'break': return 'SHORT BREAK';
//       case 'longbreak': return 'LONG BREAK';
//       default: return 'FOCUS TIME';
//     }
//   };

//   const progress = currentMode === 'focus' 
//     ? ((settings.focusTime * 60 - timeLeft) / (settings.focusTime * 60)) * 100
//     : currentMode === 'break'
//     ? ((settings.shortBreak * 60 - timeLeft) / (settings.shortBreak * 60)) * 100
//     : ((settings.longBreak * 60 - timeLeft) / (settings.longBreak * 60)) * 100;

//   // ===========================================
//   // 📁 ADDITIONAL SECTIONS
//   // ===========================================

//   const TaskManager = () => (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <h2 className={`text-2xl font-bold text-${theme.primary}`}>Task Manager</h2>
//         <button className={`px-4 py-2 bg-${theme.primary} bg-opacity-20 border border-${theme.primary} text-${theme.primary} rounded-lg hover:bg-opacity-30 transition-all flex items-center space-x-2`}>
//           <Plus size={16} />
//           <span>Add Task</span>
//         </button>
//       </div>
      
//       <div className="grid gap-4">
//         {tasks.map(task => (
//           <div key={task.id} className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <div className={`w-4 h-4 rounded-full ${
//                   task.priority === 'high' ? 'bg-red-400' : 
//                   task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
//                 }`}></div>
//                 <div>
//                   <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
//                     {task.title}
//                   </h3>
//                   <p className="text-sm text-gray-400">{task.project} • Due: {task.dueDate}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="text-center">
//                   <p className={`text-sm font-bold text-${theme.primary}`}>{task.sessions}</p>
//                   <p className="text-xs text-gray-400">Sessions</p>
//                 </div>
//                 <button className={`w-8 h-8 rounded border-2 ${task.completed ? `bg-${theme.primary} border-${theme.primary}` : 'border-gray-600'} flex items-center justify-center`}>
//                   {task.completed && <CheckCircle size={16} className="text-black" />}
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const Analytics = () => (
//     <div className="space-y-6">
//       <h2 className={`text-2xl font-bold text-${theme.primary}`}>Analytics Dashboard</h2>
      
//       <div className="grid lg:grid-cols-2 gap-6">
//         <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
//           <h3 className={`text-xl font-bold mb-4 text-${theme.secondary}`}>Weekly Performance</h3>
//           <div className="space-y-4">
//             {analyticsData.daily.map(day => (
//               <div key={day.day} className="flex items-center justify-between">
//                 <span className="text-gray-300">{day.day}</span>
//                 <div className="flex items-center space-x-3">
//                   <div className="w-32 bg-gray-800 rounded-full h-2">
//                     <div 
//                       className={`h-2 bg-gradient-to-r from-${theme.primary} to-${theme.secondary} rounded-full transition-all duration-1000`}
//                       style={{ width: `${(day.sessions / 12) * 100}%` }}
//                     ></div>
//                   </div>
//                   <span className={`text-${theme.primary} font-bold w-8`}>{day.sessions}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
//           <h3 className={`text-xl font-bold mb-4 text-${theme.accent}`}>Monthly Summary</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="text-center p-4 bg-gray-800/50 rounded">
//               <p className={`text-2xl font-bold text-${theme.primary}`}>{analyticsData.monthly.totalSessions}</p>
//               <p className="text-sm text-gray-400">Total Sessions</p>
//             </div>
//             <div className="text-center p-4 bg-gray-800/50 rounded">
//               <p className={`text-2xl font-bold text-${theme.secondary}`}>{Math.floor(analyticsData.monthly.totalTime / 60)}h</p>
//               <p className="text-sm text-gray-400">Focus Time</p>
//             </div>
//             <div className="text-center p-4 bg-gray-800/50 rounded">
//               <p className={`text-2xl font-bold text-${theme.accent}`}>{analyticsData.monthly.avgDaily}</p>
//               <p className="text-sm text-gray-400">Daily Average</p>
//             </div>
//             <div className="text-center p-4 bg-gray-800/50 rounded">
//               <p className={`text-2xl font-bold text-yellow-400`}>{analyticsData.monthly.bestStreak}</p>
//               <p className="text-sm text-gray-400">Best Streak</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const FocusTools = () => (
//     <div className="space-y-6">
//       <h2 className={`text-2xl font-bold text-${theme.primary}`}>Focus Enhancement Tools</h2>
      
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
//           <div className="text-center mb-4">
//             <Brain className={`text-${theme.primary} mx-auto mb-2`} size={32} />
//             <h3 className={`text-lg font-bold text-${theme.primary}`}>Breathing Exercise</h3>
//           </div>
//           <p className="text-gray-300 text-sm mb-4">4-7-8 breathing technique for better focus</p>
//           <button className={`w-full py-2 bg-${theme.primary} bg-opacity-20 border border-${theme.primary} text-${theme.primary} rounded hover:bg-opacity-30 transition-all`}>
//             Start Exercise
//           </button>
//         </div>

//         <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
//           <div className="text-center mb-4">
//             <Heart className={`text-${theme.secondary} mx-auto mb-2`} size={32} />
//             <h3 className={`text-lg font-bold text-${theme.secondary}`}>Meditation Timer</h3>
//           </div>
//           <p className="text-gray-300 text-sm mb-4">Guided meditation sessions</p>
//           <button className={`w-full py-2 bg-${theme.secondary} bg-opacity-20 border border-${theme.secondary} text-${theme.secondary} rounded hover:bg-opacity-30 transition-all`}>
//             Meditate
//           </button>
//         </div>

//         <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
//           <div className="text-center mb-4">
//             <Sparkles className={`text-${theme.accent} mx-auto mb-2`} size={32} />
//             <h3 className={`text-lg font-bold text-${theme.accent}`}>Focus Challenges</h3>
//           </div>
//           <p className="text-gray-300 text-sm mb-4">Daily challenges to boost productivity</p>
//           <button className={`w-full py-2 bg-${theme.accent} bg-opacity-20 border border-${theme.accent} text-${theme.accent} rounded hover:bg-opacity-30 transition-all`}>
//             View Challenges
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const Social = () => (
//     <div className="space-y-6">
//       <h2 className={`text-2xl font-bold text-${theme.primary}`}>Community Hub</h2>
      
//       <div className="grid lg:grid-cols-2 gap-6">
//         <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
//           <h3 className={`text-xl font-bold mb-4 text-${theme.secondary} flex items-center`}>
//             <Trophy className="mr-2" size={20} />
//             Weekly Leaderboard
//           </h3>
//           <div className="space-y-3">
//             {[
//               { rank: 1, user: 'CyberNinja', sessions: 47, emoji: '🥇' },
//               { rank: 2, user: 'RetroGamer', sessions: 43, emoji: '🥈' },
//               { rank: 3, user: 'PixelMaster', sessions: 39, emoji: '🥉' },
//               { rank: 4, user: 'NeonCoder', sessions: 35, emoji: '🏆' }
//             ].map(player => (
//               <div key={player.rank} className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
//                 <div className="flex items-center space-x-3">
//                   <span className="text-xl">{player.emoji}</span>
//                   <span className={player.rank === 1 ? `text-${theme.primary} font-bold` : 'text-white'}>{player.user}</span>
//                 </div>
//                 <span className={`font-bold text-${theme.secondary}`}>{player.sessions}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
//           <h3 className={`text-xl font-bold mb-4 text-${theme.accent}`}>Team Challenges</h3>
//           <div className="space-y-4">
//             <div className="p-4 bg-gray-800/50 rounded border-l-4 border-yellow-400">
//               <h4 className="font-bold text-yellow-400">September Sprint</h4>
//               <p className="text-sm text-gray-300">Team goal: 1000 sessions</p>
//               <div className="mt-2 bg-gray-700 rounded-full h-2">
//                 <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '73%' }}></div>
//               </div>
//               <p className="text-xs text-gray-400 mt-1">730/1000 sessions</p>
//             </div>
            
//             <div className="p-4 bg-gray-800/50 rounded border-l-4 border-green-400">
//               <h4 className="font-bold text-green-400">Focus Streak Challenge</h4>
//               <p className="text-sm text-gray-300">Maintain 7-day streak</p>
//               <p className="text-xs text-gray-400 mt-1">42 participants</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const Achievements = () => (
//     <div className="space-y-6">
//       <h2 className={`text-2xl font-bold text-${theme.primary}`}>Achievement Gallery</h2>
      
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//         {ACHIEVEMENTS.map(achievement => (
//           <div
//             key={achievement.id}
//             className={`p-6 rounded-lg border text-center transition-all hover:scale-105 ${
//               stats.badges.includes(achievement.id)
//                 ? `border-${theme.primary} bg-${theme.primary} bg-opacity-20 shadow-lg shadow-${theme.primary}/20`
//                 : 'border-gray-700 bg-gray-800/50 opacity-50'
//             }`}
//           >
//             <div className="text-4xl mb-3">{achievement.icon}</div>
//             <h3 className={`font-bold mb-1 ${stats.badges.includes(achievement.id) ? `text-${theme.primary}` : 'text-gray-400'}`}>
//               {achievement.name}
//             </h3>
//             <p className="text-xs text-gray-400 mb-2">{achievement.desc}</p>
//             <div className={`inline-block px-2 py-1 rounded text-xs font-bold ${
//               achievement.rarity === 'legendary' ? 'bg-yellow-400 text-black' :
//               achievement.rarity === 'epic' ? 'bg-purple-400 text-black' :
//               achievement.rarity === 'rare' ? 'bg-blue-400 text-black' :
//               achievement.rarity === 'uncommon' ? 'bg-green-400 text-black' :
//               'bg-gray-400 text-black'
//             }`}>
//               {achievement.rarity.toUpperCase()}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const Settings = () => (
//     <div className="space-y-6">
//       <h2 className={`text-2xl font-bold text-${theme.primary}`}>Settings</h2>
      
//       <div className="grid lg:grid-cols-2 gap-6">
//         <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
//           <h3 className={`text-xl font-bold mb-4 text-${theme.secondary}`}>Timer Settings</h3>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-bold mb-2 text-gray-300">Focus Time (minutes)</label>
//               <input
//                 type="number"
//                 value={settings.focusTime}
//                 onChange={(e) => setSettings({...settings, focusTime: parseInt(e.target.value)})}
//                 className={`w-full p-3 bg-gray-800 border border-gray-600 rounded text-${theme.primary} font-mono focus:border-${theme.primary} focus:outline-none`}
//                 min="1" max="120"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-bold mb-2 text-gray-300">Short Break (minutes)</label>
//               <input
//                 type="number"
//                 value={settings.shortBreak}
//                 onChange={(e) => setSettings({...settings, shortBreak: parseInt(e.target.value)})}
//                 className={`w-full p-3 bg-gray-800 border border-gray-600 rounded text-${theme.secondary} font-mono focus:border-${theme.secondary} focus:outline-none`}
//                 min="1" max="30"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-bold mb-2 text-gray-300">Long Break (minutes)</label>
//               <input
//                 type="number"
//                 value={settings.longBreak}
//                 onChange={(e) => setSettings({...settings, longBreak: parseInt(e.target.value)})}
//                 className={`w-full p-3 bg-gray-800 border border-gray-600 rounded text-${theme.accent} font-mono focus:border-${theme.accent} focus:outline-none`}
//                 min="1" max="60"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
//           <h3 className={`text-xl font-bold mb-4 text-${theme.accent}`}>Appearance</h3>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-bold mb-2 text-gray-300">Theme</label>
//               <div className="grid grid-cols-2 gap-2">
//                 {Object.entries(THEMES).map(([key, themeData]) => (
//                   <button
//                     key={key}
//                     onClick={() => setCurrentTheme(key)}
//                     className={`p-3 rounded border transition-all ${
//                       currentTheme === key 
//                         ? `border-${themeData.primary} bg-${themeData.primary} bg-opacity-20` 
//                         : 'border-gray-600 hover:border-gray-400'
//                     }`}
//                   >
//                     <div className={`w-full h-4 bg-gradient-to-r from-${themeData.primary} to-${themeData.secondary} rounded mb-2`}></div>
//                     <span className="text-sm font-bold capitalize">{key}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>
            
//             <div className="flex items-center justify-between">
//               <span className="text-gray-300">Sound Effects</span>
//               <button
//                 onClick={() => setSoundEnabled(!soundEnabled)}
//                 className={`w-12 h-6 rounded-full transition-all ${
//                   soundEnabled ? `bg-${theme.primary}` : 'bg-gray-600'
//                 } relative`}
//               >
//                 <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
//                   soundEnabled ? 'right-1' : 'left-1'
//                 }`}></div>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderSection = () => {
//     switch (activeSection) {
//       case 'dashboard': return <Dashboard theme={theme} stats={stats} tasks={tasks} analytics={analyticsData} />;
//       case 'timer': return <TimerSection theme={theme} timeLeft={timeLeft} isRunning={isRunning} currentMode={currentMode} session={session} totalSessions={totalSessions} toggleTimer={toggleTimer} resetTimer={resetTimer} formatTime={formatTime} getModeColor={getModeColor} getModeTitle={getModeTitle} progress={progress} settings={settings} soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} currentAmbient={currentAmbient} setCurrentAmbient={setCurrentAmbient} glitchEffect={glitchEffect} />;
//       case 'tasks': return <TaskManager />;
//       case 'analytics': return <Analytics />;
//       case 'focus-tools': return <FocusTools />;
//       case 'social': return <Social />;
//       case 'achievements': return <Achievements />;
//       case 'settings': return <Settings />;
//       default: return <Dashboard theme={theme} stats={stats} tasks={tasks} analytics={analyticsData} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white font-mono overflow-hidden">
//       {/* Animated background */}
//       <div className="fixed inset-0 opacity-10">
//         <div className="absolute inset-0" style={{
//           backgroundImage: `
//             linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
//           `,
//           backgroundSize: '40px 40px',
//           animation: 'slide 20s linear infinite'
//         }}></div>
//       </div>

//       {/* Glitch effect */}
//       {glitchEffect && (
//         <div className="fixed inset-0 bg-red-500 opacity-20 animate-pulse z-50 pointer-events-none"></div>
//       )}

//       <div className="flex h-screen relative z-10">
//         {/* Desktop Sidebar */}
//         <div className="hidden lg:block">
//           <Sidebar 
//             activeSection={activeSection}
//             setActiveSection={setActiveSection}
//             sidebarOpen={sidebarOpen}
//             setSidebarOpen={setSidebarOpen}
//             theme={theme}
//           />
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col min-w-0">
//           {/* Mobile Header */}
//           <MobileHeader 
//             activeSection={activeSection}
//             setMobileMenuOpen={setMobileMenuOpen}
//             theme={theme}
//           />

//           {/* Content Area */}
//           <div className="flex-1 overflow-auto p-4 lg:p-8">
//             {renderSection()}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Overlay */}
//       {mobileMenuOpen && (
//         <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-80">
//           <div className="bg-gray-900 h-full w-80 p-4">
//             <div className="flex justify-between items-center mb-6">
//               <h1 className={`text-xl font-bold text-${theme.primary}`}>FOCUSFLOW</h1>
//               <button onClick={() => setMobileMenuOpen(false)}>
//                 <X size={24} className="text-gray-400" />
//               </button>
//             </div>
//             <Sidebar 
//               activeSection={activeSection}
//               setActiveSection={(section) => {
//                 setActiveSection(section);
//                 setMobileMenuOpen(false);
//               }}
//               sidebarOpen={true}
//               setSidebarOpen={() => {}}
//               theme={theme}
//             />
//           </div>
//         </div>
//       )}

//       {/* CSS Animations */}
//       <style jsx>{`
//         @keyframes slide {
//           0% { transform: translate(0, 0); }
//           100% { transform: translate(-40px, -40px); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default FocusFlow;

