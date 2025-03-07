import fs from "fs";
import path from "path";
import { LOG_DIR, LOG_FILE } from "./constants";

export type LogDetails = Record<string, any> | null;

export function initLogging(): void {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function getLogHeader(): string {
  const now = new Date();
  const timestamp = now.toISOString();
  const dashLine = "-".repeat(80);

  return `\n${dashLine}\n[${timestamp}] CRON JOB EXECUTION\n${dashLine}\n`;
}

export function logSuccess(message: string, details: LogDetails = null): void {
  initLogging();

  let logContent = getLogHeader();
  logContent += `✅ SUCCESS: ${message}\n`;

  if (details) {
    logContent += `DETAILS: ${JSON.stringify(details, null, 2)}\n`;
  }

  fs.appendFileSync(LOG_FILE, logContent);
  console.log(`✅ SUCCESS: ${message}`);
}

export function logError(message: string, error: Error | LogDetails = null): void {
  initLogging();

  let logContent = getLogHeader();
  logContent += `❌ ERROR: ${message}\n`;

  if (error) {
    if (error instanceof Error) {
      logContent += `ERROR DETAILS: ${error.message}\n`;
      logContent += `STACK TRACE: ${error.stack}\n`;
    } else {
      logContent += `ERROR DETAILS: ${JSON.stringify(error, null, 2)}\n`;
    }
  }

  fs.appendFileSync(LOG_FILE, logContent);
  console.error(`❌ ERROR: ${message}`);
}

export function logInfo(message: string, details: LogDetails = null): void {
  initLogging();

  let logContent = getLogHeader();
  logContent += `ℹ️ INFO: ${message}\n`;

  if (details) {
    logContent += `DETAILS: ${JSON.stringify(details, null, 2)}\n`;
  }

  fs.appendFileSync(LOG_FILE, logContent);
  console.log(`ℹ️ INFO: ${message}`);
}

export function logWarning(message: string, details: LogDetails = null): void {
  initLogging();

  let logContent = getLogHeader();
  logContent += `⚠️ WARNING: ${message}\n`;

  if (details) {
    logContent += `DETAILS: ${JSON.stringify(details, null, 2)}\n`;
  }

  fs.appendFileSync(LOG_FILE, logContent);
  console.warn(`⚠️ WARNING: ${message}`);
}
