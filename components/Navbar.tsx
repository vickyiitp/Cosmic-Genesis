import React from 'react';

export type Page = 'home' | 'stars' | 'galaxies' | 'planets' | 'constellations';

interface NavLinkProps {
    page: Page;
    currentPage: Page;
    onNavigate: (page: Page) => void;
    children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ page, currentPage, onNavigate, children }) => {
    const isActive = page === currentPage;
    return (
        <button
            onClick={() => onNavigate(page)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300
                ${isActive
                    ? 'text-white glow bg-white/10'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
        >
            {children}
        </button>
    );
};

interface NavbarProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 p-4 navbar-animate-in">
            <div className="container mx-auto flex justify-between items-center bg-black/50 backdrop-blur-lg rounded-xl p-2 shadow-lg shadow-indigo-500/10 border border-white/10">
                <button onClick={() => onNavigate('home')} className="text-xl font-bold text-white glow hover:opacity-80 transition-opacity">
                    Cosmic Genesis
                </button>
                <div className="flex items-center space-x-2 md:space-x-4">
                    <NavLink page="stars" currentPage={currentPage} onNavigate={onNavigate}>Stars</NavLink>
                    <NavLink page="galaxies" currentPage={currentPage} onNavigate={onNavigate}>Galaxies</NavLink>
                    <NavLink page="planets" currentPage={currentPage} onNavigate={onNavigate}>Planets</NavLink>
                    <NavLink page="constellations" currentPage={currentPage} onNavigate={onNavigate}>Constellations</NavLink>
                </div>
            </div>
            <style>{`
                .navbar-animate-in {
                    /* Start off-screen and invisible */
                    transform: translateY(-100%);
                    opacity: 0;
                    /* Define animation */
                    animation: navbar-slide-in 0.8s ease-out 0.5s forwards;
                }

                @keyframes navbar-slide-in {
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </nav>
    );
};
