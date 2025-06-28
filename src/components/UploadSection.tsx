import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, Play, FileVideo, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { useFile } from '../contexts/FileContext';
import toast from 'react-hot-toast';
import ReactPlayer from 'react-player';

interface UploadSectionProps {
  onUploadComplete: () => void;
  onBack: () => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onUploadComplete, onBack }) => {
  const { setFile } = useFile();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      setFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      toast.success('File uploaded successfully!');
    }
  }, [setFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv']
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    
    setIsUploading(true);
    toast.loading('Preparing for analysis...');
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      toast.dismiss();
      toast.success('Ready for analysis!');
      onUploadComplete();
    }, 2000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen flex items-center justify-center px-4 pt-20"
    >
      <div className="max-w-4xl mx-auto w-full">
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
            <span>Back to Home</span>
          </button>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Upload Your Video
          </h2>
          <p className="text-gray-300 text-lg">
            Upload a video file to detect potential deepfake content
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div
              {...getRootProps()}
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                isDragActive
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-600 hover:border-purple-500 hover:bg-purple-500/5'
              }`}
            >
              <input {...getInputProps()} />
              
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {isDragActive ? 'Drop your video here' : 'Drag & drop your video'}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    or <span className="text-purple-400 font-medium">browse files</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports MP4, MOV, AVI, MKV up to 100MB
                  </p>
                </div>
              </div>
            </div>

            {/* File Info */}
            {uploadedFile && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-green-500/50"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <FileVideo className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-400">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Check className="h-5 w-5 text-green-400" />
                </div>
              </motion.div>
            )}

            {/* Analyze Button */}
            {uploadedFile && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyze}
                disabled={isUploading}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl border border-purple-500/50 shadow-neon hover:shadow-neon-pink transition-all duration-300 text-lg font-semibold disabled:opacity-50"
              >
                <Play className="h-5 w-5" />
                <span>{isUploading ? 'Preparing...' : 'Analyze Video'}</span>
              </motion.button>
            )}
          </motion.div>

          {/* Preview Area */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-4">Preview</h3>
            
            <div className="aspect-video bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              {previewUrl ? (
                <ReactPlayer
                  url={previewUrl}
                  width="100%"
                  height="100%"
                  controls
                  style={{ borderRadius: '1rem' }}
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-500">Video preview will appear here</p>
                  </div>
                </div>
              )}
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium">Detection Models</span>
                </div>
                <p className="text-xs text-gray-400">XceptionNet + RawNet2</p>
              </div>
              
              <div className="p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-medium">Blockchain</span>
                </div>
                <p className="text-xs text-gray-400">Polygon Network</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default UploadSection;