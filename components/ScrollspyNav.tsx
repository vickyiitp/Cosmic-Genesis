import React, { useState, useEffect } from 'react';

interface Section {
    id: string;
    title: string;
}

interface ScrollspyNavProps {
    sections: Section[];
    scrollY: number;
}

export const ScrollspyNav: React.FC<ScrollspyNavProps> = ({ sections, scrollY }) => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        let currentActiveSectionId: string | null = null;
        
        // Find the last section that is above the middle of the screen
        for (const section of sections) {
            const element = document.getElementById(section.id);
            if (element) {
                // A section is considered active if its top is above the viewport's vertical center.
                // We find the *last* one that matches this condition.
                if (element.offsetTop <= scrollY + window.innerHeight / 2) {
                    currentActiveSectionId = section.id;
                }
            }
        }
        
        setActiveSection(currentActiveSectionId);

    }, [scrollY, sections]);

    return (
        <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col space-y-4">
            {sections.map(section => (
                <a
                    key={section.id}
                    href={`#${section.id}`}
                    aria-label={`Scroll to ${section.title} section`}
                    className="group relative flex items-center justify-center"
                >
                    <span 
                        className={`block w-3 h-3 rounded-full bg-gray-600 transition-all duration-300 group-hover:bg-indigo-300 ${activeSection === section.id ? '!bg-indigo-400 scale-150 shadow-lg shadow-indigo-500/50' : ''}`}
                    ></span>
                    <span 
                        className="absolute right-full mr-4 px-3 py-1 bg-[#0b0b1e]/80 border border-indigo-500/30 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
                    >
                        {section.title}
                    </span>
                </a>
            ))}
        </nav>
    );
};
