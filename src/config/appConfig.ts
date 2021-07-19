import config from "./appConfig.json";

const defaultConfig = config.development;
// const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config.development;
const finalConfig = { ...defaultConfig, ...environmentConfig };

export default finalConfig;
