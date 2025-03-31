import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { COLORS } from './constants.ts';

const setCSSVariables = () => {
  const root = document.documentElement;
  Object.entries(COLORS).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
};

setCSSVariables();

createRoot(document.getElementById('root')!).render(
  // TODO: disable StrictMode in dev mode
  <StrictMode>
    <App />
  </StrictMode>
);
