import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/styles.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import config from './commons/config.ts';
import { AuthProvider } from './providers/AuthProvider.tsx';
import { ToastProvider } from './providers/ToastProvider.tsx';
import { ModalProvider } from './providers/ModalProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={config.clientId.google}>
      <ToastProvider>
        <AuthProvider>
          <ModalProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ModalProvider>
        </AuthProvider>
      </ToastProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
