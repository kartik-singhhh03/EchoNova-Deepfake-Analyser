import express from 'express';
import { ethers } from 'ethers';
import Analysis from '../models/Analysis.js';
import { verifyOnChain, storeHashOnChain } from '../services/blockchain.js';

const router = express.Router();

// Store analysis hash on blockchain
router.post('/verify', async (req, res) => {
  try {
    const { analysisId, walletAddress } = req.body;

    const analysis = await Analysis.findById(analysisId);
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    if (analysis.status !== 'completed') {
      return res.status(400).json({ error: 'Analysis not completed yet' });
    }

    // Generate hash of the analysis results
    const resultsHash = ethers.keccak256(
      ethers.toUtf8Bytes(JSON.stringify(analysis.results))
    );

    // Store hash on blockchain
    const transaction = await storeHashOnChain(resultsHash, walletAddress);

    // Update analysis with blockchain info
    analysis.blockchainTxHash = transaction.hash;
    analysis.resultsHash = resultsHash;
    analysis.verifiedAt = new Date();
    await analysis.save();

    res.json({
      success: true,
      transactionHash: transaction.hash,
      resultsHash: resultsHash,
      message: 'Analysis results verified on blockchain'
    });

  } catch (error) {
    console.error('Blockchain verification error:', error);
    res.status(500).json({ 
      error: 'Failed to verify on blockchain',
      message: error.message 
    });
  }
});

// Verify analysis authenticity
router.get('/verify/:analysisId', async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.analysisId);
    
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    if (!analysis.blockchainTxHash) {
      return res.status(400).json({ error: 'Analysis not yet verified on blockchain' });
    }

    // Verify the transaction and hash on blockchain
    const isValid = await verifyOnChain(analysis.blockchainTxHash, analysis.resultsHash);

    res.json({
      success: true,
      isValid: isValid,
      transactionHash: analysis.blockchainTxHash,
      resultsHash: analysis.resultsHash,
      verifiedAt: analysis.verifiedAt
    });

  } catch (error) {
    console.error('Blockchain verification check error:', error);
    res.status(500).json({ error: 'Failed to verify blockchain authenticity' });
  }
});

export default router;