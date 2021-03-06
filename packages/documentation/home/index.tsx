import { BlockQuote, Button } from '../../lib/components';
import { Section } from '../../lib/components/section/section';
import packages from '../../lib/package.json';
import { Code } from './../common/syntax';
import { SyntaxHighLighter } from './../common/syntax-highlighter';
import BrowserSupport from './browser-support';
import HeroSection from './hero-section';
import './home.scss';
import gettingStarted from './samples/getting-started';
import gettingStartedTheme from './samples/getting-started-theme';

const Home: React.FunctionComponent = () => {
  return (
    <div className="rc-doc-home-page">
      {/* HERO SECTION */}
      <HeroSection />

      {/* GETTING STARTED SECTION */}
      <div className="rc-home-main-content">
        {/* SETUP */}
        <Section title="Installation" size="md" hashPrefix="home">
          <BlockQuote>
            Get started by installing the react-creme package via npm or yarn.
          </BlockQuote>
          <Code>{`npm install --save react-creme`}</Code>
          <Code>{`yarn add react-creme`}</Code>
        </Section>

        {/* DEPENDENCIES */}
        <Section title="Dependencies" size="md" hashPrefix="home">
          <BlockQuote>
            react-creme is designed to be lean and does not depend on any other
            major library for styling or for any other features. It only depends
            on some utility libraries for id generation, debouncing and deep
            compare.
          </BlockQuote>
          <Code>
            {Object.keys(packages.dependencies)
              .map(key => `${key}@${packages.dependencies[key]}`)
              .join('\n')}
          </Code>
        </Section>

        {/* Browser Support */}
        <BrowserSupport />

        <Section title="Usage" size="md" hashPrefix="home">
          <BlockQuote>
            The example below shows how to use the react-creme package to create
            a button element.
          </BlockQuote>
          <SyntaxHighLighter code={gettingStarted}></SyntaxHighLighter>

          <div style={{ width: '100px' }}>
            <Button
              label="Click Me"
              onClick={() => alert('Welcome to React-Creme')}
            ></Button>
          </div>
        </Section>

        <Section title="Theme" size="md" hashPrefix="home">
          <BlockQuote>
            react-creme comes with built in support for Themes. Customize the
            Colors, Font and Icon sizes with ease.
          </BlockQuote>
          <SyntaxHighLighter code={gettingStartedTheme}></SyntaxHighLighter>
        </Section>
      </div>
    </div>
  );
};

export default Home;
