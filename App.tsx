
import React, { useState, useCallback } from 'react';
import { CountryView } from './components/CountryView';
import { RegionView } from './components/RegionView';

type View = 'country' | 'region';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('country');

  const NavButton = useCallback(<T,>({ view, children }: { view: View, children: React.ReactNode }) => (
    <button
      onClick={() => setActiveView(view)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-400 ${
        activeView === view
          ? 'bg-cyan-500 text-white shadow-lg'
          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
      }`}
    >
      {children}
    </button>
  ), [activeView]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <header className="bg-slate-800/50 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            <span className="text-cyan-400">Happy</span>Data
          </h1>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <NavButton view="country">Country Analysis</NavButton>
            <NavButton view="region">Regional Analysis</NavButton>
          </div>
        </nav>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {activeView === 'country' && <CountryView />}
        {activeView === 'region' && <RegionView />}
      </main>

      <footer className="text-center py-6 text-slate-500 text-sm">
        <p>Data sourced from World Bank and World Happiness Report.</p>
        <p>Created for educational purposes.</p>
      </footer>
    </div>
  );
};

export default App;
