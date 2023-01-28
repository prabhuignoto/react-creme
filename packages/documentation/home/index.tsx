import { BlockQuote, Button, Text } from '../../lib/components';
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
            Getting started with the <em>react-creme</em> package is easy. To
            install it, you can use either npm or yarn package manager. If you
            prefer to use npm, you can install it by running the following
            command in your terminal:
          </Text>
          <Code wrap={false}>{`npm install --save react-creme`}</Code>
          <Text>
            If you prefer to use yarn, you can install it by running the
            following command in your terminal:
          </Text>
          <Code wrap={false}>{`yarn add react-creme`}</Code>
          <Text>
            After the installation is complete, you can import the package and
            use its components and functionalities in your React application.
          </Text>

          <BlockQuote>
            Once the package is installed, you can start building your
            application with the powerful set of features provided by
            react-creme, such as the ThemeProvider, which allows you to
            customize the visual design of your application with ease.
          </BlockQuote>
        </Section>

        <Section title="Usage" size="md" hashPrefix="home">
          <Text>
            The example below shows how to use the react-creme package to create
            a simple button element.
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
            The <em>react-creme</em> library comes with a powerful ThemeProvider
            wrapper that makes it easy to customize the visual elements of your
            application. This wrapper allows you to easily change the colors,
            fonts, and icon sizes throughout your application with a single
            point of configuration. This can be useful in situations where you
            need to update the visual design of your application or when you
            want to create a consistent look and feel across multiple pages or
            components.
          </Text>
          <Text>
            The ThemeProvider wrapper is easy to use and can be integrated into
            your application in just a few lines of code, making it a powerful
            tool for customizing the visual design of your React projects with
            ease.
          </Text>
          <Text>
            The following example demonstrates how to use the{' '}
            <em>ThemeProvider</em> to customize your app built with react-creme.
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
