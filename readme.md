# Solana Withheld Token Withdrawal Utility

A utility for withdrawing withheld tokens from SPL Token 2022 accounts on the Solana blockchain.

## Overview

This utility helps token transfer fee authorities retrieve withheld tokens from various token accounts. It automatically:

1. Connects to the Solana RPC node (Devnet or Mainnet)
2. Finds accounts with withheld tokens for a specific token mint
3. Withdraws all withheld tokens to a destination account

## Features

- Support for SPL Token 2022 program
- Automatic discovery of accounts with withheld tokens
- Configurable destination account (defaults to the payer's associated token account)
- Robust error handling and logging
- Network selection (Devnet/Mainnet)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- tsx installed globally (npm install -g tsx)
- Solana CLI tools (optional, for key management)
- Access to a Solana RPC endpoint

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/solana-withheld-token-withdrawal.git
cd solana-withheld-token-withdrawal

# Install dependencies
npm install

# Ensure tsx is installed globally
npm install -g tsx
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```
PAYER_PRIVATE_KEY="your_base58_encoded_private_key"
WITHDRAW_AUTHORITY="public_key_of_withdrawal_authority"
TOKEN_MINT="address_of_the_token_mint"
DEVNET_RPC_URL="https://api.devnet.solana.com" # or your preferred RPC endpoint
MAINNET_RPC_URL="https://api.mainnet-beta.solana.com" # or your preferred RPC endpoint
NETWORK="DEVNET" # or "MAINNET"
```

### Configuration Details

- `PAYER_PRIVATE_KEY`: The base58-encoded private key of the account that will pay for transactions
- `WITHDRAW_AUTHORITY`: The public key authorized to withdraw withheld tokens (usually the fee authority)
- `TOKEN_MINT`: The address of the token mint you want to withdraw fees from
- `DEVNET_RPC_URL`/`MAINNET_RPC_URL`: URLs for the Solana RPC nodes
- `NETWORK`: Select which network to use ("DEVNET" or "MAINNET")

## Usage

Run the utility with:

```bash
npm start
```

## Advanced Usage

### Running on a Schedule

You can set up a cron job to run this utility periodically:

```bash
# Run every minute
* * * * * cd /path/to/utility && npm start >> /path/to/logs/withdrawal.log 2>&1
```

### Custom Destination Account

By default, withheld tokens are sent to the payer's associated token account. You can modify the code to use a different destination:

```javascript
// In index.ts, replace the getAssociatedTokenAddress call with your desired account
const destinationAccount = getPublicKeyFromBase58("YOUR_CUSTOM_DESTINATION_ACCOUNT");
```

## Security Considerations

- Store your private keys securely and never commit them to version control
- Consider using a dedicated key for the payer that has limited SOL
- Run this utility in a secure environment
- Review the code before running, especially if handling valuable tokens

## Troubleshooting

### Common Issues

1. **RPC Connection Errors**

   - Check your internet connection
   - Verify the RPC URL is correct
   - Try a different RPC provider

2. **No Accounts Found**

   - Verify the token mint address is correct
   - Confirm there are accounts with withheld tokens for this mint

3. **Transaction Failures**
   - Ensure the payer has sufficient SOL for transaction fees
   - Verify the withdraw authority is correct for this token mint

## License

[MIT](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For questions or support, please open an issue on the GitHub repository or contact the maintainer.
