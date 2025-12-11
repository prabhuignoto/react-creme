import { Button, Text } from '../../lib/components';
import { Section } from '../../lib/components/section/section';
// import packages from '../../lib/package.json';
import { SyntaxHighLighter } from './../common/syntax-highlighter';
import { Code } from './../common/syntax-highlighter/syntax';
// import BrowserSupport from './browser-support';
// import HeroSection from './hero-section';
import './home.scss';
import gettingStarted from './samples/getting-started';
import gettingStartedTheme from './samples/getting-started-theme';

const Home: React.FunctionComponent = () => {
  return (
    <div className="rc-doc-home-page">
      {/* HERO SECTION */}
      {/* <HeroSection /> */}

      {/* GETTING STARTED SECTION */}
      <div className="rc-home-main-content">
        {/* SETUP */}
        <Section title="Installation" size="md" hashPrefix="home">
          <Text>
            Install the <em>react-creme</em> package from npm using your
            preferred manager.
          </Text>
          <Code wrap={false}>{`npm install react-creme
yarn add react-creme
pnpm add react-creme
bun add react-creme`}</Code>
          <Text>
            Import the bundled styles once in your application entry point.
          </Text>
          <Code wrap={false}>{`import 'react-creme/css';`}</Code>
        </Section>

        <Section title="Usage" size="md" hashPrefix="home">
          <Text>
            Use namespaced entry points for tree-shaking and clarity. Common
            namespaces include <code>react-creme/core</code>,{' '}
            <code>react-creme/forms</code>, <code>react-creme/feedback</code>,{' '}
            <code>react-creme/data-display</code>,{' '}
            <code>react-creme/navigation</code>,{' '}
            <code>react-creme/overlay</code>, <code>react-creme/layout</code>,{' '}
            <code>react-creme/disclosure</code>, and{' '}
            <code>react-creme/media</code>. The legacy root import{' '}
            <code>react-creme</code> remains available for compatibility.
          </Text>
          <Text>
            The example below shows how to render a button from the core
            namespace.
          </Text>
          <SyntaxHighLighter
            code={gettingStarted}
            wrap={false}
          ></SyntaxHighLighter>

          <div style={{ width: '100px' }}>
            <Button
              label="Click Me"
              onClick={() => alert('Welcome to React-Creme')}
            ></Button>
          </div>
        </Section>

        <Section title="Theme" size="md" hashPrefix="home">
          <Text>
            Use the <em>ThemeProvider</em> from <code>react-creme/core</code> to
            configure brand colors, typography, icon sizing, and z-index scales
            in one place.
          </Text>
          <Text>
            Components pulled from other namespaces, such as{' '}
            <code>react-creme/forms</code>, automatically inherit your theme.
            The example below shows a minimal setup.
          </Text>
          <SyntaxHighLighter
            code={gettingStartedTheme}
            wrap={false}
          ></SyntaxHighLighter>
        </Section>
      </div>
    </div>
  );
};

export default Home;
