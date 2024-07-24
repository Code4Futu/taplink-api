import { CHAIN_ID } from './chains';

export const CONTRACTS: Record<CHAIN_ID, any> = {
    [CHAIN_ID.ETHEREUM]: {},
    [CHAIN_ID.ARBITRUM_SEPOLIA]: {
        OTC: {
            address: '0xE0b56499b1269e9C2760d8783034DB49e3eb895A',
            deployedBlock: 30446090,
        },
    },
};

export const CHUNK_BLOCK_NUMBER: Record<CHAIN_ID, number> = {
    [CHAIN_ID.ETHEREUM]: 1000,
    [CHAIN_ID.ARBITRUM_SEPOLIA]: 1000,
};
