import {
  PortfolioDataSchema,
  type PortfolioData,
  type Config,
} from "../schemas";

export class DataService {
  private dataPath: string;
  private config: Config;

  constructor(dataPath: string, config: Config) {
    this.dataPath = dataPath;
    this.config = config;
  }

  async fetchWithRetry(
    url: string,
    retries: number = 3,
    delay: number = 1000,
  ): Promise<Response> {
    let lastError: unknown;

    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          return response;
        }
        lastError = new Error(`HTTP error! status: ${response.status}`);
      } catch (error: unknown) {
        lastError = error;
      }

      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay * 2 ** i));
      }
    }

    throw lastError;
  }

  async getPortfolioData(): Promise<PortfolioData> {
    try {
      const response = await this.fetchWithRetry(this.dataPath);
      const portfolioData: unknown = await response.json();
      return PortfolioDataSchema.parse(portfolioData);
    } catch (error: unknown) {
      console.error(this.config.errors.dataFetchFailed, error);
      throw error;
    }
  }
}
