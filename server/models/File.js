import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  ipfsHash: {
    type: String,
    required: true,
    unique: true
  },
  uploaderAddress: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['uploaded', 'processing', 'analyzed', 'failed'],
    default: 'uploaded'
  }
}, {
  timestamps: true
});

export default mongoose.model('File', fileSchema);