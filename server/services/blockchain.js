import { ethers } from 'ethers';

// Initialize provider (using Polygon)
const provider = new ethers.JsonRpcProvider(
  process.env.POLYGON_RPC_URL || 'https://polygon-rpc.com'
);

// Smart contract ABI and address (simplified for demo)
const contractABI = [
  "function storeHash(string memory fileHash) public",
  "function getHash(address user, uint256 index) public view returns (string memory)",
  "function getHashCount(address user) public view returns (uint256)",
  "event HashStored(address indexed user, string fileHash, uint256 timestamp)"
];

const contractAddress = process.env.CONTRACT_ADDRESS || "0x1234567890123456789012345678901234567890";

export const storeHashOnChain = async (hash, walletAddress) => {
  try {
    // Create wallet instance
    const wallet = new ethers.Wallet(
      process.env.PRIVATE_KEY || 'your-private-key-here',
      provider
    );

    // Create contract instance
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    // Store hash on blockchain
    const transaction = await contract.storeHash(hash);
    await transaction.wait();

    console.log(`⛓️ Hash stored on blockchain: ${transaction.hash}`);
    return transaction;

  } catch (error) {
    console.error('Blockchain storage error:', error);
    throw new Error(`Failed to store on blockchain: ${error.message}`);
  }
};

export const verifyOnChain = async (txHash, expectedHash) => {
  try {
    // Get transaction details
    const transaction = await provider.getTransaction(txHash);
    
    if (!transaction) {
      return false;
    }

    // Verify transaction is confirmed
    const receipt = await provider.getTransactionReceipt(txHash);
    
    if (!receipt || receipt.status !== 1) {
      return false;
    }

    // In a real implementation, you would decode the transaction data
    // and verify the hash matches what was stored
    console.log(`✅ Transaction verified: ${txHash}`);
    return true;

  } catch (error) {
    console.error('Blockchain verification error:', error);
    return false;
  }
};

export const getStoredHashes = async (walletAddress) => {
  try {
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    
    const count = await contract.getHashCount(walletAddress);
    const hashes = [];

    for (let i = 0; i < count; i++) {
      const hash = await contract.getHash(walletAddress, i);
      hashes.push(hash);
    }

    return hashes;
  } catch (error) {
    console.error('Get stored hashes error:', error);
    throw new Error(`Failed to retrieve stored hashes: ${error.message}`);
  }
};