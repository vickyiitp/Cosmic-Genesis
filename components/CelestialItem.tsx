
import React from 'react';
import { CelestialBody } from '../types';

interface CelestialItemProps {
    item: CelestialBody;
    type: 'star' | 'galaxy' | 'planet' | 'constellation';
    onItemClick: (item: CelestialBody, type: 'star' | 'galaxy' | 'planet' | 'constellation') => void;
}

const StarVisual = () => (
    <div className="w-16 h-16 relative flex items-center justify-center">
        <div className="absolute w-full h-full rounded-full bg-orange-400 blur-lg group-hover:blur-xl transition-all duration-500"></div>
        <div className="absolute w-12 h-12 rounded-full bg-yellow-300 blur-md group-hover:blur-lg"></div>
        <div className="absolute w-8 h-8 rounded-full bg-white"></div>
        <div className="absolute w-full h-full rounded-full star-animate-pulse-slow border-2 border-yellow-400/50"></div>
        <style>{`
            @keyframes star-pulse-slow {
                0%, 100% { transform: scale(1); opacity: 0.5; }
                50% { transform: scale(1.2); opacity: 1; }
            }
            .star-animate-pulse-slow { animation: star-pulse-slow 4s ease-in-out infinite; }
        `}</style>
    </div>
);

const GalaxyVisual: React.FC = () => {
    const baseDuration = React.useMemo(() => 15 + Math.random() * 10, []); // Randomize duration between 15s and 25s

    return (
        <div className="w-20 h-20 relative flex items-center justify-center transition-transform duration-500">
            {/* Nebulous glow behind the galaxy, appears on hover */}
            <div className="absolute w-[140%] h-[140%] bg-purple-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 galaxy-animate-pulse-nebula"></div>
            
            {/* The two main spiral arms with variable rotation speed */}
            <div 
                className="galaxy-arm-1 absolute w-full h-full rounded-[50%] border-2 border-transparent border-t-purple-400 border-l-purple-400 -rotate-45"
                style={{ animationDuration: `${baseDuration}s` }}
            ></div>
            <div 
                className="galaxy-arm-2 absolute w-[70%] h-[70%] rounded-[50%] border-2 border-transparent border-b-indigo-300 border-r-indigo-300 rotate-45"
                style={{ animationDuration: `${baseDuration * 0.8}s` }}
            ></div>
            
            {/* Central Core */}
            <div className="w-3 h-3 rounded-full bg-white blur-sm group-hover:scale-125 group-hover:shadow-[0_0_12px_white] transition-all duration-500"></div>
            
             <style>{`
                @keyframes galaxy-spin-pulse {
                    0%   { transform: rotate(0deg) scale(1); opacity: 0.7; }
                    50%  { transform: rotate(180deg) scale(1.05); opacity: 1; }
                    100% { transform: rotate(360deg) scale(1); opacity: 0.7; }
                }
                @keyframes galaxy-spin-reverse-pulse {
                    0%   { transform: rotate(360deg) scale(1); opacity: 0.6; }
                    50%  { transform: rotate(180deg) scale(1.05); opacity: 0.9; }
                    100% { transform: rotate(0deg) scale(1); opacity: 0.6; }
                }
                @keyframes galaxy-pulse-nebula {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.1); opacity: 1; }
                }
                .galaxy-animate-pulse-nebula { animation: galaxy-pulse-nebula 4s ease-in-out infinite; }
                
                .galaxy-arm-1, .galaxy-arm-2 {
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    transition: animation-duration 0.5s ease-in-out, filter 0.5s ease-in-out;
                }

                /* Animation name is set, duration is now an inline style */
                .galaxy-arm-1 { 
                    animation-name: galaxy-spin-pulse;
                }
                .galaxy-arm-2 { 
                    animation-name: galaxy-spin-reverse-pulse;
                }
                
                /* Faster rotation on hover, overriding inline style */
                .group:hover .galaxy-arm-1 {
                    animation-duration: 6s !important;
                    filter: drop-shadow(0 0 3px #c084fc);
                }
                .group:hover .galaxy-arm-2 {
                    animation-duration: 5s !important;
                    filter: drop-shadow(0 0 2px #a5b4fc);
                }
            `}</style>
        </div>
    );
};

const PlanetVisual = () => (
    <div className="w-16 h-16 relative flex items-center justify-center transition-transform duration-500 group-hover:scale-110" style={{ perspective: '500px' }}>
        {/* Planet sphere that will tilt */}
        <div className="w-full h-full absolute rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 shadow-inner shadow-black/50 transition-transform duration-500 group-hover:[transform:rotateY(20deg)]">
            {/* Cloud container */}
            <div className="absolute w-full h-full rounded-full overflow-hidden">
                <div className="absolute w-24 h-12 bg-black/20 blur-md -top-2 -left-4 planet-animate-cloud-move"></div>
            </div>
        </div>

        {/* Rings */}
        <div className="absolute w-[150%] h-2 border border-cyan-200/50 rounded-full rotate-[-30deg] group-hover:rotate-[-10deg] transition-transform duration-700"></div>
        
        <style>{`
            @keyframes planet-cloud-move {
                0%   { transform: translateX(-60%); }
                50%  { transform: translateX(40%); }
                100% { transform: translateX(-60%); }
            }
            .planet-animate-cloud-move { animation: planet-cloud-move 8s ease-in-out infinite; }
        `}</style>
    </div>
);

const ConstellationVisual: React.FC = () => {
    // Generate some random points for stars
    const points = React.useMemo(() => Array.from({ length: 5 }, () => ({
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80
    })), []);

    return (
        <svg className="w-24 h-24 text-gray-400 group-hover:text-cyan-300 transition-colors duration-500" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                {/* A filter for creating a soft glow effect */}
                <filter id="line-glow">
                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Draw lines between points */}
            {points.map((p, i) => (
                i > 0 && <line 
                    key={`line-${i}`} 
                    x1={points[i-1].x} 
                    y1={points[i-1].y} 
                    x2={p.x} 
                    y2={p.y} 
                    stroke="currentColor" 
                    strokeWidth="0.5" 
                    className="constellation-line" 
                />
            ))}
            
            {/* Draw stars */}
            {points.map((p, i) => (
                <circle 
                    key={`circle-${i}`} 
                    cx={p.x} 
                    cy={p.y} 
                    r={1.5 + Math.random()} 
                    fill="white" 
                    className="constellation-star" 
                    style={{ animationDelay: `${i * 100}ms`}} 
                />
            ))}
            
            <style>{`
                .constellation-line {
                    opacity: 0;
                    transition: opacity 0.5s 0.2s;
                }
                .group:hover .constellation-line {
                    opacity: 1;
                    filter: url(#line-glow);
                }

                @keyframes constellation-twinkle-dynamic {
                    0%, 100% {
                        transform: scale(1);
                        filter: brightness(1) drop-shadow(0 0 2px white);
                    }
                    50% {
                        transform: scale(1.4);
                        filter: brightness(2) drop-shadow(0 0 6px white);
                    }
                }
                .group:hover .constellation-star {
                    animation: constellation-twinkle-dynamic 1.5s ease-in-out infinite;
                }
            `}</style>
        </svg>
    );
};

export const VisualElement: React.FC<{ type: 'star' | 'galaxy' | 'planet' | 'constellation' }> = ({ type }) => {
    switch (type) {
        case 'star': return <StarVisual />;
        case 'galaxy': return <GalaxyVisual />;
        case 'planet': return <PlanetVisual />;
        case 'constellation': return <ConstellationVisual />;
        default: return null;
    }
};

export const CelestialItem: React.FC<CelestialItemProps> = ({ item, type, onItemClick }) => {
    return (
        <div 
            className="group relative flex flex-col items-center justify-start text-center p-2 cursor-pointer transition-transform duration-300 hover:scale-110 h-36"
            onClick={() => onItemClick(item, type)}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${item.name}`}
        >
            <div className="h-28 flex items-center justify-center">
                 <VisualElement type={type} />
            </div>
            <p className="mt-auto font-semibold text-white">{item.name}</p>
        </div>
    );
};
