import React from "react";
import "./footer-styles.scss";
// import GithubSVG from "./images/github.svg";

function Footer() {
  return (
    <div className="rc-demo-footer">
      <div className="rc-demo-footer-content">
        Made with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        by{" "}
        <a href="https://www.prabhumurthy.com" target="_new">
          Prabhu Murthy
        </a>
      </div>
      <div className="github-link">
        <a
          href="https://github.com/prabhuignoto"
          target="_blank"
          rel="noreferrer"
        >
          {/* <GithubSVG /> */}
          Github
        </a>
      </div>
    </div>
  );
}

export default Footer;
