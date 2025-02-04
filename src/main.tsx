import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { DemoApp } from './DemoApp.tsx';

import './styles/global.css';

// Just for demo purposes - don't judge me 😅
if (navigator.userAgent?.match(/Mac\sOS/gi)) {
  document.body.classList.add('macos');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DemoApp />
  </StrictMode>
);
