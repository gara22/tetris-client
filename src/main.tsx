import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  // TODO: disable StrictMode in dev mode
  <StrictMode>
    <App />
  </StrictMode>
);
