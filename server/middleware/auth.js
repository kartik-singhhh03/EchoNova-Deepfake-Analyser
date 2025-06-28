import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'echonova-secret-key');
    
    // Verify user still exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'echonova-secret-key');
      req.user = decoded;
    } catch (error) {
      // Token is invalid, but we continue without authentication
      console.log('Optional auth: Invalid token, continuing without auth');
    }
  }

  next();
};