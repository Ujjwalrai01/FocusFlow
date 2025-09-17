import React from 'react';
import { Menu } from 'lucide-react';

const MobileHeader = ({ activeSection, setMobileMenuOpen, theme }) => {
  const sectionNames = {
    dashboard: 'Dashboard',
    timer: 'Focus Timer',
    tasks: 'Tasks',
    analytics: 'Analytics',
    'focus-tools': 'Focus Tools',
    social: 'Community',
    achievements: 'Achievements',
    settings: 'Settings'
  };

  return (
    <div className="lg:hidden bg-gray-900/90 backdrop-blur-sm border-b border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-lg font-bold text-${theme.primary}`}>FOCUSFLOW</h1>
          <p className="text-xs text-gray-400">{sectionNames[activeSection]}</p>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className={`p-2 rounded border border-${theme.primary} text-${theme.primary}`}
        >
          <Menu size={20} />
        </button>
      </div>
    </div>
  );
};

export default MobileHeader;