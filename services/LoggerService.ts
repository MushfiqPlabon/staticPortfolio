import type { Config } from "../schemas";

/**
 * LoggerService - Centralized logging utility
 * Handles all application logging with environment-aware behavior
 */
export class LoggerService {
  private config: Config;
  private enabled: boolean;

  constructor(config: Config) {
    this.config = config;
    this.enabled = this.config.errorTracking.enabled;
  }

  log(message: string, ...args: unknown[]): void {
    if (this.enabled && typeof console !== "undefined" && console.log) {
      console.log(message, ...args);
    }
  }

  warn(message: string, ...args: unknown[]): void {
    if (this.enabled && typeof console !== "undefined" && console.warn) {
      console.warn(message, ...args);
    }
  }

  error(message: string, ...args: unknown[]): void {
    if (this.enabled && typeof console !== "undefined" && console.error) {
      console.error(message, ...args);
    }
  }

  info(message: string, ...args: unknown[]): void {
    if (this.enabled && typeof console !== "undefined" && console.info) {
      console.info(message, ...args);
    }
  }

  debug(message: string, ...args: unknown[]): void {
    if (this.enabled && typeof console !== "undefined" && console.debug) {
      console.debug(message, ...args);
    }
  }
}
