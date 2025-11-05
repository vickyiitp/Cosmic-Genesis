import React, { useRef, useState, useEffect } from 'react';
import { CelestialBody } from '../types';
import { CelestialItem } from './CelestialItem';

interface EvolutionSectionProps {
    id: string;
    title: string;
    items: CelestialBody[];
    itemType: 'star' | 'galaxy' | 'planet' | 'constellation';
    onItemClick: (item: CelestialBody, type: 'star' | 'galaxy' | 'planet' | 'constellation') => void;
}

export const EvolutionSection: React.FC<EvolutionSectionProps> = ({ id, title, items, itemType, onItemClick }) => {
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const [isTitleVisible, setIsTitleVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsTitleVisible(true);
                    observer.disconnect(); // Animate only once
                }
            },
            {
                rootMargin: '0px',
                threshold: 0.5, // Trigger when 50% of the title is visible
            }
        );

        const currentRef = titleRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <section id={id} className="container mx-auto px-4 py-16">
            <h2 
                ref={titleRef}
                className={`text-4xl md:text-5xl font-bold text-center mb-16 glow section-title ${isTitleVisible ? 'is-visible' : ''}`}
            >
                {title}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 md:gap-8">
                {items.map((item, index) => (
                    <CelestialItem key={index} item={item} type={itemType} onItemClick={onItemClick} />
                ))}
            </div>

            <style>{`
                .section-title {
                    opacity: 0;
                    transform: translateY(2rem);
                    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                }
                .section-title.is-visible {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </section>
    );
};
