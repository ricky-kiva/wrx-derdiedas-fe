const ENV_PRODUCTION = 'production';
const ENV_DEVELOPMENT = 'development';

function getEnvVar(key: string, fallback?: string): string {
  const varValue = import.meta.env[`VITE_${key}`] ?? fallback;
  if (!varValue) throw new Error(`Missing environment variable: ${key}`);

  return varValue;
}

const isProduction = (getEnvVar('NODE_ENV') === ENV_PRODUCTION);
const isDevelopment = (getEnvVar('NODE_ENV') === ENV_DEVELOPMENT);

const config = {
  api: {
    base: isProduction ? '/api' : 'http://localhost:3000'
  },
  clientId: {
    google: getEnvVar('GOOGLE_CLIENT_ID')
  },
  env: {
    production: isProduction,
    development: isDevelopment
  }
};

export default config;
