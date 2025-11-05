
import React from 'react';

export const HeroSection: React.FC<{ scrollY: number }> = ({ scrollY }) => {
    return (
        <section className="h-screen w-full flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div 
                className="w-full h-full flex flex-col items-center justify-center"
                style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            >
                <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
                
                {/* Black Hole Visual */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center z-10">
                    {/* Event Horizon Glow */}
                    <div className="absolute w-full h-full rounded-full bg-purple-500/50 animate-pulse blur-2xl"></div>
                    {/* Accretion Disk */}
                    <div className="absolute w-[150%] h-[150%] border-t-2 border-b-2 border-purple-400/80 rounded-full hero-animate-spin-slow"></div>
                    <div className="absolute w-[180%] h-[180%] border-t border-b border-indigo-400/50 rounded-full hero-animate-spin-medium opacity-70"></div>
                    {/* Core */}
                    <div className="absolute w-full h-full rounded-full bg-black shadow-2xl shadow-black"></div>
                </div>

                <div className="relative z-10 mt-12 p-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-white glow">Cosmic Genesis</h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                        An interactive journey through the birth of the universe. Scroll to begin your discovery.
                    </p>
                </div>
            </div>
            
            {/* Scroll Down Indicator */}
            <div className="absolute bottom-10 z-10 animate-bounce">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
             {/* FIX: Removed `jsx` prop from style tag to fix TypeScript error. Prefixed animation names and classes to avoid global scope collisions. */}
             <style>{`
                @keyframes hero-spin-slow {
                    from { transform: rotate(0deg) scaleX(1); }
                    to { transform: rotate(360deg) scaleX(1); }
                }
                @keyframes hero-spin-medium {
                    from { transform: rotate(360deg) scaleX(1); }
                    to { transform: rotate(0deg) scaleX(1); }
                }
                .hero-animate-spin-slow { animation: hero-spin-slow 15s linear infinite; }
                .hero-animate-spin-medium { animation: hero-spin-medium 12s linear infinite; }
            `}</style>
        </section>
    );
};