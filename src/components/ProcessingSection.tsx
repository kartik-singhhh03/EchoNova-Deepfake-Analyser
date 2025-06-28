import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Mic, Shield, CheckCircle, Loader } from 'lucide-react';

interface ProcessingSectionProps {
  onProcessingComplete: () => void;
}

const ProcessingSection: React.FC<ProcessingSectionProps> = ({ onProcessingComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { id: 1, name: 'Extracting Frames', icon: Brain, description: 'Analyzing video frames with OpenCV' },
    { id: 2, name: 'Face Detection', icon: Brain, description: 'Running XceptionNet model' },
    { id: 3, name: 'Audio Analysis', icon: Mic, description: 'Processing with RawNet2' },
    { id: 4, name: 'Blockchain Verification', icon: Shield, description: 'Storing hash on Polygon' },
    { id: 5, name: 'Generating Report', icon: CheckCircle, description: 'Compiling results' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onProcessingComplete(), 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onProcessingComplete]);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 3000);

    return () => clearInterval(stepInterval);
  }, [steps.length]);

  // Animated waveform bars
  const WaveformBar = ({ delay = 0, height = 'h-8' }) => (
    <motion.div
      className={`bg-gradient-to-t from-purple-600 to-pink-400 ${height} w-2 rounded-full`}
      animate={{
        scaleY: [1, 1.5, 0.8, 1.2, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    />
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-4 pt-20"
    >
      <div className="max-w-4xl mx-auto w-full text-center">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Analyzing Your Video
          </h2>
          <p className="text-gray-300 text-lg">
            Our AI models are working hard to detect any deepfake content
          </p>
        </motion.div>

        {/* Animated Waveform */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-end justify-center space-x-1 mb-12 h-24"
        >
          {[...Array(20)].map((_, i) => (
            <WaveformBar 
              key={i} 
              delay={i * 0.1} 
              height={Math.random() > 0.5 ? 'h-16' : Math.random() > 0.3 ? 'h-12' : 'h-8'}
            />
          ))}
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-12"
        >
          <div className="bg-black/20 backdrop-blur-sm rounded-full p-2 border border-white/10">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                 style={{ width: `${progress}%` }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-2">{progress}% Complete</p>
        </motion.div>

        {/* Processing Steps */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const StepIcon = step.icon;

            return (
              <motion.div
                key={step.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl border transition-all duration-500 ${
                  isActive
                    ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50 shadow-neon'
                    : isCompleted
                    ? 'bg-green-500/10 border-green-500/50'
                    : 'bg-black/20 border-white/10'
                } backdrop-blur-sm`}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className={`p-3 rounded-full ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse'
                      : isCompleted
                      ? 'bg-green-500'
                      : 'bg-gray-600'
                  }`}>
                    {isActive && !isCompleted ? (
                      <Loader className="h-6 w-6 text-white animate-spin" />
                    ) : (
                      <StepIcon className="h-6 w-6 text-white" />
                    )}
                  </div>
                </div>
                
                <h3 className={`text-lg font-semibold mb-2 ${
                  isActive ? 'text-white' : isCompleted ? 'text-green-400' : 'text-gray-400'
                }`}>
                  {step.name}
                </h3>
                
                <p className="text-sm text-gray-500">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Status Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10"
        >
          <p className="text-gray-300">
            {currentStep < steps.length ? (
              <>Processing: <span className="text-purple-400 font-medium">{steps[currentStep].name}</span></>
            ) : (
              <span className="text-green-400 font-medium">Analysis Complete!</span>
            )}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProcessingSection;