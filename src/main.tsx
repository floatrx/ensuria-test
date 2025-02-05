import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './components/demo/App';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './styles/global.css';

// Just for demo purposes - don't judge me 😅
if (navigator.userAgent?.match(/Mac\sOS/gi)) {
  document.body.classList.add('macos');
}

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
