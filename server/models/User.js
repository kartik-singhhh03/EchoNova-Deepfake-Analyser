import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  analysisHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Analysis'
  }],
  subscription: {
    type: String,
    enum: ['free', 'pro', 'enterprise'],
    default: 'free'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);