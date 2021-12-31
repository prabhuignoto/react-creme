import { faReact } from "@fortawesome/free-brands-svg-icons";
import {
  faBolt,
  faCubes,
  faFistRaised,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
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
              <FontAwesomeIcon icon={faTools} size="2x" />
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
              <FontAwesomeIcon icon={faReact} size="2x" />
            </span>
            <span className="rc-demo-app-feature-name">
              30+ components to choose from
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
        </ul>
      </section>
    </div>
  );
};

export { Home };
