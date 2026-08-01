export const ECPX_CORE_VERSION = "0.1.0";

export function getCoreVersion(): string {
  return ECPX_CORE_VERSION;
}

export { logger, log } from "./logger.js";
export type { LogLevel } from "./logger.js";

export { ECPXError, isECPXError } from "./errors.js";
export type {
  ID,
  Timestamp,
  EntityMetadata,
  HealthStatus
} from "./types.js";