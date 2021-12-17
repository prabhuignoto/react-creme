import React from "react";

const GithubLink = () => (
  <div className="rc-demo-app-github-link">
    <a
      href="http://github.com/prabhuignoto/react-creme"
      target="_blank"
      rel="noreferrer"
    >
      <img
        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        alt="github"
      />
    </a>
  </div>
);

const Badge = () => {
  return <div className="rc-demo-alpha-badge">Alpha</div>;
};

export { GithubLink, Badge };
