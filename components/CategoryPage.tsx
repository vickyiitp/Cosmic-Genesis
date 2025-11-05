import React from 'react';
import { CelestialBody } from '../types';
import { CelestialItem } from './CelestialItem';

interface CategoryPageProps {
    title: string;
    subtitle: string;
    items: CelestialBody[];
    itemType: 'star' | 'galaxy' | 'planet' | 'constellation';
    onItemClick: (item: CelestialBody, type: 'star' | 'galaxy' | 'planet' | 'constellation') => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ title, subtitle, items, itemType, onItemClick }) => {
    return (
        <div className="container mx-auto px-4 pt-32 pb-16 min-h-screen fade-in-section">
            <header className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold text-white glow">{title}</h1>
                <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">{subtitle}</p>
            </header>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 md:gap-8">
                {items.map((item, index) => (
                    <CelestialItem key={index} item={item} type={itemType} onItemClick={onItemClick}/>
                ))}
            </div>
        </div>
    );
};