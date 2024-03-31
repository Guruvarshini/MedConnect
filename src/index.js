import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { EmailProvider } from './components/EmailContext';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <EmailProvider>
      <App />
    </EmailProvider>
  </React.StrictMode>
);
