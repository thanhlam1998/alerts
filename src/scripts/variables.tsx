import devConfig from "./../../config/config.dev.json";
import productionConfig from "./../../config/config.production.json";
import stageConfig from "./../../config/config.stage.json";

interface BRI_WEBAPP_CONFIG {
  nodeEnv: string;
  apiUrl: string;
  cryptoAesKey: string;
  webSocketUrl: string;
  wsPort: string;
}

let globalConfig: any = {}

export const getEnvironmentConfig = async () => {
  if (Object.keys(globalConfig).length == 0) {
    let config: BRI_WEBAPP_CONFIG;
    switch (process?.env?.ENVIRONMENT) {
      case "development":
        config = devConfig;
        break;
      case "stage":
        config = stageConfig;
        break;
      case "production":
        config = productionConfig;
        break;
      case "release":
        {
          const configRes = await fetch('/static/config.json')
          config = await configRes.json();
        }
        break;
      default:
        config = devConfig;
        break;
    }
    Object.assign(globalConfig, config);
  }
  return globalConfig;
};

export default globalConfig;
