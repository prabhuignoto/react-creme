import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import 'normalize.css';
import { StrictMode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { ThemeProvider } from '../lib/components';
import App from './App';
import { responsiveState, themeState } from './atoms/home';
import useMedia from './common/useMedia';

const Root = ReactDOM.createRoot(document.getElementById('root'));

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://f95fae83de7c42e48df3691166d06de0@o1116896.ingest.sentry.io/6150784',

    integrations: [new BrowserTracing()],
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
  const setResponsiveState = useSetRecoilState(responsiveState);
  const [canLoad, setCanLoad] = useState(false);
  const theme = useRecoilValue(themeState);

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
    <RecoilRoot>
      <StrictMode>
        <AppBootStrap />
      </StrictMode>
    </RecoilRoot>
  </BrowserRouter>
);
