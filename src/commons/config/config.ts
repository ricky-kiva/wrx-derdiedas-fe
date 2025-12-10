import type { RuntimeConfig } from './types';

const runtimeConfig: Partial<RuntimeConfig> = window.__RUNTIME_CONFIG__ ?? {};

function getEnvVar(key: string): string {
  if (runtimeConfig[key] !== undefined) return runtimeConfig[key];
  const varValue = import.meta.env[`VITE_${key}`];
  if (!varValue) throw new Error(`Missing environment variable: ${key}`);
  return varValue;
}

const config = {
  api: {
    base: getEnvVar('API_BASE')
  },
  clientId: {
    google: getEnvVar('GOOGLE_CLIENT_ID')
  }
};

export default config;
