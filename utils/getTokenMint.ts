import { getMint, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";

async function getTokenMint(mint: PublicKey, connection: Connection) {
  try {
    const mintInfo = await getMint(connection, mint, "confirmed", TOKEN_2022_PROGRAM_ID);

    // Calculate total supply (adjusted for decimals)
    const totalSupply = Number(mintInfo.supply) / Math.pow(10, mintInfo.decimals);

    return {
      address: mint,
      decimals: mintInfo.decimals,
      totalSupply,
      mintAuthority: mintInfo.mintAuthority?.toBase58() || null,
    };
  } catch (error) {
    console.error("Error fetching token details:", error);
    throw error;
  }
}

export default getTokenMint;
