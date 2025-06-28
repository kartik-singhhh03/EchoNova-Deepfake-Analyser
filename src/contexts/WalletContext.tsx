import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

interface WalletContextType {
  walletAddress: string | null;
  isConnecting: boolean;
  provider: ethers.BrowserProvider | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  const connectWallet = async () => {
    if (typeof (window as any).ethereum === 'undefined') {
      toast.error('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    setIsConnecting(true);
    try {
      const ethereum = (window as any).ethereum;
      const provider = new ethers.BrowserProvider(ethereum);
      
      // Request account access
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setProvider(provider);
        toast.success('Wallet connected successfully!');
        
        // Switch to Polygon network if not already on it
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x89' }], // Polygon Mainnet
          });
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x89',
                    chainName: 'Polygon Mainnet',
                    nativeCurrency: {
                      name: 'MATIC',
                      symbol: 'MATIC',
                      decimals: 18,
                    },
                    rpcUrls: ['https://polygon-rpc.com/'],
                    blockExplorerUrls: ['https://polygonscan.com/'],
                  },
                ],
              });
            } catch (addError) {
              console.error('Failed to add Polygon network:', addError);
            }
          }
        }
      }
    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setProvider(null);
    toast.success('Wallet disconnected');
  };

  // Check if wallet is already connected on page load
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof (window as any).ethereum !== 'undefined') {
        try {
          const ethereum = (window as any).ethereum;
          const provider = new ethers.BrowserProvider(ethereum);
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            setWalletAddress(accounts[0].address);
            setProvider(provider);
          }
        } catch (error) {
          console.error('Failed to check wallet connection:', error);
        }
      }
    };

    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof (window as any).ethereum !== 'undefined') {
      const ethereum = (window as any).ethereum;
      
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setWalletAddress(accounts[0]);
        }
      };

      ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  const value: WalletContextType = {
    walletAddress,
    isConnecting,
    provider,
    connectWallet,
    disconnectWallet,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};