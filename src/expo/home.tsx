import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import packages from "../../package.json";
import { BlockQuote } from "../components";
import { Section } from "../components/section/section";
import { Code } from "./common/Code";
import { HomeButton } from "./home-button";
import { Features, supportedBrowsers } from "./home-data";
import "./home.scss";

const Home: React.FunctionComponent = () => {
  return (
    <div className="rc-demo-home-page">
      <section className="rc-demo-app-hero">
        <header className="rc-demo-app-hero-header">
          <span className="rc-demo-app-icon"></span>
          <span className="rc-demo-app-title">react-creme</span>
        </header>
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
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </HomeButton>
        </div>
      </section>
      <div className="rc-home-main-content">
        <Section title="Setup" size="md">
          <BlockQuote>
            Get started by installing the react-creme package via npm or yarn.
          </BlockQuote>
          <Code>{`npm install --save react-creme`}</Code>
          <Code>{`yarn add react-creme`}</Code>
        </Section>
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

        <Section title="Browser Support" size="md">
          <BlockQuote>
            react-creme is a modern UI library that is designed to work with the
            most popular web browsers.
          </BlockQuote>
          <ul className="browser-support-list">
            {supportedBrowsers.slice(0, 3).map((browser, index) => (
              <li key={index} className="browser-support-item">
                <span className="browser-support-icon">
                  <FontAwesomeIcon icon={browser.icon} size="4x" />
                </span>
                <span className="browser-support-name">{browser.title}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
};

export default Home;
