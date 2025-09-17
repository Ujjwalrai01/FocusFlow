import React from 'react';
import { Trophy } from 'lucide-react';
import { ACHIEVEMENTS } from '../../data/constants';

const RarityBadge = ({ rarity }) => {
    let color = '';
    switch (rarity) {
        case 'common':
            color = 'bg-gray-500 text-gray-200';
            break;
        case 'uncommon':
            color = 'bg-green-500 text-green-100';
            break;
        case 'rare':
            color = 'bg-blue-500 text-blue-100';
            break;
        case 'epic':
            color = 'bg-purple-500 text-purple-100';
            break;
        case 'legendary':
            color = 'bg-yellow-500 text-yellow-900';
            break;
        default:
            color = 'bg-gray-500 text-gray-200';
    }
    return (
        <span className={`px-2 py-1 text-xs font-bold rounded-full uppercase ${color}`}>
            {rarity}
        </span>
    );
};

const Achievements = ({ theme, stats }) => (
    <div className="space-y-6">
        <h2 className={`text-2xl font-bold text-${theme.primary}`}>Achievements</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map(achievement => (
                <div 
                    key={achievement.id}
                    className={`p-6 rounded-lg border border-gray-700 ${stats.badges.includes(achievement.id) ? 'bg-gradient-to-r from-gray-800 to-gray-900/50' : 'bg-gray-900/50 opacity-50'}`}
                >
                    <div className="flex items-center space-x-4 mb-4">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-full text-2xl ${stats.badges.includes(achievement.id) ? `bg-${theme.primary} bg-opacity-20 border border-${theme.primary}` : 'bg-gray-800 border-gray-600'}`}>
                            {achievement.icon}
                        </div>
                        <div>
                            <h3 className={`font-bold text-lg ${stats.badges.includes(achievement.id) ? `text-${theme.primary}` : 'text-gray-400'}`}>{achievement.name}</h3>
                            <RarityBadge rarity={achievement.rarity} />
                        </div>
                    </div>
                    <p className={`text-sm ${stats.badges.includes(achievement.id) ? 'text-gray-300' : 'text-gray-500'}`}>
                        {achievement.desc}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

export default Achievements;