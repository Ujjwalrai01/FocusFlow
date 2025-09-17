// // This is a new, simplified component to handle the consistent layout of each page section.
// import React from 'react';
// import { Home } from 'lucide-react';

// const sectionIconMap = {
//     dashboard: Home,
//     timer: Timer,
//     tasks: CheckCircle,
//     analytics: BarChart3,
//     // Add other icons for other sections as needed
// };

// const Section = ({ title, active, children, theme }) => {
//   const Icon = sectionIconMap[active];
//   return (
//     <div className="flex-1 p-6 lg:p-12 overflow-y-auto">
//         <div className="mb-6">
//             <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-2">
//                 {title}
//             </h2>
//             <div className={`h-1 w-24 bg-${theme.primary} mb-6`}></div>
//         </div>
//         {children}
//     </div>
//   );
// };

// export default Section;



import React from 'react';
import { Home, Timer, CheckCircle, BarChart3 } from 'lucide-react';

const sectionIconMap = {
    dashboard: Home,
    timer: Timer,
    tasks: CheckCircle,
    analytics: BarChart3,
    // Add other icons for other sections as needed
};

const Section = ({ title, active, children, theme }) => {
  const Icon = sectionIconMap[active];
  return (
    <div className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <div className="mb-6">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-2">
                {title}
            </h2>
            <div className={`h-1 w-24 bg-${theme.primary} mb-6`}></div>
        </div>
        {children}
    </div>
  );
};

export default Section;