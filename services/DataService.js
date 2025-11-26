import { PortfolioDataSchema } from '../schemas.js';

export class DataService {
  constructor(dataPath, config) {
    this.dataPath = dataPath;
    this.config = config;
  }

  async fetchWithRetry(url, retries = 3, delay = 1000) {
    let lastError;
    
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          return response;
        }
        lastError = new Error(`HTTP error! status: ${response.status}`);
      } catch (error) {
        lastError = error;
      }
      
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
    
    throw lastError;
  }

  async getPortfolioData() {
    try {
      const response = await this.fetchWithRetry(this.dataPath);
      const portfolioData = await response.json();
      return PortfolioDataSchema.parse(portfolioData);
    } catch (error) {
      console.error(this.config.errors.dataFetchFailed, error);
      throw error;
    }
  }
}
