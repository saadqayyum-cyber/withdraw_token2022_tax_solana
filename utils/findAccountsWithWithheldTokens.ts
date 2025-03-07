import { getTransferFeeAmount, TOKEN_2022_PROGRAM_ID, unpackAccount } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";

async function findAccountsWithWithheldTokens(tokenMintAddress: string, connection: Connection) {
  try {
    const allAccounts = await connection.getProgramAccounts(TOKEN_2022_PROGRAM_ID, {
      commitment: "confirmed",
      filters: [
        {
          memcmp: {
            offset: 0,
            bytes: tokenMintAddress,
          },
        },
      ],
    });
    const accountsToWithdrawFrom: PublicKey[] = [];

    for (const accountInfo of allAccounts) {
      const account = unpackAccount(accountInfo.pubkey, accountInfo.account, TOKEN_2022_PROGRAM_ID);
      const transferFeeAmount = getTransferFeeAmount(account);

      if (transferFeeAmount !== null && transferFeeAmount.withheldAmount > BigInt(0)) {
        accountsToWithdrawFrom.push(accountInfo.pubkey);
      }
    }

    return accountsToWithdrawFrom;
  } catch (error) {
    console.log(`Failed to find accounts with withheld token: ${error}`);
    throw error;
  }
}

export default findAccountsWithWithheldTokens;
