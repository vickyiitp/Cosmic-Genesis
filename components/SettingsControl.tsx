import React from 'react';

interface SettingsControlProps {
    density: number;
    onDensityChange: (newDensity: number) => void;
}

export const SettingsControl: React.FC<SettingsControlProps> = ({ density, onDensityChange }) => {
    return (
        <div className="group settings-container fixed bottom-6 right-6 flex items-center space-x-4 z-40">
            {/* The slider and label, initially hidden */}
            <div className="slider-wrapper opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2 bg-black/50 backdrop-blur-lg rounded-full px-4 py-2 border border-white/10">
                <label htmlFor="star-density" className="text-white text-sm font-medium whitespace-nowrap">Star Density</label>
                <input
                    id="star-density"
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={density}
                    onChange={(e) => onDensityChange(parseFloat(e.target.value))}
                    className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
            </div>
            {/* The gear icon, always visible */}
            <div className="icon-wrapper text-gray-500 group-hover:text-indigo-300 transition-all duration-300 group-hover:rotate-90">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.44,0.17-0.48,0.41L9.22,5.72C8.63,5.96,8.1,6.29,7.6,6.67L5.21,5.71C4.99,5.62,4.74,5.69,4.62,5.9L2.7,9.22 C2.59,9.42,2.64,9.69,2.82,9.83l2.03,1.58C4.8,11.71,4.78,12,4.78,12.29c0,0.3,0.02,0.6,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.38,2.91 c0.04,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.48-0.41l0.38-2.91c0.59-0.24,1.12-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0.01,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                </svg>
            </div>
            
            <style>{`
                .settings-container {
                    animation: settings-fade-in 1s ease-out 1.5s forwards;
                    opacity: 0;
                }
                @keyframes settings-fade-in {
                     from {
                        opacity: 0;
                        transform: translateX(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                /* Custom Range Slider Styles */
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: #a5b4fc; /* indigo-300 */
                    cursor: pointer;
                    margin-top: -6px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
                    box-shadow: 0 0 10px #a5b4fc;
                }
                input[type=range]::-moz-range-thumb {
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: #a5b4fc;
                    cursor: pointer;
                    box-shadow: 0 0 10px #a5b4fc;
                }
            `}</style>
        </div>
    );
};
