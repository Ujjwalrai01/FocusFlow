// import React from 'react';
// import { Clock, TrendingUp, Target, Award, CheckCircle, Zap, Music, BarChart3, Activity } from 'lucide-react';

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

// export default Dashboard;










import React from 'react';
import { Clock, TrendingUp, Target, Award, CheckCircle, Zap, Music, BarChart3, Activity, Plus, Timer } from 'lucide-react';

const Dashboard = ({ theme, stats, tasks, analytics }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className={`bg-gradient-to-r ${theme.bg} rounded-lg p-6 border border-gray-700`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className={`text-2xl md:text-3xl font-bold text-${theme.primary} mb-2`}>
              Welcome back, CyberNinja! 🚀
            </h2>
            <p className="text-gray-300">Ready to crush your productivity goals today?</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className={`px-4 py-2 bg-${theme.primary} bg-opacity-20 rounded-lg border border-${theme.primary}`}>
              <span className={`text-${theme.primary} font-bold`}>Level {stats.level}</span>
            </div>
            <div className={`px-4 py-2 bg-${theme.secondary} bg-opacity-20 rounded-lg border border-${theme.secondary}`}>
              <span className={`text-${theme.secondary} font-bold`}>{stats.streak}🔥 Streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Clock className={`text-${theme.primary}`} size={20} />
            <span className="text-2xl">⏰</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.todaySessions}</p>
          <p className="text-sm text-gray-400">Today's Sessions</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className={`text-${theme.secondary}`} size={20} />
            <span className="text-2xl">📈</span>
          </div>
          <p className="text-2xl font-bold text-white">{Math.floor(stats.totalTime / 60)}h</p>
          <p className="text-sm text-gray-400">Total Focus Time</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Target className={`text-${theme.accent}`} size={20} />
            <span className="text-2xl">🎯</span>
          </div>
          <p className="text-2xl font-bold text-white">{Math.round((stats.weeklyProgress / stats.weeklyGoal) * 100)}%</p>
          <p className="text-sm text-gray-400">Weekly Goal</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Award className={`text-yellow-400`} size={20} />
            <span className="text-2xl">🏆</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.badges.length}</p>
          <p className="text-sm text-gray-400">Achievements</p>
        </div>
      </div>

      {/* Today's Focus & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
          <h3 className={`text-xl font-bold text-${theme.primary} mb-4 flex items-center`}>
            <CheckCircle className="mr-2" size={20} />
            Today's Focus
          </h3>
          <div className="space-y-3">
            {tasks.slice(0, 3).map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded border">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === 'high' ? 'bg-red-400' : 
                    task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                  }`}></div>
                  <span className={task.completed ? 'line-through text-gray-500' : 'text-white'}>{task.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">{task.sessions}/{task.estimatedSessions}</span>
                  <div className={`w-8 h-8 rounded border-2 ${task.completed ? `bg-${theme.primary} border-${theme.primary}` : 'border-gray-600'} flex items-center justify-center`}>
                    {task.completed && <CheckCircle size={16} className="text-black" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
          <h3 className={`text-xl font-bold text-${theme.secondary} mb-4 flex items-center`}>
            <Zap className="mr-2" size={20} />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className={`p-4 bg-${theme.primary} bg-opacity-20 rounded-lg border border-${theme.primary} text-${theme.primary} hover:bg-opacity-30 transition-all`}>
              <Timer size={24} className="mx-auto mb-2" />
              <p className="text-sm font-bold">Start Focus</p>
            </button>
            <button className={`p-4 bg-${theme.secondary} bg-opacity-20 rounded-lg border border-${theme.secondary} text-${theme.secondary} hover:bg-opacity-30 transition-all`}>
              <Plus size={24} className="mx-auto mb-2" />
              <p className="text-sm font-bold">Add Task</p>
            </button>
            <button className={`p-4 bg-${theme.accent} bg-opacity-20 rounded-lg border border-${theme.accent} text-${theme.accent} hover:bg-opacity-30 transition-all`}>
              <Music size={24} className="mx-auto mb-2" />
              <p className="text-sm font-bold">Ambients</p>
            </button>
            <button className={`p-4 bg-purple-400 bg-opacity-20 rounded-lg border border-purple-400 text-purple-400 hover:bg-opacity-30 transition-all`}>
              <BarChart3 size={24} className="mx-auto mb-2" />
              <p className="text-sm font-bold">Analytics</p>
            </button>
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
        <h3 className={`text-xl font-bold text-${theme.accent} mb-4 flex items-center`}>
          <Activity className="mr-2" size={20} />
          This Week's Progress
        </h3>
        <div className="flex flex-wrap justify-between items-center mb-4">
          {analytics.daily.map((day, index) => (
            <div key={day.day} className="text-center flex-1 min-w-0 mx-1">
              <div className={`w-full h-24 bg-gray-800 rounded mb-2 flex items-end justify-center overflow-hidden`}>
                <div 
                  className={`w-full bg-gradient-to-t from-${theme.primary} to-${theme.secondary} transition-all duration-1000`}
                  style={{ height: `${(day.sessions / 12) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mb-1">{day.day}</p>
              <p className={`text-sm font-bold text-${theme.primary}`}>{day.sessions}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>Goal: {stats.weeklyGoal} sessions</span>
          <span className={`text-${theme.primary} font-bold`}>{stats.weeklyProgress}/{stats.weeklyGoal}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;