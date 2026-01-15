import { motion } from 'framer-motion';
import { Wallet, Copy, ExternalLink, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { formatAddress } from '@/lib/wagmi-config';
import { useToast } from '@/hooks/use-toast';

interface WalletDisplayProps {
  address: string | null;
  walletType: string | null;
  compact?: boolean;
}

export const WalletDisplay = ({ address, walletType, compact = false }: WalletDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  if (!address) {
    return (
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <Wallet className="w-4 h-4" />
        <span>Chưa kết nối ví</span>
      </div>
    );
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    toast({
      title: 'Đã sao chép!',
      description: 'Địa chỉ ví đã được sao chép vào clipboard.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const openExplorer = () => {
    window.open(`https://etherscan.io/address/${address}`, '_blank');
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30"
      >
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
          <Wallet className="w-2.5 h-2.5 text-background" />
        </div>
        <span className="text-xs font-mono text-gold-dark">{formatAddress(address)}</span>
        <CheckCircle className="w-3 h-3 text-green-500" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/50 rounded-2xl p-4 border border-gold/20"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center glow-box-soft">
          <Wallet className="w-5 h-5 text-background" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gold-dark capitalize">
              {walletType || 'Wallet'}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-xs">
              <CheckCircle className="w-3 h-3" />
              Đã kết nối
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-mono">
            {formatAddress(address)}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="flex-1 text-xs"
        >
          {copied ? (
            <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
          ) : (
            <Copy className="w-3 h-3 mr-1" />
          )}
          {copied ? 'Đã sao chép' : 'Sao chép'}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={openExplorer}
          className="flex-1 text-xs"
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          Xem trên Etherscan
        </Button>
      </div>
    </motion.div>
  );
};
