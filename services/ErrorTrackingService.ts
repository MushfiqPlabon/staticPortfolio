import type { Config } from "../schemas";

interface ErrorData {
  message?: string;
  stack?: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  type: "global" | "unhandledRejection";
  timestamp: string | number;
  url: string;
  userAgent: string;
}

export class ErrorTrackingService {
  private config: Config;
  private errors: ErrorData[];
  private maxErrors: number;

  constructor(config: Config) {
    this.config = config;
    this.errors = [];
    this.maxErrors = this.config.errorTracking.maxErrors;
  }

  init(): void {
    window.addEventListener("error", (event: ErrorEvent) => {
      this.trackError({
        message: event.error?.message || event.message,
        stack: event.error?.stack,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        type: "global",
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      });
    });

    window.addEventListener(
      "unhandledrejection",
      (event: PromiseRejectionEvent) => {
        this.trackError({
          message: (event.reason as Error)?.message || String(event.reason),
          stack: (event.reason as Error)?.stack,
          type: "unhandledRejection",
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        });
      },
    );
  }

  trackError(errorData: ErrorData): void {
    errorData.timestamp = Date.now();
    this.errors.push(errorData);

    this.cleanupOldErrors();

    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }

    if (
      this.config.errorTracking?.enabled &&
      this.config.errorTracking?.endpoint
    ) {
      this.sendToEndpoint(errorData);
    }
  }

  cleanupOldErrors(): void {
    const cleanupThreshold = Date.now() - this.config.errorTracking.cleanupIntervalMs;
    this.errors = this.errors.filter(
      (error) => (error.timestamp as number) > cleanupThreshold,
    );
  }

  async sendToEndpoint(errorData: ErrorData): Promise<void> {
    try {
      if (!this.config.errorTracking?.endpoint) {
        return;
      }
      await fetch(this.config.errorTracking.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(errorData),
      });
    } catch (_error: unknown) {
      // Silently fail - we don't want error tracking to cause more errors
    }
  }

  getErrors(): ErrorData[] {
    return this.errors;
  }

  clearErrors(): void {
    this.errors = [];
  }

  getErrorCount(): number {
    return this.errors.length;
  }
}
