import express from 'express';
import multer from 'multer';
import { Web3Storage } from 'web3.storage';
import File from '../models/File.js';
import { uploadToIPFS } from '../services/ipfs.js';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept video files only
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed!'), false);
    }
  }
});

// Upload video file
router.post('/', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file provided' });
    }

    const { originalname, mimetype, size, buffer } = req.file;
    const { walletAddress } = req.body;

    console.log(`📁 Uploading file: ${originalname} (${(size / 1024 / 1024).toFixed(2)}MB)`);

    // Upload to IPFS
    const ipfsHash = await uploadToIPFS(buffer, originalname, mimetype);
    
    // Save file metadata to database
    const fileRecord = new File({
      originalName: originalname,
      mimeType: mimetype,
      size: size,
      ipfsHash: ipfsHash,
      uploaderAddress: walletAddress,
      uploadedAt: new Date(),
      status: 'uploaded'
    });

    await fileRecord.save();

    res.json({
      success: true,
      fileId: fileRecord._id,
      ipfsHash: ipfsHash,
      message: 'File uploaded successfully to IPFS'
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      error: 'Failed to upload file',
      message: error.message 
    });
  }
});

// Get file metadata
router.get('/:fileId', async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);
    
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.json(file);
  } catch (error) {
    console.error('Get file error:', error);
    res.status(500).json({ error: 'Failed to retrieve file' });
  }
});

export default router;