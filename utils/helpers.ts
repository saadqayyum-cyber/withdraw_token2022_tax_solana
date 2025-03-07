import { Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

export function getPublicKeyFromBase58(address: string): PublicKey {
  try {
    return new PublicKey(address);
  } catch (error) {
    console.log(`Failed to create public key from address: ${address} ${error}`);
    throw error;
  }
}

export function createKeypairFromBase58(privateKeyBase58: string): Keypair {
  try {
    // Decode the base58 private key to a Uint8Array (secret key bytes)
    const secretKeyBytes = bs58.decode(privateKeyBase58);

    // Create and return the Solana keypair from the secret key bytes
    return Keypair.fromSecretKey(secretKeyBytes);
  } catch (error) {
    console.error("Failed to create keypair from base58 string:", error);
    throw error;
  }
}

function createKeypairFromSecretKeyBytes(secretKeyBytes: number[]): Keypair {
  const secretKey = Uint8Array.from(secretKeyBytes);
  const keypair = Keypair.fromSecretKey(secretKey);
  return keypair;
}

function createPrivateKeyInBase58FormatFromSecretKeyBytes(secretKeyBytes: number[]) {
  return bs58.encode(secretKeyBytes);
}
