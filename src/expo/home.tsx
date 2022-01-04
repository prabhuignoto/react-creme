import {
  faChrome,
  faEdge,
  faFirefoxBrowser,
  faReact,
  faSafari,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBolt,
  faCubes,
  faFistRaised,
  faMobile,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import packages from "../../package.json";
import { BlockQuote } from "../components";
import { Section } from "../components/section/section";
import { Code } from "./common/Code";
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
          <li className="rc-demo-app-feature">
            <span className="rc-demo-app-feature-icon">
              <FontAwesomeIcon icon={faReact} size="2x" />
            </span>
            <span className="rc-demo-app-feature-name">
              Comprehensive UI Toolkit for React
            </span>
          </li>
          <li className="rc-demo-app-feature">
            <span className="rc-demo-app-feature-icon">
              <FontAwesomeIcon icon={faBolt} size="2x" />
            </span>
            <span className="rc-demo-app-feature-name">
              Robust UI components for your web app
            </span>
          </li>
          <li className="rc-demo-app-feature">
            <span className="rc-demo-app-feature-icon">
              <FontAwesomeIcon icon={faTools} size="2x" />
            </span>
            <span className="rc-demo-app-feature-name">
              40+ components to choose from
            </span>
          </li>
          <li className="rc-demo-app-feature">
            <span className="rc-demo-app-feature-icon">
              <FontAwesomeIcon icon={faFistRaised} size="2x" />
            </span>
            <span className="rc-demo-app-feature-name">
              Built with TypeScript
            </span>
          </li>
          <li className="rc-demo-app-feature">
            <span className="rc-demo-app-feature-icon">
              <FontAwesomeIcon icon={faCubes} size="2x" />
            </span>
            <span className="rc-demo-app-feature-name">
              Highly customizable and easy to use components
            </span>
          </li>
          <li className="rc-demo-app-feature">
            <span className="rc-demo-app-feature-icon">
              <FontAwesomeIcon icon={faMobile} size="2x" />
            </span>
            <span className="rc-demo-app-feature-name">
              Support for Mobiles
            </span>
          </li>
        </ul>
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
            <li>
              <span className="browser-support-icon">
                <FontAwesomeIcon icon={faChrome} size="4x" />
              </span>
              <span className="browser-support-name">Chrome</span>
            </li>
            <li>
              <span className="browser-support-icon">
                <FontAwesomeIcon icon={faFirefoxBrowser} size="4x" />
              </span>
              <span className="browser-support-name">Firefox</span>
            </li>
            <li>
              <span className="browser-support-icon">
                <FontAwesomeIcon icon={faEdge} size="4x" />
              </span>
              <span className="browser-support-name">Edge</span>
            </li>
            <li>
              <span className="browser-support-icon">
                <FontAwesomeIcon icon={faSafari} size="4x" />
              </span>
              <span className="browser-support-name">Safari</span>
            </li>
          </ul>
        </Section>
      </div>
    </div>
  );
};

export { Home };
