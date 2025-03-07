import { Connection } from "@solana/web3.js";
import { CONFIG } from "./config";
import { MAINNET } from "./constants";

function connectToRPC(): Connection {
  try {
    const rpcUrl = CONFIG.NETWORK === MAINNET ? CONFIG.MAINNET_RPC_URL : CONFIG.DEVNET_RPC_URL;

    const connection = new Connection(rpcUrl, {
      commitment: "confirmed",
    });

    return connection;
  } catch (error) {
    console.log(`Failed to connect to RPC: ${error}`);
    throw error;
  }
}

export default connectToRPC;
