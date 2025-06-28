import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import ProcessingSection from './components/ProcessingSection';
import ResultsSection from './components/ResultsSection';
import FeaturesSection from './components/FeaturesSection';
import SecuritySection from './components/SecuritySection';
import PricingSection from './components/PricingSection';
import DocsSection from './components/DocsSection';
import Footer from './components/Footer';
import { WalletProvider } from './contexts/WalletContext';
import { FileProvider } from './contexts/FileContext';

function App() {
  const [currentSection, setCurrentSection] = useState<'hero' | 'upload' | 'processing' | 'results' | 'features' | 'security' | 'pricing' | 'docs'>('hero');
  const [isConnected, setIsConnected] = useState(false);

  // Handle hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the '#'
      if (hash && ['features', 'security', 'pricing', 'docs'].includes(hash)) {
        setCurrentSection(hash as any);
      } else if (!hash) {
        setCurrentSection('hero');
      }
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Handle initial hash on page load
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navigateToSection = (section: typeof currentSection) => {
    setCurrentSection(section);
    if (['features', 'security', 'pricing', 'docs'].includes(section)) {
      window.location.hash = section;
    } else if (section === 'hero') {
      window.location.hash = '';
    }
  };

  return (
    <WalletProvider>
      <FileProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
          <div className="fixed inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 animate-gradient-x" />
          
          <Navbar 
            isConnected={isConnected} 
            setIsConnected={setIsConnected}
            currentSection={currentSection}
            onNavigate={navigateToSection}
          />
          
          <main className="relative z-10">
            <AnimatePresence mode="wait">
              {currentSection === 'hero' && (
                <Hero onGetStarted={() => navigateToSection('upload')} />
              )}
              {currentSection === 'upload' && (
                <UploadSection 
                  onUploadComplete={() => navigateToSection('processing')}
                  onBack={() => navigateToSection('hero')}
                />
              )}
              {currentSection === 'processing' && (
                <ProcessingSection 
                  onProcessingComplete={() => navigateToSection('results')}
                />
              )}
              {currentSection === 'results' && (
                <ResultsSection 
                  onNewScan={() => navigateToSection('upload')}
                  onBack={() => navigateToSection('upload')}
                />
              )}
              {currentSection === 'features' && (
                <FeaturesSection onBack={() => navigateToSection('hero')} />
              )}
              {currentSection === 'security' && (
                <SecuritySection onBack={() => navigateToSection('hero')} />
              )}
              {currentSection === 'pricing' && (
                <PricingSection onBack={() => navigateToSection('hero')} />
              )}
              {currentSection === 'docs' && (
                <DocsSection onBack={() => navigateToSection('hero')} />
              )}
            </AnimatePresence>
          </main>
          
          <Footer />
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: 'rgba(15, 23, 42, 0.8)',
                color: '#fff',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
              },
            }}
          />
        </div>
      </FileProvider>
    </WalletProvider>
  );
}

export default App;