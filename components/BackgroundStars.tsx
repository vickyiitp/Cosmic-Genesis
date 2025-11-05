import React from 'react';

// A simple starfield layer component.
// It generates a specified number of stars with random positions, opacities, and twinkling animations.
export const StarField: React.FC<{ count: number; size: string; opacity: number }> = ({ count, size, opacity }) => {
    const stars = React.useMemo(() => Array.from({ length: count }).map((_, i) => (
        <div 
            key={i} 
            className="absolute rounded-full bg-white"
            style={{
                width: size,
                height: size,
                opacity: Math.random() * opacity + 0.2,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `bg-stars-twinkle ${2 + Math.random() * 4}s ease-in-out infinite`
            }} 
        />
    )), [count, size, opacity]);

    return (
        <>
            <style>{`
                @keyframes bg-stars-twinkle {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
            `}</style>
            {stars}
        </>
    );
};
