import { DEVNET, MAINNET } from "../utils/constants";

export type NETWORK_TYPE = typeof DEVNET | typeof MAINNET;

export interface Config {
  PAYER_PRIVATE_KEY: string;
  WITHDRAW_AUTHORITY: string;
  TOKEN_MINT: string;
  NETWORK: NETWORK_TYPE;
  DEVNET_RPC_URL: string;
  MAINNET_RPC_URL: string;
}
