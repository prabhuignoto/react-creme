import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import packages from "../../package.json";
import { BlockQuote, Button } from "../components";
import { Section } from "../components/section/section";
import { Code } from "./common/Code";
import { SyntaxHighLighter } from "./common/syntax-highlighter";
import { HomeButton } from "./home-button";
import { Features, supportedBrowsers } from "./home-data";
import "./home.scss";

const Home: React.FunctionComponent = () => {
  return (
    <div className="rc-demo-home-page">
      {/* HERO SECTION */}
      <section className="rc-demo-app-hero">
        <header className="rc-demo-app-hero-header">
          <span className="rc-demo-app-icon"></span>
          <span className="rc-demo-app-title">react-creme</span>
        </header>
        {/* FEATURES SECTION */}
        <ul className="rc-demo-app-features">
          {Features.map((feature, index) => (
            <li key={index} className="rc-demo-app-feature">
              <span className="rc-demo-app-feature-icon">
                <FontAwesomeIcon icon={feature.icon} size="2x" />
              </span>
              <span className="rc-demo-app-feature-name">{feature.title}</span>
            </li>
          ))}
        </ul>
        <div className="github-home-btn">
          <HomeButton
            label="Github"
            link="https://github.com/prabhuignoto/react-creme"
          >
            <FontAwesomeIcon icon={faGithub} />
          </HomeButton>
        </div>
      </section>

      {/* GETTING STARTED SECTION */}
      <div className="rc-home-main-content">
        {/* SETUP */}
        <Section title="Getting Started" size="md">
          <BlockQuote>
            Get started by installing the react-creme package via npm or yarn.
          </BlockQuote>
          <Code>{`npm install --save react-creme`}</Code>
          <Code>{`yarn add react-creme`}</Code>
        </Section>

        {/* DEPENDENCIES */}
        <Section title="Dependencies" size="md">
          <BlockQuote>
            The react-creme package depends on the following packages:
          </BlockQuote>
          <Code>
            {Object.keys(packages.dependencies)
              .map((key) => `${key}@${packages.dependencies[key]}`)
              .join("\n")}
          </Code>
        </Section>

        {/* Browser Support */}
        <Section title="Browser Support" size="md">
          <BlockQuote>
            react-creme is a modern UI library that is designed to work with the
            most popular web browsers.
          </BlockQuote>
          <ul className="browser-support-list">
            {supportedBrowsers.map((browser, index) => (
              <li key={index} className="browser-support-item">
                <span className="browser-support-icon">
                  <FontAwesomeIcon icon={browser.icon} size="4x" />
                </span>
                <span className="browser-support-name">{browser.title}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Usage" size="md">
          <BlockQuote>
            The example below shows how to use the react-creme package. we
            create a simple component that renders a button.
          </BlockQuote>
          <SyntaxHighLighter
            code={`import React from "react";\nimport { Button } from "react-creme";\n\nconst App = () => {\n  return (\n    <div>\n      <Button>Click Me</Button>\n    </div>\n  );\n};\n\nexport default App;`}
          ></SyntaxHighLighter>

          <div style={{ width: "100px" }}>
            <Button
              label="Click Me"
              onClick={() => alert("Welcome to React-Creme")}
            ></Button>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Home;
