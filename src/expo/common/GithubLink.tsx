import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const GithubLink = () => (
  <div className="rc-demo-app-github-link">
    <a
      href="http://github.com/prabhuignoto/react-creme"
      target="_blank"
      rel="noreferrer"
    >
      <FontAwesomeIcon icon={faGithub} size="2x" />
    </a>
  </div>
);

const Badge = () => {
  return <div className="rc-demo-alpha-badge">Alpha</div>;
};

export { GithubLink, Badge };
