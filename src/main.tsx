import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App, { preloadEntryRoute } from './App.tsx';
import './index.css';
import { installStudioClickTracking } from './lib/analytics';

installStudioClickTracking();

// Keep the readable HTML visible while the entry route's code downloads.
void preloadEntryRoute(window.location.pathname).then(() => {
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
}).catch(error => console.error('Could not load interactive page', error));

import './components/CinematicHero.css';
