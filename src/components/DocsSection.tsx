import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Book, Code, Zap, Shield, Globe, ChevronRight, Copy, ExternalLink } from 'lucide-react';

interface DocsSectionProps {
  onBack: () => void;
}

const DocsSection: React.FC<DocsSectionProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: Zap },
    { id: 'api-reference', title: 'API Reference', icon: Code },
    { id: 'security', title: 'Security Guide', icon: Shield },
    { id: 'blockchain', title: 'Blockchain Integration', icon: Globe },
    { id: 'examples', title: 'Code Examples', icon: Book }
  ];

  const codeExample = `// Initialize EchoNova SDK
import { EchoNova } from '@echonova/sdk';

const echonova = new EchoNova({
  apiKey: 'your-api-key',
  network: 'polygon'
});

// Upload and analyze video
async function analyzeVideo(file) {
  try {
    // Upload to IPFS
    const upload = await echonova.upload(file);
    
    // Start analysis
    const analysis = await echonova.analyze(upload.fileId);
    
    // Get results
    const results = await echonova.getResults(analysis.id);
    
    return results;
  } catch (error) {
    console.error('Analysis failed:', error);
  }
}`;

  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/upload',
      description: 'Upload video file for analysis',
      params: ['file (multipart)', 'walletAddress (string)']
    },
    {
      method: 'POST',
      endpoint: '/api/analysis/start',
      description: 'Start deepfake analysis',
      params: ['fileId (string)']
    },
    {
      method: 'GET',
      endpoint: '/api/analysis/results/:id',
      description: 'Get analysis results',
      params: ['id (path parameter)']
    },
    {
      method: 'POST',
      endpoint: '/api/blockchain/verify',
      description: 'Verify results on blockchain',
      params: ['analysisId (string)', 'walletAddress (string)']
    }
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
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Documentation
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need to integrate EchoNova's deepfake detection into your applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10">
              <h3 className="text-lg font-semibold mb-4 text-white">Documentation</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <section.icon className="h-4 w-4" />
                    <span className="text-sm">{section.title}</span>
                    <ChevronRight className="h-3 w-3 ml-auto" />
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="p-8 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10">
              {activeSection === 'getting-started' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-white">Getting Started</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-purple-400">Quick Start</h3>
                      <p className="text-gray-400 mb-4">
                        Get up and running with EchoNova in minutes. Follow these simple steps to start detecting deepfakes.
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-300">
                        <li>Create an account and connect your wallet</li>
                        <li>Get your API key from the dashboard</li>
                        <li>Install the SDK or use our REST API</li>
                        <li>Upload your first video for analysis</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-purple-400">Installation</h3>
                      <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">npm</span>
                          <button className="text-gray-400 hover:text-white">
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                        <code className="text-green-400">npm install @echonova/sdk</code>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-purple-400">Basic Usage</h3>
                      <div className="bg-black/40 rounded-lg p-4 border border-white/10 overflow-x-auto">
                        <pre className="text-sm text-gray-300">
                          <code>{codeExample}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'api-reference' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-white">API Reference</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-purple-400">Base URL</h3>
                      <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                        <code className="text-blue-400">https://api.echonova.com/v1</code>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-purple-400">Authentication</h3>
                      <p className="text-gray-400 mb-4">
                        All API requests require authentication using your API key in the Authorization header.
                      </p>
                      <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                        <code className="text-gray-300">Authorization: Bearer your-api-key</code>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-purple-400">Endpoints</h3>
                      <div className="space-y-4">
                        {apiEndpoints.map((endpoint, index) => (
                          <div key={index} className="p-4 bg-black/20 rounded-lg border border-white/10">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' :
                                endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                                'bg-yellow-500/20 text-yellow-400'
                              }`}>
                                {endpoint.method}
                              </span>
                              <code className="text-gray-300">{endpoint.endpoint}</code>
                            </div>
                            <p className="text-gray-400 text-sm mb-2">{endpoint.description}</p>
                            <div className="text-xs text-gray-500">
                              Parameters: {endpoint.params.join(', ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'security' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-white">Security Guide</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-green-400">API Key Security</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>Never expose your API key in client-side code</li>
                        <li>Use environment variables to store sensitive keys</li>
                        <li>Rotate your API keys regularly</li>
                        <li>Implement proper access controls</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-green-400">Data Protection</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>All data is encrypted in transit using TLS 1.3</li>
                        <li>Files are automatically deleted after analysis</li>
                        <li>No personal data is stored permanently</li>
                        <li>Blockchain verification provides immutable proof</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-green-400">Best Practices</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>Validate file types and sizes before upload</li>
                        <li>Implement rate limiting in your applications</li>
                        <li>Use HTTPS for all API communications</li>
                        <li>Monitor your API usage and set up alerts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'blockchain' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-white">Blockchain Integration</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-400">Polygon Network</h3>
                      <p className="text-gray-400 mb-4">
                        EchoNova uses the Polygon network for fast, low-cost blockchain verification of analysis results.
                      </p>
                      <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Network:</span>
                            <span className="text-white ml-2">Polygon Mainnet</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Chain ID:</span>
                            <span className="text-white ml-2">137</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Currency:</span>
                            <span className="text-white ml-2">MATIC</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Block Time:</span>
                            <span className="text-white ml-2">~2 seconds</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-400">Smart Contract</h3>
                      <p className="text-gray-400 mb-4">
                        Our smart contract stores cryptographic hashes of analysis results, providing immutable proof of authenticity.
                      </p>
                      <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">Contract Address</span>
                          <button className="text-gray-400 hover:text-white">
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        </div>
                        <code className="text-purple-400 text-sm">0x1234567890123456789012345678901234567890</code>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-400">Verification Process</h3>
                      <ol className="list-decimal list-inside space-y-2 text-gray-400">
                        <li>Analysis results are hashed using SHA-256</li>
                        <li>Hash is stored on Polygon blockchain</li>
                        <li>Transaction provides immutable timestamp</li>
                        <li>Anyone can verify authenticity using the hash</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'examples' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-white">Code Examples</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-yellow-400">React Integration</h3>
                      <div className="bg-black/40 rounded-lg p-4 border border-white/10 overflow-x-auto">
                        <pre className="text-sm text-gray-300">
                          <code>{`import { useState } from 'react';
import { EchoNova } from '@echonova/sdk';

function DeepfakeDetector() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeFile = async (file) => {
    setLoading(true);
    try {
      const echonova = new EchoNova({
        apiKey: process.env.REACT_APP_ECHONOVA_API_KEY
      });
      
      const analysis = await echonova.analyzeFile(file);
      setResult(analysis);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="video/*"
        onChange={(e) => analyzeFile(e.target.files[0])}
      />
      {loading && <p>Analyzing...</p>}
      {result && (
        <div>
          <h3>Result: {result.isDeepfake ? 'Fake' : 'Real'}</h3>
          <p>Confidence: {result.confidence}%</p>
        </div>
      )}
    </div>
  );
}`}</code>
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-yellow-400">Node.js Backend</h3>
                      <div className="bg-black/40 rounded-lg p-4 border border-white/10 overflow-x-auto">
                        <pre className="text-sm text-gray-300">
                          <code>{`const express = require('express');
const { EchoNova } = require('@echonova/sdk');

const app = express();
const echonova = new EchoNova({
  apiKey: process.env.ECHONOVA_API_KEY
});

app.post('/analyze', async (req, res) => {
  try {
    const { fileId } = req.body;
    
    // Start analysis
    const analysis = await echonova.analyze(fileId);
    
    // Poll for results
    const results = await echonova.waitForResults(analysis.id);
    
    res.json({
      success: true,
      results: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(3000);`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default DocsSection;