import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { BlockQuote, Section } from "../../components";
import { supportedBrowsers } from "../home-data";
import "./browser-support.scss";

function BrowserSupport() {
  return (
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
  );
}

export default BrowserSupport;
