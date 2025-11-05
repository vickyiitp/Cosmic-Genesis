import React from 'react';

const SocialIcon: React.FC<{ href: string; ariaLabel: string; children: React.ReactNode }> = ({ href, ariaLabel, children }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className="text-gray-500 hover:text-indigo-300 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(129,140,248,0.8)]"
    >
        {children}
    </a>
);

export const SocialLinks: React.FC = () => {
    return (
        <div className="social-links-container fixed bottom-6 left-6 flex flex-col space-y-4 z-40">
            <SocialIcon href="https://x.com/vickyiitp" ariaLabel="Follow on X">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            </SocialIcon>
            <SocialIcon href="https://github.com/vickyiitp" ariaLabel="Check out the code on GitHub">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
            </SocialIcon>
            <SocialIcon href="https://www.linkedin.com/in/vickyiitp" ariaLabel="Connect on LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
            </SocialIcon>
             <SocialIcon href="https://www.instagram.com/vickyiitp" ariaLabel="Follow on Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.85-.069-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.069-1.644-.069-4.849 0-3.205.012-3.584.069-4.85.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0 2.163c-3.072 0-3.442.013-4.647.067-2.612.12-3.834 1.34-3.955 3.955-.054 1.205-.067 1.575-.067 4.647s.013 3.442.067 4.647c.12 2.611 1.344 3.834 3.955 3.955 1.205.054 1.575.067 4.647.067 3.072 0 3.442-.013 4.647-.067 2.611-.12 3.834-1.344 3.955-3.955.054-1.205.067-1.575.067-4.647s-.013-3.442-.067-4.647c-.12-2.611-1.344-3.834-3.955-3.955-1.205-.054-1.575-.067-4.647-.067zm0-2.163zm-5.127 4.71c0-2.849 2.278-5.127 5.127-5.127 2.849 0 5.127 2.278 5.127 5.127s-2.278 5.127-5.127 5.127c-2.849 0-5.127-2.278-5.127-5.127zm8.252 0c0-1.73-1.395-3.125-3.125-3.125s-3.125 1.395-3.125 3.125 1.395 3.125 3.125 3.125 3.125-1.395 3.125-3.125zm-6.252 4.908c-.62 0-1.125-.505-1.125-1.125s.505-1.125 1.125-1.125 1.125.505 1.125 1.125-.505 1.125-1.125 1.125z"/>
                </svg>
            </SocialIcon>
            <style>{`
                .social-links-container {
                    animation: social-links-fade-in 1s ease-out 1.5s forwards;
                    opacity: 0;
                }

                @keyframes social-links-fade-in {
                    from {
                        opacity: 0;
                        transform: translateX(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </div>
    );
};