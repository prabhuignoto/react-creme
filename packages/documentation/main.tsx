import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';

// Sentry.init({
//   dsn: "https://f95fae83de7c42e48df3691166d06de0@o1116896.ingest.sentry.io/6150784",

//   integrations: [new Integrations.BrowserTracing()],
//   // Alternatively, use `process.env.npm_package_version` for a dynamic release version
// // if your build tool supports it.
// release: "my-project-name@2.3.12",

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });

ReactDOM.render(
  <BrowserRouter>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>,
  document.getElementById('root')
);
