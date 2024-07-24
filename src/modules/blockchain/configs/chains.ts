import sample from 'lodash/sample';

export enum CHAIN_ID {
    ETHEREUM = 1,
    // ARBITRUM_ONE = 42161,
    ARBITRUM_SEPOLIA = 421614,
    // POLYGON = 137,
    // POLYGON_MUMBAI = 80001
}

export const CHAINS: Record<
    CHAIN_ID,
    {
        isMainnet: boolean;
        name: string;
        rpcUrls: string[];
        explorerUrl: string;
    }
> = {
    [CHAIN_ID.ETHEREUM]: {
        isMainnet: true,
        name: 'Ethereum Mainnet',
        rpcUrls: [
            'https://eth.llamarpc.com',
            'https://eth-mainnet.public.blastapi.io',
            'https://eth-pokt.nodies.app',
            'https://rpc.ankr.com/eth',
        ],
        explorerUrl: 'https://etherscan.io',
    },
    [CHAIN_ID.ARBITRUM_SEPOLIA]: {
        isMainnet: false,
        name: 'Arbitrum Sepolia',
        rpcUrls: [
            'https://public.stackup.sh/api/v1/node/arbitrum-sepolia',
            'https://arbitrum-sepolia.blockpi.network/v1/rpc/public',
        ],
        explorerUrl: 'https://sepolia.arbiscan.io/',
    },
};

export const randomRPC = (rpcUrls: string[]) => sample(rpcUrls);
