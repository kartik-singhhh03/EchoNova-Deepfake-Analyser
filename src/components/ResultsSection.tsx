import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, ArrowLeft, Download, Share2, Shield, Eye, Mic, Hash } from 'lucide-react';
import { useFile } from '../contexts/FileContext';

interface ResultsSectionProps {
  onNewScan: () => void;
  onBack: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ onNewScan, onBack }) => {
  const { file } = useFile();
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'blockchain'>('overview');
  
  // Mock results - in real app, these would come from API
  const results = {
    overall: {
      isDeepfake: false,
      confidence: 94.7,
      status: 'Verified Real'
    },
    face: {
      confidence: 96.2,
      model: 'XceptionNet',
      regions: 15,
      suspicious: 0
    },
    voice: {
      confidence: 93.1,
      model: 'RawNet2',
      segments: 8,
      anomalies: 0
    },
    blockchain: {
      transactionHash: '0x1234567890abcdef1234567890abcdef12345678',
      blockNumber: 45123789,
      network: 'Polygon',
      timestamp: new Date().toISOString()
    },
    ipfs: {
      hash: 'QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o',
      gateway: 'https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o'
    }
  };

  const ResultBadge = () => (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full text-lg font-semibold ${
        results.overall.isDeepfake
          ? 'bg-red-500/20 border border-red-500/50 text-red-400'
          : 'bg-green-500/20 border border-green-500/50 text-green-400'
      }`}
    >
      {results.overall.isDeepfake ? (
        <AlertTriangle className="h-5 w-5" />
      ) : (
        <CheckCircle className="h-5 w-5" />
      )}
      <span>{results.overall.status}</span>
    </motion.div>
  );

  const ConfidenceBar = ({ confidence, label, color = 'purple' }: { confidence: number; label: string; color?: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-sm font-bold text-white">{confidence}%</span>
      </div>
      <div className="bg-black/20 rounded-full p-1 border border-white/10">
        <div 
          className={`h-2 rounded-full bg-gradient-to-r ${
            color === 'green' ? 'from-green-500 to-green-400' :
            color === 'blue' ? 'from-blue-500 to-blue-400' :
            'from-purple-500 to-pink-400'
          } transition-all duration-1000 ease-out`}
          style={{ width: `${confidence}%` }}
        />
      </div>
    </div>
  );

  return (
    <motion.section
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen px-4 pt-20 pb-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Upload</span>
          </button>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Analysis Results
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            {file?.name || 'Your video'} has been analyzed
          </p>
          <ResultBadge />
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="flex bg-black/20 backdrop-blur-sm rounded-xl p-1 border border-white/10">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'details', label: 'Details', icon: Shield },
              { id: 'blockchain', label: 'Blockchain', icon: Hash },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Confidence Scores */}
              <div className="space-y-6">
                <div className="p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10">
                  <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-purple-400" />
                    <span>Confidence Scores</span>
                  </h3>
                  <div className="space-y-4">
                    <ConfidenceBar confidence={results.overall.confidence} label="Overall Authenticity" color="green" />
                    <ConfidenceBar confidence={results.face.confidence} label="Face Analysis" color="blue" />
                    <ConfidenceBar confidence={results.voice.confidence} label="Voice Analysis" color="purple" />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <Eye className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium">Face Regions</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{results.face.regions}</p>
                    <p className="text-xs text-gray-400">Analyzed</p>
                  </div>
                  <div className="p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <Mic className="h-4 w-4 text-purple-400" />
                      <span className="text-sm font-medium">Audio Segments</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{results.voice.segments}</p>
                    <p className="text-xs text-gray-400">Processed</p>
                  </div>
                </div>
              </div>

              {/* Heatmap Placeholder */}
              <div className="p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Grad-CAM Heatmap</h3>
                <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <Eye className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                    <p className="text-gray-400">Heatmap visualization</p>
                    <p className="text-sm text-gray-500">Showing attention regions</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10">
                <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-blue-400" />
                  <span>Face Analysis</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Model:</span>
                    <span className="text-white">{results.face.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Confidence:</span>
                    <span className="text-green-400">{results.face.confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Regions Analyzed:</span>
                    <span className="text-white">{results.face.regions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Suspicious Regions:</span>
                    <span className="text-green-400">{results.face.suspicious}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10">
                <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                  <Mic className="h-5 w-5 text-purple-400" />
                  <span>Voice Analysis</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Model:</span>
                    <span className="text-white">{results.voice.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Confidence:</span>
                    <span className="text-green-400">{results.voice.confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Segments Processed:</span>
                    <span className="text-white">{results.voice.segments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Anomalies Detected:</span>
                    <span className="text-green-400">{results.voice.anomalies}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'blockchain' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10">
                <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span>Blockchain Verification</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-400 text-sm">Transaction Hash:</span>
                    <p className="text-white font-mono text-sm break-all">{results.blockchain.transactionHash}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Block Number:</span>
                    <p className="text-white">{results.blockchain.blockNumber}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Network:</span>
                    <p className="text-purple-400">{results.blockchain.network}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Timestamp:</span>
                    <p className="text-white">{new Date(results.blockchain.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10">
                <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                  <Hash className="h-5 w-5 text-blue-400" />
                  <span>IPFS Storage</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-400 text-sm">IPFS Hash:</span>
                    <p className="text-white font-mono text-sm break-all">{results.ipfs.hash}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Gateway URL:</span>
                    <a 
                      href={results.ipfs.gateway} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm underline break-all"
                    >
                      View on IPFS
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <button className="flex items-center space-x-2 px-6 py-3 bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 hover:border-purple-500/50 transition-all duration-300">
            <Download className="h-4 w-4" />
            <span>Download Report</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-3 bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 hover:border-purple-500/50 transition-all duration-300">
            <Share2 className="h-4 w-4" />
            <span>Share Results</span>
          </button>
          <button 
            onClick={onNewScan}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl border border-purple-500/50 shadow-neon hover:shadow-neon-pink transition-all duration-300"
          >
            <span>New Analysis</span>
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ResultsSection;