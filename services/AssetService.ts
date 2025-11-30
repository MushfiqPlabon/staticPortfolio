import type { Config } from "../schemas";

export class AssetService {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  loadCss(href: string, fallback: string | null = null): Promise<void> {
    return new Promise((resolve, reject) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;

      link.onload = () => resolve();
      link.onerror = () => {
        if (fallback) {
          const fallbackLink = document.createElement("link");
          fallbackLink.rel = "stylesheet";
          fallbackLink.href = fallback;
          fallbackLink.onload = () => resolve();
          fallbackLink.onerror = () =>
            reject(
              new Error(`Failed to load CSS from both ${href} and ${fallback}`),
            );
          document.head.appendChild(fallbackLink);
        } else {
          reject(new Error(`Failed to load CSS from ${href}`));
        }
      };

      document.head.appendChild(link);
    });
  }

  loadScript(
    src: string,
    async: boolean = true,
    defer: boolean = true,
    fallback: string | null = null,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = async;
      script.defer = defer;

      script.onload = () => resolve();
      script.onerror = () => {
        if (fallback) {
          const fallbackScript = document.createElement("script");
          fallbackScript.src = fallback;
          fallbackScript.async = async;
          fallbackScript.defer = defer;
          fallbackScript.onload = () => resolve();
          fallbackScript.onerror = () =>
            reject(
              new Error(
                `Failed to load script from both ${src} and ${fallback}`,
              ),
            );
          document.head.appendChild(fallbackScript);
        } else {
          reject(new Error(`Failed to load script from ${src}`));
        }
      };

      document.head.appendChild(script);
    });
  }
}
