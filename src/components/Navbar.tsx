import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Wallet, Menu, X, Zap } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

interface NavbarProps {
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
  currentSection: string;
  onNavigate: (section: 'hero' | 'features' | 'security' | 'pricing' | 'docs') => void;
}

const Navbar: React.FC<NavbarProps> = ({ isConnected, setIsConnected, currentSection, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { connectWallet, walletAddress, isConnecting } = useWallet();

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const navItems = [
    { name: 'Features', id: 'features' },
    { name: 'Security', id: 'security' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Docs', id: 'docs' },
  ];

  const handleNavClick = (itemId: string) => {
    onNavigate(itemId as any);
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    onNavigate('hero');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={handleLogoClick}
          >
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-neon">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                EchoNova
              </span>
              <Zap className="h-4 w-4 text-yellow-400" />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.id)}
                whileHover={{ scale: 1.05 }}
                className={`transition-colors duration-200 relative group ${
                  currentSection === item.id 
                    ? 'text-purple-400' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 ${
                  currentSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </motion.button>
            ))}
          </div>

          {/* Wallet Connection */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleConnectWallet}
              disabled={isConnecting}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg border border-purple-500/50 shadow-neon hover:shadow-neon-pink transition-all duration-300 disabled:opacity-50"
            >
              <Wallet className="h-4 w-4" />
              <span className="text-sm font-medium">
                {isConnecting ? 'Connecting...' : walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
              </span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/20 backdrop-blur-sm rounded-lg mt-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                  currentSection === item.id
                    ? 'text-purple-400 bg-purple-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={handleConnectWallet}
              disabled={isConnecting}
              className="w-full flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md border border-purple-500/50 shadow-neon hover:shadow-neon-pink transition-all duration-300 disabled:opacity-50"
            >
              <Wallet className="h-4 w-4" />
              <span className="text-sm font-medium">
                {isConnecting ? 'Connecting...' : walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;