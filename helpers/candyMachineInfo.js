export const candyMachineAddress = "0x60400219f26cf62d55f0870789e77218aca068b92c6bf7c6f0e1e8d4b8220acd";
export const collectionName = "Aptos Collection2"; // Case sensitive!
export const collectionCoverUrl = "https://cloudflare-ipfs.com/ipfs/QmSaJd6HnSZkjqpq1yL41JCAzPPyhkTdpgiy82Q2KKfdoM";
export const mode = "test"; // "dev" or "test" or "mainnet"

export let NODE_URL;
export const CONTRACT_ADDRESS = "0xc17197699c1a5c2d594bda3482e06cda9a7fe87378cbaec2b55aacd03e3f45d3";
export const COLLECTION_SIZE = 10
let FAUCET_URL;
if (mode == "dev") {
    NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1";
    FAUCET_URL = "https://faucet.devnet.aptoslabs.com";
} else if (mode === "test") {
    NODE_URL = "https://fullnode.testnet.aptoslabs.com/v1";
    FAUCET_URL = "https://faucet.testnet.aptoslabs.com";
} else {
    NODE_URL = "https://fullnode.mainnet.aptoslabs.com/v1";
    FAUCET_URL = null;
}
