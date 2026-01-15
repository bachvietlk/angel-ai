import { useEffect, useCallback } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { supabase } from '@/integrations/supabase/client';
import { getWalletType, formatAddress, WalletType } from '@/lib/wagmi-config';
import { useToast } from '@/hooks/use-toast';

interface UseWalletReturn {
  address: string | undefined;
  isConnected: boolean;
  walletType: WalletType | null;
  formattedAddress: string;
  disconnect: () => void;
  saveWalletToProfile: () => Promise<void>;
  removeWalletFromProfile: () => Promise<void>;
}

export const useWallet = (userId: string | undefined): UseWalletReturn => {
  const { address, isConnected, connector } = useAccount();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { toast } = useToast();

  const walletType = connector ? getWalletType(connector.name) : null;
  const formattedAddress = address ? formatAddress(address) : '';

  // Save wallet address to Supabase profile
  const saveWalletToProfile = useCallback(async () => {
    if (!userId || !address || !walletType) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          wallet_address: address,
          wallet_type: walletType,
        })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: 'Ví đã kết nối! 🎉',
        description: `Địa chỉ ${formatAddress(address)} đã được liên kết với tài khoản của bạn.`,
      });
    } catch (error) {
      console.error('Error saving wallet:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể lưu địa chỉ ví. Vui lòng thử lại.',
        variant: 'destructive',
      });
    }
  }, [userId, address, walletType, toast]);

  // Remove wallet from profile
  const removeWalletFromProfile = useCallback(async () => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          wallet_address: null,
          wallet_type: null,
        })
        .eq('user_id', userId);

      if (error) throw error;

      wagmiDisconnect();

      toast({
        title: 'Đã ngắt kết nối',
        description: 'Ví đã được gỡ khỏi tài khoản của bạn.',
      });
    } catch (error) {
      console.error('Error removing wallet:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể ngắt kết nối ví. Vui lòng thử lại.',
        variant: 'destructive',
      });
    }
  }, [userId, wagmiDisconnect, toast]);

  // Auto-save wallet when connected
  useEffect(() => {
    if (isConnected && address && userId) {
      saveWalletToProfile();
    }
  }, [isConnected, address, userId, saveWalletToProfile]);

  return {
    address,
    isConnected,
    walletType,
    formattedAddress,
    disconnect: removeWalletFromProfile,
    saveWalletToProfile,
    removeWalletFromProfile,
  };
};
