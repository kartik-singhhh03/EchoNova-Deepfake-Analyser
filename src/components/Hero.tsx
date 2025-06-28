import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Eye, Mic, ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const features = [
    { icon: Eye, text: 'Face Detection', color: 'text-purple-400' },
    { icon: Mic, text: 'Voice Analysis', color: 'text-pink-400' },
    { icon: Shield, text: 'Blockchain Verified', color: 'text-blue-400' },
    { icon: Zap, text: 'Real-time Processing', color: 'text-yellow-400' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-4 pt-16"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Deepfake
            </span>
            <br />
            <span className="text-white">Detection</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Reimagined
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Advanced AI-powered detection for deepfake content with 
            <span className="text-purple-400 font-semibold"> blockchain verification</span> and 
            <span className="text-pink-400 font-semibold"> IPFS storage</span>
          </p>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 px-4 py-2 bg-black/20 backdrop-blur-sm rounded-full border border-white/10 hover:border-purple-500/50 transition-all duration-300"
            >
              <feature.icon className={`h-4 w-4 ${feature.color}`} />
              <span className="text-sm font-medium text-gray-200">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="group flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl border border-purple-500/50 shadow-neon hover:shadow-neon-pink transition-all duration-300 text-lg font-semibold"
          >
            <span>Get Started</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center space-x-2 px-8 py-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 hover:border-purple-500/50 transition-all duration-300 text-lg font-semibold"
          >
            <Play className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            <span>Watch Demo</span>
          </motion.button>
        </motion.div>

        {/* Floating Cards */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            {
              title: 'AI-Powered Detection',
              description: 'XceptionNet for faces, RawNet2 for voice analysis',
              icon: Zap,
              gradient: 'from-purple-500 to-pink-500'
            },
            {
              title: 'Blockchain Verified',
              description: 'Immutable proof of authenticity on Polygon',
              icon: Shield,
              gradient: 'from-blue-500 to-purple-500'
            },
            {
              title: 'Decentralized Storage',
              description: 'IPFS integration for secure file storage',
              icon: Eye,
              gradient: 'from-pink-500 to-blue-500'
            }
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;