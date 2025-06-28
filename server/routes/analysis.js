import express from 'express';
import axios from 'axios';
import File from '../models/File.js';
import Analysis from '../models/Analysis.js';

const router = express.Router();

// Start analysis for a file
router.post('/start', async (req, res) => {
  try {
    const { fileId } = req.body;

    // Get file from database
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Update file status
    file.status = 'processing';
    await file.save();

    // Create analysis record
    const analysis = new Analysis({
      fileId: fileId,
      status: 'processing',
      startedAt: new Date()
    });
    await analysis.save();

    // Send file to ML service for processing
    const mlServiceUrl = process.env.ML_SERVICE_URL || 'http://localhost:5001';
    
    try {
      const response = await axios.post(`${mlServiceUrl}/analyze`, {
        fileId: fileId,
        ipfsHash: file.ipfsHash,
        filename: file.originalName
      }, {
        timeout: 300000 // 5 minutes timeout
      });

      console.log('🤖 ML Service response:', response.data);
    } catch (mlError) {
      console.error('ML Service error:', mlError.message);
      // Continue with mock data for demo purposes
    }

    res.json({
      success: true,
      analysisId: analysis._id,
      message: 'Analysis started successfully'
    });

  } catch (error) {
    console.error('Analysis start error:', error);
    res.status(500).json({ 
      error: 'Failed to start analysis',
      message: error.message 
    });
  }
});

// Get analysis status
router.get('/status/:analysisId', async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.analysisId).populate('fileId');
    
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    res.json(analysis);
  } catch (error) {
    console.error('Get analysis status error:', error);
    res.status(500).json({ error: 'Failed to retrieve analysis status' });
  }
});

// Get analysis results
router.get('/results/:analysisId', async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.analysisId).populate('fileId');
    
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    if (analysis.status !== 'completed') {
      return res.status(400).json({ error: 'Analysis not yet completed' });
    }

    res.json({
      success: true,
      results: analysis.results,
      file: analysis.fileId
    });
  } catch (error) {
    console.error('Get analysis results error:', error);
    res.status(500).json({ error: 'Failed to retrieve analysis results' });
  }
});

// Webhook endpoint for ML service to update results
router.post('/webhook/results', async (req, res) => {
  try {
    const { analysisId, results, status } = req.body;

    const analysis = await Analysis.findById(analysisId);
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    // Update analysis with results
    analysis.results = results;
    analysis.status = status;
    analysis.completedAt = new Date();
    await analysis.save();

    // Update file status
    const file = await File.findById(analysis.fileId);
    if (file) {
      file.status = status === 'completed' ? 'analyzed' : 'failed';
      await file.save();
    }

    console.log(`✅ Analysis ${analysisId} updated with results`);
    res.json({ success: true });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Failed to update analysis results' });
  }
});

export default router;