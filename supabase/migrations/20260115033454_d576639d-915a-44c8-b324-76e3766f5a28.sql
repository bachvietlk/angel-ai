-- Thêm cột wallet vào bảng profiles cho Web3 integration
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS wallet_address TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS wallet_type TEXT DEFAULT NULL;

-- Thêm comment để ghi chú
COMMENT ON COLUMN public.profiles.wallet_address IS 'Địa chỉ ví crypto của user (e.g., 0x1234...)';
COMMENT ON COLUMN public.profiles.wallet_type IS 'Loại ví: metamask, phantom, walletconnect, coinbase';