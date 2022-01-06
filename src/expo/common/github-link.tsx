import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const GithubLink = () => (
  <div className="rc-demo-app-github-link">
    <a
      href="http://github.com/prabhuignoto/react-creme"
      target="_blank"
      rel="noreferrer"
      aria-label="Github"
    >
      <FontAwesomeIcon icon={faGithub} size="2x" />
    </a>
  </div>
);

const Badge = () => {
  return (
    <div className="rc-demo-alpha-badge" aria-label="alpha">
      Alpha
    </div>
  );
};

export { GithubLink, Badge };
