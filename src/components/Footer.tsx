import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const teamMembers = [
    {
      name: 'Kartik Singh',
      role: 'Full Stack Developer',
      github: 'https://github.com/kartik-singhhh03',
      portfolio: 'https://kartik-portfolio-sigma.vercel.app/',
      linkedin: '#'
    },
    {
      name: 'Kumwar Shaurya Pratap Singh',
      role: 'AI/ML Engineer',
      github: '#',
      portfolio: '#',
      linkedin: '#'
    },
    {
      name: 'Manish Sharma',
      role: 'Blockchain Developer',
      github: '#',
      portfolio: '#',
      linkedin: '#'
    },
    {
      name: 'Raj Singh Kharwar',
      role: 'DevOps Engineer',
      github: '#',
      portfolio: '#',
      linkedin: '#'
    }
  ];

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 mb-4"
            >
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                EchoNova
              </span>
            </motion.div>
            <p className="text-gray-400 text-sm mb-4">
              Advanced AI-powered deepfake detection with blockchain verification and decentralized storage.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:contact@echonova.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Team Members */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold mb-4 text-white">Our Team</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-black/20 rounded-lg border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                >
                  <h4 className="font-medium text-white text-sm">{member.name}</h4>
                  <p className="text-xs text-gray-400 mb-2">{member.role}</p>
                  <div className="flex space-x-2">
                    <a 
                      href={member.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Github className="h-3 w-3" />
                    </a>
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Linkedin className="h-3 w-3" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 EchoNova. Built with cutting-edge AI and blockchain technology.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;