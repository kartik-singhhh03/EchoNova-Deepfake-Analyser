import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { walletAddress, email, username } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ walletAddress }, { email }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: 'User already exists with this wallet address or email' 
      });
    }

    // Create new user
    const user = new User({
      walletAddress,
      email,
      username,
      createdAt: new Date()
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, walletAddress: user.walletAddress },
      process.env.JWT_SECRET || 'echonova-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        walletAddress: user.walletAddress,
        email: user.email,
        username: user.username
      },
      token
    });

  } catch (error) {
    console.error('User registration error:', error);
    res.status(500).json({ 
      error: 'Failed to register user',
      message: error.message 
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { walletAddress } = req.body;

    // Find user by wallet address
    const user = await User.findOne({ walletAddress });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, walletAddress: user.walletAddress },
      process.env.JWT_SECRET || 'echonova-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      user: {
        id: user._id,
        walletAddress: user.walletAddress,
        email: user.email,
        username: user.username
      },
      token
    });

  } catch (error) {
    console.error('User login error:', error);
    res.status(500).json({ 
      error: 'Failed to login user',
      message: error.message 
    });
  }
});

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-__v')
      .populate('analysisHistory');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ error: 'Failed to retrieve user profile' });
  }
});

export default router;