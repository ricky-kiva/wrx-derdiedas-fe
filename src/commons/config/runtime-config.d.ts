import type { RuntimeConfig } from './types';

declare global {
  interface Window {
    __RUNTIME_CONFIG__?: RuntimeConfig;
  }
}
