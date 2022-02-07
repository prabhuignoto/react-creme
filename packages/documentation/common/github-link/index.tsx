import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './github-link.scss';

const GithubLink = () => (
  <div className="rc-demo-app-github-link">
    <a
      href="https://github.com/prabhuignoto/react-creme/"
      target="_blank"
      rel="noreferrer"
      aria-label="Github"
    >
      <FontAwesomeIcon icon={faGithub} size="2x" />
    </a>
  </div>
);

const Badge = ({ label }: { label: string }) => {
  return (
    <div className="rc-demo-alpha-badge" aria-label="alpha">
      {label}
    </div>
  );
};

export { GithubLink, Badge };
