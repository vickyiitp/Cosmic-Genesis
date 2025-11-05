import React, { useState, useEffect } from 'react';
import { StarField } from './BackgroundStars';

// Pulsating nebulae
const Nebula: React.FC<{ color: string; position: { top: string; left: string; }; size: string }> = ({ color, position, size }) => (
    <div 
        className="absolute rounded-full"
        style={{
            ...position,
            width: size,
            height: size,
            background: `radial-gradient(ellipse at center, ${color} 0%, rgba(0,0,0,0) 70%)`,
            animation: 'pulse-nebula 15s ease-in-out infinite',
            animationDelay: `${Math.random() * 5}s`
        }}
    />
);

// Distant, slowly rotating galaxies
const DistantGalaxy: React.FC<{ position: { top: string; left: string; }; size: number }> = ({ position, size }) => (
    <div 
        className="absolute"
        style={{
            ...position,
            width: `${size}px`,
            height: `${size / 3}px`,
            background: 'radial-gradient(ellipse at center, rgba(200, 200, 255, 0.2) 0%, rgba(0,0,0,0) 60%)',
            borderRadius: '50%',
            animation: 'slow-rotate 120s linear infinite',
            animationDelay: `${Math.random() * -60}s`
        }}
    />
);

// Shooting stars
const ShootingStar: React.FC = () => {
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
        const show = () => {
            setVisible(true);
            setTimeout(() => setVisible(false), 2000); // Duration of animation
        };
        const interval = setInterval(show, Math.random() * 8000 + 5000); // Random interval
        return () => clearInterval(interval);
    }, []);

    if (!visible) return null;

    return (
        <div 
            className="absolute w-20 h-0.5 bg-gradient-to-r from-white to-transparent"
            style={{
                top: `${Math.random() * 80}%`,
                left: '0px',
                animation: 'shoot 2s ease-in forwards',
                filter: 'blur(1px)',
            }}
        />
    );
};


export const CosmicBackground: React.FC<{ scrollY: number; starDensity: number }> = ({ scrollY, starDensity }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePos({ x: event.clientX, y: event.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const parallax = (scrollFactor: number, mouseFactor: number) => ({
        transform: `translate3d(
            ${(mousePos.x - window.innerWidth / 2) * mouseFactor / 20}px, 
            ${((mousePos.y - window.innerHeight / 2) * mouseFactor / 20) + (scrollY * scrollFactor)}px,
            0
        )`,
        transition: 'transform 0.2s ease-out'
    });

    return (
        <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
            {/* Layer 1: Deepest space, slowest parallax */}
            <div className="absolute inset-0" style={parallax(0.1, 0.1)}>
                <DistantGalaxy position={{ top: '20%', left: '15%' }} size={200} />
                <DistantGalaxy position={{ top: '70%', left: '80%' }} size={150} />
                <Nebula color="rgba(139, 92, 246, 0.1)" position={{ top: '5%', left: '5%' }} size="40vw" />
                <StarField count={Math.round(70 * starDensity)} size="1px" opacity={0.4} />
            </div>

            {/* Layer 2: Mid-ground */}
            <div className="absolute inset-0" style={parallax(0.3, 0.2)}>
                 <Nebula color="rgba(29, 78, 216, 0.1)" position={{ top: '40%', left: '60%' }} size="50vw" />
                <StarField count={Math.round(50 * starDensity)} size="2px" opacity={0.6} />
            </div>
            
            {/* Layer 3: Foreground objects */}
            <div className="absolute inset-0" style={parallax(0.6, 0.4)}>
                 {/* An orbiting system */}
                <div className="absolute" style={{ top: '60%', left: '20%' }}>
                    <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-gray-300 rounded-full" style={{ animation: 'orbit 25s linear infinite' }}></div>
                </div>
                <StarField count={Math.round(30 * starDensity)} size="3px" opacity={0.8} />
            </div>

             {/* Dynamic effects layer (no parallax) */}
             <div className="absolute inset-0">
                <ShootingStar />
                <ShootingStar />
             </div>
        </div>
    );
};