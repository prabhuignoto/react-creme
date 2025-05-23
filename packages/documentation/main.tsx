import React, { StrictMode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router';
import * as Sentry from '@sentry/react';
import 'normalize.css';
import { Provider as JotaiProvider, useAtomValue, useSetAtom } from 'jotai';
import { ThemeProvider } from '../lib/components';
import App from './App';
import { responsiveState, themeState } from './atoms/home';
import useMedia from './common/useMedia';
import { BrowserRouter } from 'react-router-dom';

// Performance optimization - defer non-critical initialization
const initSentry = () => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: 'https://f95fae83de7c42e48df3691166d06de0@o1116896.ingest.sentry.io/6150784',
      integrations: [
        Sentry.reactRouterV7BrowserTracingIntegration({
          useEffect: React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        }),
      ],
      release: 'my-project-name@2.3.12',
      tracesSampleRate: 0.2, // Reduced from 1.0 to improve performance
    });
  }
};

const AppBootStrap = () => {
  const media = useMedia();
  const setResponsiveState = useSetAtom(responsiveState);
  const [canLoad, setCanLoad] = useState(false);
  const theme = useAtomValue(themeState);

  useEffect(() => {
    // Defer sentry initialization
    initSentry();
    // Initialize only critical features first
    if (media) {
      setResponsiveState(media);
      setCanLoad(true);
    }
  }, [media, setResponsiveState]);

  if (!canLoad) {
    return null; // Or a lightweight loading indicator
  }

  return (
    <ThemeProvider theme={theme}>
      <App media={media} />
    </ThemeProvider>
  );
};

// Use concurrent features
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <JotaiProvider>
      <BrowserRouter>
        <AppBootStrap />
      </BrowserRouter>
    </JotaiProvider>
  </StrictMode>
);
