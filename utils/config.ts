import { Config, NETWORK_TYPE } from "../interfaces/interfaces";
import { DEVNET, MAINNET } from "./constants";

export const CONFIG: Config = {
  PAYER_PRIVATE_KEY: getEnvVar("PAYER_PRIVATE_KEY"),
  WITHDRAW_AUTHORITY: getEnvVar("WITHDRAW_AUTHORITY"),
  TOKEN_MINT: getEnvVar("TOKEN_MINT"),
  NETWORK: getNetworkEnv(),
  DEVNET_RPC_URL: getEnvVar("DEVNET_RPC_URL"),
  MAINNET_RPC_URL: getEnvVar("MAINNET_RPC_URL"),
};

// Function to validate environment variables
function getEnvVar(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}

// Validate NETWORK specifically to match the NETWORK_TYPE
function getNetworkEnv(): NETWORK_TYPE {
  const network = getEnvVar("NETWORK");
  if (network !== DEVNET && network !== MAINNET) {
    throw new Error(`Invalid NETWORK value: ${network}. Must be either "${DEVNET}" or "${MAINNET}"`);
  }
  return network as NETWORK_TYPE;
}
