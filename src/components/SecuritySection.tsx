import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Key, Eye, Server, Globe, CheckCircle } from 'lucide-react';

interface SecuritySectionProps {
  onBack: () => void;
}

const SecuritySection: React.FC<SecuritySectionProps> = ({ onBack }) => {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All data is encrypted using AES-256 encryption both in transit and at rest',
      details: ['AES-256 encryption', 'TLS 1.3 for transport', 'Zero-knowledge architecture']
    },
    {
      icon: Key,
      title: 'Non-Custodial Wallet',
      description: 'Your private keys never leave your device. We never have access to your funds',
      details: ['Client-side key generation', 'Hardware wallet support', 'Multi-signature options']
    },
    {
      icon: Shield,
      title: 'Blockchain Immutability',
      description: 'Results are cryptographically secured and tamper-proof on the blockchain',
      details: ['Immutable records', 'Cryptographic proofs', 'Decentralized verification']
    },
    {
      icon: Eye,
      title: 'Privacy by Design',
      description: 'No personal data collection, minimal metadata, and automatic data deletion',
      details: ['No user tracking', 'Minimal data collection', 'Automatic cleanup']
    },
    {
      icon: Server,
      title: 'Secure Infrastructure',
      description: 'Enterprise-grade security with regular audits and penetration testing',
      details: ['SOC 2 compliance', 'Regular security audits', 'Penetration testing']
    },
    {
      icon: Globe,
      title: 'Decentralized Storage',
      description: 'Files stored on IPFS network, distributed across multiple nodes globally',
      details: ['Distributed storage', 'No single point of failure', 'Content addressing']
    }
  ];

  const certifications = [
    { name: 'SOC 2 Type II', status: 'Certified' },
    { name: 'ISO 27001', status: 'In Progress' },
    { name: 'GDPR Compliant', status: 'Certified' },
    { name: 'CCPA Compliant', status: 'Certified' }
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
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Security First
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your security and privacy are our top priorities. Learn about the comprehensive measures we take to protect your data and ensure platform integrity.
          </p>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-8 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-green-500/50 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center space-x-2 text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Compliance & Certifications */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          <div className="p-8 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Compliance & Certifications
            </h2>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={cert.name} className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10">
                  <span className="font-medium text-white">{cert.name}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    cert.status === 'Certified' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                  }`}>
                    {cert.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Security Practices
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <div className="font-medium text-white">Regular Security Audits</div>
                  <div className="text-sm text-gray-400">Quarterly third-party security assessments</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <div className="font-medium text-white">Penetration Testing</div>
                  <div className="text-sm text-gray-400">Monthly ethical hacking assessments</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <div className="font-medium text-white">Bug Bounty Program</div>
                  <div className="text-sm text-gray-400">Rewards for responsible disclosure</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <div className="font-medium text-white">24/7 Monitoring</div>
                  <div className="text-sm text-gray-400">Continuous threat detection and response</div>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Security Architecture */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="p-8 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10"
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Security Architecture
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                <Lock className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Client-Side Encryption</h3>
              <p className="text-gray-400 text-sm">Data encrypted before leaving your device</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full">
                <Server className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Secure Processing</h3>
              <p className="text-gray-400 text-sm">Isolated environments with zero data retention</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <Shield className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Blockchain Verification</h3>
              <p className="text-gray-400 text-sm">Immutable proof stored on decentralized network</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SecuritySection;