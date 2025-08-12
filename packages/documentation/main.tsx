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

const Root = ReactDOM.createRoot(document.getElementById('root'));

// Enable axe-core accessibility checks in development
if (import.meta.env.DEV) {
  (async () => {
    const { default: axe } = await import('@axe-core/react');
    const ReactDOMLegacy = await import('react-dom');
    // 1000ms debounce to avoid flooding the console during rapid updates
    axe(React, ReactDOMLegacy as unknown as typeof import('react-dom'), 1000);
  })();
}

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
    // Alternatively, use `process.env.npm_package_version` for a dynamic release version
    // if your build tool supports it.
    release: 'my-project-name@2.3.12',

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

const AppBootStrap = () => {
  const media = useMedia();
  const setResponsiveState = useSetAtom(responsiveState);
  const [canLoad, setCanLoad] = useState(false);
  const theme = useAtomValue(themeState);

  useEffect(() => {
    if (!media) {
      return;
    }

    setResponsiveState({
      isBigScreen: media.isBigScreen,
      isDesktop: media.isDesktop,
      isExtraLargeScreen: media.isExtraLargeScreen,
      isMobile: media.isMobile,
      isTablet: media.isTablet,
    });
    setCanLoad(true);
  }, [media]);

  return canLoad ? (
    <ThemeProvider theme={theme}>
      <App media={media} />
    </ThemeProvider>
  ) : null;
};

Root.render(
  <BrowserRouter>
    <JotaiProvider>
      <StrictMode>
        <AppBootStrap />
      </StrictMode>
    </JotaiProvider>
  </BrowserRouter>
);
