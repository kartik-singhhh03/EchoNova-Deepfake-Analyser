import { Web3Storage } from 'web3.storage';

// Initialize Web3.Storage client
const client = new Web3Storage({ 
  token: process.env.WEB3_STORAGE_TOKEN || 'your-web3-storage-token-here'
});

export const uploadToIPFS = async (buffer, filename, mimetype) => {
  try {
    // Create a file object from the buffer
    const file = new File([buffer], filename, { type: mimetype });
    
    // Upload to IPFS via Web3.Storage
    const cid = await client.put([file], {
      name: filename,
      maxRetries: 3
    });

    console.log(`📦 File uploaded to IPFS: ${cid}`);
    return cid;

  } catch (error) {
    console.error('IPFS upload error:', error);
    throw new Error(`Failed to upload to IPFS: ${error.message}`);
  }
};

export const getFromIPFS = async (cid) => {
  try {
    const res = await client.get(cid);
    
    if (!res.ok) {
      throw new Error(`Failed to get file from IPFS: ${res.status}`);
    }

    return res;
  } catch (error) {
    console.error('IPFS retrieval error:', error);
    throw new Error(`Failed to retrieve from IPFS: ${error.message}`);
  }
};

export const getIPFSUrl = (cid, filename = '') => {
  return `https://${cid}.ipfs.w3s.link/${filename}`;
};