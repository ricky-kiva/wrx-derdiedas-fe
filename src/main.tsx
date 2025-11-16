import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/styles.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import config from './commons/config.ts';
import { AuthProvider } from './providers/AuthProvider.tsx';
import { ToastProvider } from './providers/ToastProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={config.clientId.google}>
      <ToastProvider>
        <AuthProvider>
          
            <BrowserRouter>
              <App />
            </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
