import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import { Wallet, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/useWallet';

interface WalletConnectProps {
  userId: string | undefined;
}

export const WalletConnect = ({ userId }: WalletConnectProps) => {
  const { isConnected, formattedAddress, walletType, disconnect } = useWallet(userId);

  return (
    <div className="space-y-4">
      {isConnected ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card/50 rounded-2xl p-4 border border-gold/30"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                <Wallet className="w-5 h-5 text-background" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gold-dark capitalize">
                    {walletType || 'Wallet'}
                  </span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-sm text-muted-foreground font-mono">
                  {formattedAddress}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={disconnect}
              className="text-muted-foreground hover:text-destructive"
            >
              Ngắt kết nối
            </Button>
          </div>
        </motion.div>
      ) : (
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            const ready = mounted && authenticationStatus !== 'loading';
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus || authenticationStatus === 'authenticated');

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  style: {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <motion.button
                        onClick={openConnectModal}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-gold via-gold-light to-gold text-background font-display glow-box-soft transition-all"
                      >
                        <Wallet className="w-5 h-5" />
                        Kết nối ví Web3
                      </motion.button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <Button
                        onClick={openChainModal}
                        variant="destructive"
                        className="w-full"
                      >
                        Mạng không hỗ trợ
                      </Button>
                    );
                  }

                  return (
                    <div className="flex gap-2">
                      <Button
                        onClick={openChainModal}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 20,
                              height: 20,
                              borderRadius: 999,
                              overflow: 'hidden',
                            }}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                                style={{ width: 20, height: 20 }}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </Button>

                      <Button
                        onClick={openAccountModal}
                        className="flex items-center gap-2"
                      >
                        {account.displayName}
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Hỗ trợ: MetaMask, WalletConnect, Coinbase, Rainbow và nhiều ví khác
      </p>
    </div>
  );
};
