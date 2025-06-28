import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    required: true
  },
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing'
  },
  results: {
    overall: {
      isDeepfake: Boolean,
      confidence: Number,
      status: String
    },
    face: {
      confidence: Number,
      model: String,
      regions: Number,
      suspicious: Number
    },
    voice: {
      confidence: Number,
      model: String,
      segments: Number,
      anomalies: Number
    }
  },
  blockchainTxHash: String,
  resultsHash: String,
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date,
  verifiedAt: Date
}, {
  timestamps: true
});

export default mongoose.model('Analysis', analysisSchema);