#!/usr/bin/env python3
"""
EchoNova ML Service
Advanced AI-powered deepfake detection service using XceptionNet and RawNet2
"""

import os
import sys
import json
import time
import logging
from pathlib import Path
from typing import Dict, Any, Tuple, Optional

import cv2
import numpy as np
import librosa
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from sklearn.preprocessing import StandardScaler
import threading
import queue

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configuration
ML_SERVICE_PORT = int(os.getenv('ML_SERVICE_PORT', 5001))
SERVER_URL = os.getenv('SERVER_URL', 'http://localhost:5000')
MODEL_DIR = Path('models')
TEMP_DIR = Path('temp')

# Create directories
MODEL_DIR.mkdir(exist_ok=True)
TEMP_DIR.mkdir(exist_ok=True)

class DeepfakeDetector:
    """
    Advanced deepfake detection system combining multiple AI models
    """
    
    def __init__(self):
        self.face_model = None
        self.voice_model = None
        self.is_loaded = False
        self.load_models()
    
    def load_models(self):
        """Load pretrained models for face and voice detection"""
        try:
            logger.info("🤖 Loading AI models...")
            
            # In a real implementation, you would load actual pretrained models
            # For demo purposes, we'll create mock models
            
            # Mock XceptionNet for face detection
            self.face_model = self._create_mock_face_model()
            
            # Mock RawNet2 for voice detection  
            self.voice_model = self._create_mock_voice_model()
            
            self.is_loaded = True
            logger.info("✅ Models loaded successfully")
            
        except Exception as e:
            logger.error(f"❌ Failed to load models: {e}")
            self.is_loaded = False
    
    def _create_mock_face_model(self):
        """Create a mock face detection model (replace with actual XceptionNet)"""
        # In production, load actual XceptionNet model:
        # model = tf.keras.models.load_model('models/xceptionnet_deepfake.h5')
        return "mock_xceptionnet_model"
    
    def _create_mock_voice_model(self):
        """Create a mock voice detection model (replace with actual RawNet2)"""
        # In production, load actual RawNet2 model:
        # model = tf.keras.models.load_model('models/rawnet2_deepfake.h5')
        return "mock_rawnet2_model"
    
    def extract_frames(self, video_path: str, max_frames: int = 30) -> np.ndarray:
        """Extract frames from video for face analysis"""
        try:
            cap = cv2.VideoCapture(video_path)
            frames = []
            
            total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
            frame_interval = max(1, total_frames // max_frames)
            
            frame_count = 0
            while cap.isOpened() and len(frames) < max_frames:
                ret, frame = cap.read()
                if not ret:
                    break
                
                if frame_count % frame_interval == 0:
                    # Resize frame for model input
                    frame_resized = cv2.resize(frame, (224, 224))
                    frames.append(frame_resized)
                
                frame_count += 1
            
            cap.release()
            
            if not frames:
                raise ValueError("No frames extracted from video")
            
            return np.array(frames)
            
        except Exception as e:
            logger.error(f"Frame extraction error: {e}")
            raise
    
    def extract_audio(self, video_path: str) -> Tuple[np.ndarray, int]:
        """Extract audio from video for voice analysis"""
        try:
            # Extract audio using librosa
            audio, sr = librosa.load(video_path, sr=16000)
            
            if len(audio) == 0:
                raise ValueError("No audio extracted from video")
            
            return audio, sr
            
        except Exception as e:
            logger.error(f"Audio extraction error: {e}")
            raise
    
    def detect_face_deepfake(self, frames: np.ndarray) -> Dict[str, Any]:
        """Analyze frames for face deepfake detection"""
        try:
            # In production, this would use actual XceptionNet model
            # predictions = self.face_model.predict(frames)
            
            # Mock analysis for demo
            num_frames = len(frames)
            
            # Simulate processing time
            time.sleep(2)
            
            # Generate realistic mock results
            confidence = np.random.uniform(85, 98)
            is_deepfake = confidence < 90  # Threshold for deepfake detection
            
            results = {
                'confidence': float(confidence),
                'is_deepfake': is_deepfake,
                'model': 'XceptionNet',
                'regions_analyzed': num_frames,
                'suspicious_regions': 0 if not is_deepfake else np.random.randint(1, 3),
                'processing_time': 2.1
            }
            
            logger.info(f"👤 Face analysis complete: {confidence:.1f}% confidence")
            return results
            
        except Exception as e:
            logger.error(f"Face detection error: {e}")
            raise
    
    def detect_voice_deepfake(self, audio: np.ndarray, sr: int) -> Dict[str, Any]:
        """Analyze audio for voice deepfake detection"""
        try:
            # In production, this would use actual RawNet2 model
            # features = self._extract_audio_features(audio, sr)
            # predictions = self.voice_model.predict(features)
            
            # Mock analysis for demo
            duration = len(audio) / sr
            segments = max(1, int(duration // 2))  # 2-second segments
            
            # Simulate processing time
            time.sleep(1.5)
            
            # Generate realistic mock results
            confidence = np.random.uniform(88, 96)
            is_deepfake = confidence < 92  # Threshold for deepfake detection
            
            results = {
                'confidence': float(confidence),
                'is_deepfake': is_deepfake,
                'model': 'RawNet2',
                'segments_processed': segments,
                'anomalies_detected': 0 if not is_deepfake else np.random.randint(1, 2),
                'processing_time': 1.5,
                'audio_duration': duration
            }
            
            logger.info(f"🎵 Voice analysis complete: {confidence:.1f}% confidence")
            return results
            
        except Exception as e:
            logger.error(f"Voice detection error: {e}")
            raise
    
    def analyze_video(self, video_path: str) -> Dict[str, Any]:
        """Complete video analysis combining face and voice detection"""
        try:
            if not self.is_loaded:
                raise RuntimeError("Models not loaded")
            
            logger.info(f"🎬 Starting analysis of: {video_path}")
            start_time = time.time()
            
            # Extract frames and audio
            frames = self.extract_frames(video_path)
            audio, sr = self.extract_audio(video_path)
            
            # Perform face and voice analysis
            face_results = self.detect_face_deepfake(frames)
            voice_results = self.detect_voice_deepfake(audio, sr)
            
            # Combine results
            overall_confidence = (face_results['confidence'] + voice_results['confidence']) / 2
            is_deepfake = face_results['is_deepfake'] or voice_results['is_deepfake']
            
            # Determine overall status
            if is_deepfake:
                status = "Deepfake Detected"
            else:
                status = "Verified Real"
            
            total_time = time.time() - start_time
            
            results = {
                'overall': {
                    'is_deepfake': is_deepfake,
                    'confidence': float(overall_confidence),
                    'status': status
                },
                'face': {
                    'confidence': face_results['confidence'],
                    'model': face_results['model'],
                    'regions': face_results['regions_analyzed'],
                    'suspicious': face_results['suspicious_regions']
                },
                'voice': {
                    'confidence': voice_results['confidence'],
                    'model': voice_results['model'],
                    'segments': voice_results['segments_processed'],
                    'anomalies': voice_results['anomalies_detected']
                },
                'metadata': {
                    'processing_time': float(total_time),
                    'timestamp': time.time(),
                    'model_versions': {
                        'face': 'XceptionNet-v2.1',
                        'voice': 'RawNet2-v1.8'
                    }
                }
            }
            
            logger.info(f"✅ Analysis complete in {total_time:.2f}s: {status}")
            return results
            
        except Exception as e:
            logger.error(f"Video analysis error: {e}")
            raise

# Initialize detector
detector = DeepfakeDetector()

# Processing queue for handling multiple requests
processing_queue = queue.Queue()
processing_thread = None

def process_analysis_queue():
    """Background thread to process analysis requests"""
    while True:
        try:
            task = processing_queue.get(timeout=1)
            if task is None:  # Shutdown signal
                break
            
            file_id, video_path, callback_url = task
            
            # Perform analysis
            results = detector.analyze_video(video_path)
            
            # Send results back to server
            response_data = {
                'analysisId': file_id,
                'results': results,
                'status': 'completed'
            }
            
            try:
                response = requests.post(
                    f"{SERVER_URL}/api/analysis/webhook/results",
                    json=response_data,
                    timeout=30
                )
                response.raise_for_status()
                logger.info(f"✅ Results sent to server for analysis {file_id}")
            except requests.RequestException as e:
                logger.error(f"❌ Failed to send results to server: {e}")
            
            # Clean up temporary file
            try:
                os.remove(video_path)
            except OSError:
                pass
            
            processing_queue.task_done()
            
        except queue.Empty:
            continue
        except Exception as e:
            logger.error(f"Processing queue error: {e}")
            processing_queue.task_done()

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'OK',
        'service': 'EchoNova ML Service',
        'models_loaded': detector.is_loaded,
        'timestamp': time.time()
    })

@app.route('/analyze', methods=['POST'])
def analyze_video():
    """Analyze video for deepfake detection"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        file_id = data.get('fileId')
        ipfs_hash = data.get('ipfsHash')
        filename = data.get('filename')
        
        if not all([file_id, ipfs_hash, filename]):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Download file from IPFS (mock for demo)
        video_path = TEMP_DIR / f"{file_id}_{filename}"
        
        # In production, download from IPFS:
        # ipfs_url = f"https://{ipfs_hash}.ipfs.w3s.link/{filename}"
        # response = requests.get(ipfs_url)
        # with open(video_path, 'wb') as f:
        #     f.write(response.content)
        
        # For demo, create a mock video file
        with open(video_path, 'wb') as f:
            f.write(b'mock_video_data')
        
        # Add to processing queue
        callback_url = f"{SERVER_URL}/api/analysis/webhook/results"
        processing_queue.put((file_id, str(video_path), callback_url))
        
        return jsonify({
            'success': True,
            'message': 'Video queued for analysis',
            'file_id': file_id
        })
        
    except Exception as e:
        logger.error(f"Analysis request error: {e}")
        return jsonify({
            'error': 'Failed to process analysis request',
            'message': str(e)
        }), 500

@app.route('/models/status', methods=['GET'])
def models_status():
    """Get status of loaded models"""
    return jsonify({
        'models_loaded': detector.is_loaded,
        'face_model': 'XceptionNet' if detector.face_model else None,
        'voice_model': 'RawNet2' if detector.voice_model else None,
        'supported_formats': ['mp4', 'mov', 'avi', 'mkv'],
        'max_file_size': '100MB'
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    # Start background processing thread
    processing_thread = threading.Thread(target=process_analysis_queue, daemon=True)
    processing_thread.start()
    
    logger.info(f"🚀 EchoNova ML Service starting on port {ML_SERVICE_PORT}")
    logger.info(f"📊 Server URL: {SERVER_URL}")
    logger.info(f"🤖 Models loaded: {detector.is_loaded}")
    
    app.run(
        host='0.0.0.0',
        port=ML_SERVICE_PORT,
        debug=False,
        threaded=True
    )