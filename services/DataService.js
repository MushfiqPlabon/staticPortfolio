import { PortfolioDataSchema } from '../schemas.js';

export class DataService {
  constructor(dataPath, config) {
    this.dataPath = dataPath;
    this.config = config;
  }

  async getPortfolioData() {
    try {
      const response = await fetch(this.dataPath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const portfolioData = await response.json();
      return PortfolioDataSchema.parse(portfolioData);
    } catch (error) {
      console.error(this.config.errors.dataFetchFailed, error);
      throw error; // Re-throw the error to be caught by the application's main error handler
    }
  }
}
