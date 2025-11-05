import React from 'react';

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-purple-400 mb-4">Cosmic Genesis</h1>
                <p className="text-xl text-gray-300">App is working! Loading cosmic content...</p>
                <div className="mt-8 p-4 bg-purple-900/20 rounded-lg">
                    <p className="text-green-400">✅ React is loaded</p>
                    <p className="text-green-400">✅ Tailwind CSS is working</p>
                    <p className="text-green-400">✅ Components are rendering</p>
                </div>
            </div>
        </div>
    );
};

export default App;