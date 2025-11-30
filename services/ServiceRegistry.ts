import type { Config } from "../schemas";
import { SkillIconService } from "./SkillIconService";
import { MobileDetectorService } from "./MobileDetectorService";
import { LoggerService } from "./LoggerService";

/**
 * ServiceRegistry - Singleton pattern for shared services
 * Eliminates code duplication by providing centralized service instances
 */
export class ServiceRegistry {
  private static instance: ServiceRegistry;
  private config: Config;
  private skillIconService: SkillIconService;
  private mobileDetectorService: MobileDetectorService;
  private loggerService: LoggerService;

  private constructor(config: Config) {
    this.config = config;
    this.skillIconService = new SkillIconService(config);
    this.mobileDetectorService = new MobileDetectorService(config);
    this.loggerService = new LoggerService(config);
  }

  static getInstance(config?: Config): ServiceRegistry {
    if (!ServiceRegistry.instance) {
      if (!config) {
        throw new Error("Config required for first initialization");
      }
      ServiceRegistry.instance = new ServiceRegistry(config);
    }
    return ServiceRegistry.instance;
  }

  getSkillIconService(): SkillIconService {
    return this.skillIconService;
  }

  getMobileDetectorService(): MobileDetectorService {
    return this.mobileDetectorService;
  }

  getConfig(): Config {
    return this.config;
  }

  getLoggerService(): LoggerService {
    return this.loggerService;
  }
}
