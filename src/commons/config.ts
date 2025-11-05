function getEnvVar(key: string, fallback?: string): string {
  const varValue = import.meta.env[`VITE_${key}`] ?? fallback;
  if (!varValue) throw new Error(`Missing environment variable: ${key}`);

  return varValue;
}

const config = {
  api: {
    base: 'http://localhost:3000'
  },
  clientId: {
    google: getEnvVar('GOOGLE_CLIENT_ID')
  }
};

export default config;
