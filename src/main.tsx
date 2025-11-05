import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/styles.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import config from './commons/config.ts';
import { AuthProvider } from './providers/AuthProvider.tsx';
import { ErrorProvider } from './providers/ErrorProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={config.clientId.google}>
      <ErrorProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </ErrorProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
