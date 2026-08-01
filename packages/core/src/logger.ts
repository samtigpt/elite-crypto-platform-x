export type LogLevel = "info" | "warn" | "error";

export function log(
  level: LogLevel,
  message: string
): void {
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
}

export const logger = {
  info(message: string): void {
    log("info", message);
  },

  warn(message: string): void {
    log("warn", message);
  },

  error(message: string): void {
    log("error", message);
  }
};

