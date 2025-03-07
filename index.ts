import "./utils/loadEnv";
import { getAssociatedTokenAddress, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import connectToRPC from "./utils/connectToRPC";
import findAccountsWithWithheldTokens from "./utils/findAccountsWithWithheldTokens";
import withdrawWithheldTokens from "./utils/withdrawWithheldTokens";
import { createKeypairFromBase58, getPublicKeyFromBase58 } from "./utils/helpers";
import { CONFIG } from "./utils/config";
import { logError, logInfo, logSuccess } from "./utils/logs-helper";

async function main() {
  console.log("Starting withheld tokens withdrawal process");

  // 1. Connect to RPC
  const connection = connectToRPC();

  // 2. Find Accounts With Withheld Tokens
  const accountsWithWithheldTokens = await findAccountsWithWithheldTokens(CONFIG.TOKEN_MINT, connection);

  if (accountsWithWithheldTokens.length === 0) {
    logInfo("No accounts found with withheld tokens to withdraw", {
      tokenMint: CONFIG.TOKEN_MINT,
    });
    return;
  }

  // 3. Withdraw withheld tokens
  const payerKeypair = createKeypairFromBase58(CONFIG.PAYER_PRIVATE_KEY);
  const tokenMintPublicKey = getPublicKeyFromBase58(CONFIG.TOKEN_MINT);
  const withdrawAuthorityPublicKey = getPublicKeyFromBase58(CONFIG.WITHDRAW_AUTHORITY);

  // To Implement: Create token account if not exists
  const destinationAccount = await getAssociatedTokenAddress(
    tokenMintPublicKey,
    payerKeypair.publicKey,
    false,
    TOKEN_2022_PROGRAM_ID
  );

  await withdrawWithheldTokens(
    connection,
    payerKeypair,
    tokenMintPublicKey,
    destinationAccount,
    withdrawAuthorityPublicKey,
    accountsWithWithheldTokens
  );

  logSuccess("Withdrawal process completed successfully", {
    tokenMint: tokenMintPublicKey.toString(),
    destinationAccount: destinationAccount.toString(),
    withdrawnFrom: `${accountsWithWithheldTokens.length} Account${accountsWithWithheldTokens.length > 1 ? "s" : ""}`,
  });
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log("Error in main: ", error);
    logError("Error during withheld tokens withdrawal process", error);
    process.exit(1);
  });
