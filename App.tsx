import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HeroSection } from './components/HeroSection';
import { EvolutionSection } from './components/EvolutionSection';
import { CosmicBackground } from './components/CosmicBackground';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Navbar, Page } from './components/Navbar';
import { CategoryPage } from './components/CategoryPage';
import { DetailModal } from './components/DetailModal';
import { fetchCosmicContent } from './services/geminiService';
import { CosmicData, CelestialBody } from './types';
import { SocialLinks } from './components/SocialLinks';
import { ScrollspyNav } from './components/ScrollspyNav';
import { SettingsControl } from './components/SettingsControl';

const SECTIONS = [
    { id: 'stars-section', title: 'Stars' },
    { id: 'galaxies-section', title: 'Galaxies' },
    { id: 'planets-section', title: 'Planets' },
    { id: 'constellations-section', title: 'Constellations' },
];

const App: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);
    const [cosmicData, setCosmicData] = useState<CosmicData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [isFading, setIsFading] = useState(false);
    const [selectedItem, setSelectedItem] = useState<{ item: CelestialBody; type: 'star' | 'galaxy' | 'planet' | 'constellation' } | null>(null);
    const [starDensity, setStarDensity] = useState(1);
    
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    const handleNavigate = useCallback((page: Page) => {
        if (page === currentPage) return;
        setIsFading(true);
        setTimeout(() => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsFading(false);
        }, 300); // Duration should match CSS transition
    }, [currentPage]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const loadCosmicData = useCallback(async () => {
        try {
            setLoading(true);
            const [stars, galaxies, planets, constellations] = await Promise.all([
                fetchCosmicContent('stars'),
                fetchCosmicContent('galaxies'),
                fetchCosmicContent('planets'),
                fetchCosmicContent('constellations'),
            ]);
            setCosmicData({ stars, galaxies, planets, constellations });
        } catch (err) {
            setError('Failed to fetch cosmic wonders. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCosmicData();
    }, [loadCosmicData]);

    useEffect(() => {
        if (currentPage !== 'home' || !cosmicData) return; // Only apply observer on home page when data is loaded

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    // Add a delay to let the user read the message before scrolling up
                    setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 2000); // Increased delay to read the new text
                }
            },
            { threshold: 0.8 } // Trigger when 80% of the element is visible
        );

        const currentLoaderRef = loaderRef.current;
        if (currentLoaderRef) {
            observer.observe(currentLoaderRef);
        }

        return () => {
            if (currentLoaderRef) {
                observer.unobserve(currentLoaderRef);
            }
        };
    }, [cosmicData, currentPage]);

    const handleItemClick = (item: CelestialBody, type: 'star' | 'galaxy' | 'planet' | 'constellation') => {
        setSelectedItem({ item, type });
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };
    
    const handleStarDensityChange = (newDensity: number) => {
        setStarDensity(newDensity);
    };


    const renderPage = () => {
        if (loading) return <LoadingSpinner />;
        if (error) return <p className="text-center text-red-400 mt-48">{error}</p>;
        if (!cosmicData) return null;

        const commonProps = { onItemClick: handleItemClick };

        switch (currentPage) {
            case 'home':
                return (
                    <>
                        <HeroSection scrollY={scrollY} />
                        <div className="space-y-32 md:space-y-48 pb-32">
                            <EvolutionSection id={SECTIONS[0].id} title="The Birth of Stars" items={cosmicData.stars} itemType="star" {...commonProps} />
                            <EvolutionSection id={SECTIONS[1].id} title="A Dance of Galaxies" items={cosmicData.galaxies} itemType="galaxy" {...commonProps} />
                            <EvolutionSection id={SECTIONS[2].id} title="Formation of Worlds" items={cosmicData.planets} itemType="planet" {...commonProps} />
                            <EvolutionSection id={SECTIONS[3].id} title="Myths Written in the Sky" items={cosmicData.constellations} itemType="constellation" {...commonProps} />
                        </div>
                        <div ref={loaderRef} className="h-48 flex flex-col items-center justify-center text-center">
                            <div className="fade-in-section">
                                <p className="text-2xl text-indigo-300 glow">Keep Exploring the Unknown</p>
                                <p className="mt-2 text-gray-400">The cosmos is an endless cycle, returning to the genesis...</p>
                            </div>
                        </div>
                    </>
                );
            case 'stars':
                return <CategoryPage title="The Birth of Stars" subtitle="Explore the lifecycle of stellar giants, from glowing nebulae to explosive supernovae." items={cosmicData.stars} itemType="star" {...commonProps} />;
            case 'galaxies':
                return <CategoryPage title="A Dance of Galaxies" subtitle="Journey through vast cosmic islands, each a swirling metropolis of billions of stars." items={cosmicData.galaxies} itemType="galaxy" {...commonProps} />;
            case 'planets':
                return <CategoryPage title="Formation of Worlds" subtitle="Discover a universe of planets, from familiar rocky spheres to exotic gas giants and rogue wanderers." items={cosmicData.planets} itemType="planet" {...commonProps} />;
            case 'constellations':
                return <CategoryPage title="Myths Written in the Sky" subtitle="Uncover the ancient stories and legends humanity has woven into the tapestry of the night sky." items={cosmicData.constellations} itemType="constellation" {...commonProps} />;
            default:
                return null;
        }
    };

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#000010]">
            <CosmicBackground scrollY={scrollY} starDensity={starDensity} />
            <SocialLinks />
            <SettingsControl density={starDensity} onDensityChange={handleStarDensityChange} />
            <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
            {currentPage === 'home' && cosmicData && <ScrollspyNav sections={SECTIONS} scrollY={scrollY} />}
            <main className={`relative z-10 page-content ${isFading ? 'fading' : ''}`}>
                {renderPage()}
            </main>
            {selectedItem && (
                <DetailModal 
                    item={selectedItem.item} 
                    type={selectedItem.type} 
                    onClose={handleCloseModal} 
                />
            )}
        </div>
    );
};

export default App;