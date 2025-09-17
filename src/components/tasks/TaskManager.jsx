import React from 'react';
import { Plus, CheckCircle } from 'lucide-react';

const TaskManager = ({ theme, tasks }) => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 className={`text-2xl font-bold text-${theme.primary}`}>Task Manager</h2>
      <button className={`px-4 py-2 bg-${theme.primary} bg-opacity-20 border border-${theme.primary} text-${theme.primary} rounded-lg hover:bg-opacity-30 transition-all flex items-center space-x-2`}>
        <Plus size={16} />
        <span>Add Task</span>
      </button>
    </div>
    
    <div className="grid gap-4">
      {tasks.map(task => (
        <div key={task.id} className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${
                task.priority === 'high' ? 'bg-red-400' : 
                task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
              }`}></div>
              <div>
                <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                  {task.title}
                </h3>
                <p className="text-sm text-gray-400">{task.project} • Due: {task.dueDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className={`text-sm font-bold text-${theme.primary}`}>{task.sessions}</p>
                <p className="text-xs text-gray-400">Sessions</p>
              </div>
              <button className={`w-8 h-8 rounded border-2 ${task.completed ? `bg-${theme.primary} border-${theme.primary}` : 'border-gray-600'} flex items-center justify-center`}>
                {task.completed && <CheckCircle size={16} className="text-black" />}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TaskManager;