import React from "react";
import GithubSVG from "../github.svg?component";
import "./Footer.scss";

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
          <GithubSVG />
          Github
        </a>
      </div>
    </div>
  );
}

export default Footer;
