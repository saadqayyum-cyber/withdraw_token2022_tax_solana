import path from "path";

/**
 * The "as const" assertion is critical here to preserve the literal string types ("DEVNET", "MAINNET")
 * rather than widening them to string. Without it, NETWORK_TYPE would become just 'string',
 * allowing any string value and defeating the purpose of creating a specific union type.
 */
export const DEVNET = "DEVNET" as const;
export const MAINNET = "MAINNET" as const;

export const LOG_DIR = path.join(__dirname, "../logs");
export const LOG_FILE = path.join(LOG_DIR, "application-logs.log");
