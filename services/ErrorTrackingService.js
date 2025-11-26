export class ErrorTrackingService {
  constructor(config) {
    this.config = config;
    this.errors = [];
    this.maxErrors = 100;
  }

  init() {
    window.addEventListener('error', (event) => {
      this.trackError({
        message: event.error?.message || event.message,
        stack: event.error?.stack,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        type: 'global',
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.trackError({
        message: event.reason?.message || String(event.reason),
        stack: event.reason?.stack,
        type: 'unhandledRejection',
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      });
    });

    console.log('Error Tracking Service initialized');
  }

  trackError(errorData) {
    errorData.timestamp = Date.now();
    this.errors.push(errorData);

    this.cleanupOldErrors();

    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }

    console.error('Error tracked:', errorData);

    if (this.config.errorTracking?.endpoint) {
      this.sendToEndpoint(errorData);
    }
  }

  cleanupOldErrors() {
    const oneHourAgo = Date.now() - 3600000;
    this.errors = this.errors.filter(error => error.timestamp > oneHourAgo);
  }

  async sendToEndpoint(errorData) {
    try {
      const response = await fetch(this.config.errorTracking.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorData)
      });

      if (!response.ok) {
        console.warn('Failed to send error to tracking endpoint');
      }
    } catch (error) {
      console.warn('Error tracking endpoint unreachable:', error);
    }
  }

  getErrors() {
    return this.errors;
  }

  clearErrors() {
    this.errors = [];
  }

  getErrorCount() {
    return this.errors.length;
  }
}
