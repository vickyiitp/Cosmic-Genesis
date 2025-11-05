
import React from 'react';

export const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center my-24">
            <div className="w-24 h-24 relative">
                {/* Core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-300 rounded-full"></div>
                
                {/* Orbit 1 */}
                <div className="w-full h-full border-2 border-purple-400/50 rounded-full absolute loader-animate-spin-slow">
                    <div className="w-2 h-2 bg-purple-400 rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                {/* Orbit 2 */}
                <div className="w-[70%] h-[70%] border border-indigo-300/50 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loader-animate-spin-medium">
                     <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </div>
            </div>
            <p className="mt-8 text-lg text-purple-300 glow">Generating the cosmos...</p>
             {/* FIX: Removed `jsx` prop from style tag to fix TypeScript error. Prefixed animation names and classes to avoid global scope collisions. */}
             <style>{`
                @keyframes loader-spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes loader-spin-medium {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                .loader-animate-spin-slow { animation: loader-spin-slow 4s linear infinite; }
                .loader-animate-spin-medium { animation: loader-spin-medium 2.5s linear infinite; }
            `}</style>
        </div>
    );
};
