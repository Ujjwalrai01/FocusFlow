import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css'; // Assuming you have a CSS file for global styles like Tailwind imports
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);