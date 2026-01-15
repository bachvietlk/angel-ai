import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base, bsc } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Angel AI - FUN Wallet',
  projectId: 'angel-ai-web3', // WalletConnect Cloud Project ID (can be any string for dev)
  chains: [mainnet, polygon, optimism, arbitrum, base, bsc],
  ssr: false,
});

// Supported wallet types
export type WalletType = 'metamask' | 'walletconnect' | 'coinbase' | 'rainbow' | 'other';

// Format wallet address for display
export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Get wallet type from connector name
export const getWalletType = (connectorName: string): WalletType => {
  const name = connectorName.toLowerCase();
  if (name.includes('metamask')) return 'metamask';
  if (name.includes('walletconnect')) return 'walletconnect';
  if (name.includes('coinbase')) return 'coinbase';
  if (name.includes('rainbow')) return 'rainbow';
  return 'other';
};
