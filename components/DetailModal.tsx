import React, { useEffect, useState, useCallback } from 'react';
import { CelestialBody } from '../types';
import { VisualElement } from './CelestialItem';

interface DetailModalProps {
    item: CelestialBody;
    type: 'star' | 'galaxy' | 'planet' | 'constellation';
    onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ item, type, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        // Wait for animation to finish before calling parent's onClose
        setTimeout(onClose, 400); 
    }, [onClose]);
    
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [handleClose]);

    return (
        <div 
            className={`fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[999] ${isClosing ? 'modal-animate-backdrop-out' : 'modal-animate-backdrop-in'}`}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div 
                className={`relative bg-[#0b0b1e]/80 border border-indigo-500/30 rounded-2xl shadow-2xl shadow-indigo-500/20 w-full max-w-md m-4 p-8 text-center flex flex-col items-center ${isClosing ? 'modal-animate-content-out' : 'modal-animate-content-in'}`}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <button 
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    aria-label="Close"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                
                <div className="transform scale-150 my-6">
                    <VisualElement type={type} />
                </div>
                
                <h2 id="modal-title" className="text-3xl font-bold text-white glow mt-4 mb-2">{item.name}</h2>
                <p className="text-gray-300 text-base">{item.description}</p>
            </div>
            
            <style>{`
                @keyframes modal-backdrop-fade-in {
                    from {
                        background-color: rgba(0, 0, 0, 0);
                        backdrop-filter: blur(0px);
                    }
                    to {
                        background-color: rgba(0, 0, 0, 0.8);
                        backdrop-filter: blur(4px);
                    }
                }
                @keyframes modal-backdrop-fade-out {
                    from {
                        background-color: rgba(0, 0, 0, 0.8);
                        backdrop-filter: blur(4px);
                    }
                    to {
                        background-color: rgba(0, 0, 0, 0);
                        backdrop-filter: blur(0px);
                    }
                }
                @keyframes modal-content-pop-in {
                    from {
                        opacity: 0;
                        transform: scale(0.9) translateY(1rem);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                @keyframes modal-content-slide-out {
                    from {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateY(2rem);
                    }
                }
                .modal-animate-backdrop-in { animation: modal-backdrop-fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
                .modal-animate-backdrop-out { animation: modal-backdrop-fade-out 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
                .modal-animate-content-in { animation: modal-content-pop-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
                .modal-animate-content-out { animation: modal-content-slide-out 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
            `}</style>
        </div>
    );
};