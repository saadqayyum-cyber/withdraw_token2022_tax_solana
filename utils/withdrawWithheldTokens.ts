import { withdrawWithheldTokensFromAccounts } from "@solana/spl-token";
import { Connection, PublicKey, Signer } from "@solana/web3.js";

async function withdrawWithheldTokens(
  connection: Connection,
  payer: Signer,
  mint: PublicKey,
  destinationAccount: PublicKey,
  withdrawWithheldAuthority: PublicKey,
  sourceAccounts: PublicKey[]
) {
  try {
    await withdrawWithheldTokensFromAccounts(
      connection,
      payer,
      mint,
      destinationAccount,
      withdrawWithheldAuthority,
      [],
      sourceAccounts
    );
  } catch (error) {
    console.log(`Failed to withdraw withheld tokens: ${error}`);
    throw error;
  }
}

export default withdrawWithheldTokens;
