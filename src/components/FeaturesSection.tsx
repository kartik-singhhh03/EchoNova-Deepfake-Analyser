import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain, Shield, Zap, Eye, Mic, Hash, Globe, Lock, Cpu } from 'lucide-react';

interface FeaturesSectionProps {
  onBack: () => void;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onBack }) => {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Detection',
      description: 'State-of-the-art XceptionNet for face analysis and RawNet2 for voice detection with 96%+ accuracy',
      gradient: 'from-purple-500 to-pink-500',
      details: ['Real-time processing', 'Multi-modal analysis', 'Confidence scoring']
    },
    {
      icon: Shield,
      title: 'Blockchain Verification',
      description: 'Immutable proof of authenticity stored on Polygon network with smart contract verification',
      gradient: 'from-blue-500 to-purple-500',
      details: ['Tamper-proof records', 'Smart contract integration', 'Polygon network']
    },
    {
      icon: Globe,
      title: 'Decentralized Storage',
      description: 'IPFS integration via Web3.Storage for secure, distributed file storage and retrieval',
      gradient: 'from-green-500 to-blue-500',
      details: ['IPFS protocol', 'Content addressing', 'Distributed network']
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Lightning-fast analysis with optimized ML pipelines and efficient resource utilization',
      gradient: 'from-yellow-500 to-orange-500',
      details: ['Sub-15 second analysis', 'Parallel processing', 'Optimized inference']
    },
    {
      icon: Eye,
      title: 'Grad-CAM Visualization',
      description: 'Visual heatmaps showing exactly where the AI detected suspicious regions in your content',
      gradient: 'from-pink-500 to-red-500',
      details: ['Attention visualization', 'Heatmap overlays', 'Explainable AI']
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Your data is encrypted, processed securely, and you maintain full control over your content',
      gradient: 'from-indigo-500 to-purple-500',
      details: ['End-to-end encryption', 'No data retention', 'User-controlled access']
    }
  ];

  const stats = [
    { label: 'Detection Accuracy', value: '96.8%', icon: Brain },
    { label: 'Processing Speed', value: '<15s', icon: Zap },
    { label: 'Supported Formats', value: '4+', icon: Eye },
    { label: 'Blockchain Networks', value: '1+', icon: Shield }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen px-4 pt-20 pb-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </button>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Cutting-edge technology meets user-friendly design. Discover what makes EchoNova the most advanced deepfake detection platform.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-center p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-8 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 p-8 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10"
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Technical Specifications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Cpu className="h-5 w-5 text-purple-400" />
                <span>AI Models</span>
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>• XceptionNet v2.1 for face detection</li>
                <li>• RawNet2 v1.8 for voice analysis</li>
                <li>• Custom ensemble methods</li>
                <li>• Real-time inference optimization</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Hash className="h-5 w-5 text-blue-400" />
                <span>Blockchain</span>
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Polygon network integration</li>
                <li>• Smart contract verification</li>
                <li>• Immutable result storage</li>
                <li>• Gas-optimized transactions</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Globe className="h-5 w-5 text-green-400" />
                <span>Storage</span>
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>• IPFS distributed storage</li>
                <li>• Content-addressed files</li>
                <li>• Redundant node network</li>
                <li>• 99.9% availability guarantee</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;