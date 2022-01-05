import React from "react";
import packages from "../../package.json";
import { BlockQuote, Button } from "../components";
import { Section } from "../components/section/section";
import BrowserSupport from "./common/browser-support";
import { Code } from "./common/syntax";
import HeroSection from "./common/hero-section";
import { SyntaxHighLighter } from "./common/syntax-highlighter";
import "./home.scss";

const Home: React.FunctionComponent = () => {
  return (
    <div className="rc-demo-home-page">
      {/* HERO SECTION */}
      <HeroSection />

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
        <BrowserSupport />

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
