import './badges.scss';
import React from 'react';

const links = [
  {
    image:
      'https://sonarcloud.io/api/project_badges/measure?project=react-creme&metric=alert_status',
    url: 'https://sonarcloud.io/summary/new_code?id=react-creme',
  },
  {
    image:
      'https://www.codefactor.io/repository/github/prabhuignoto/react-creme/badge',
    url: 'https://www.codefactor.io/repository/github/prabhuignoto/react-creme',
  },
  {
    image:
      'https://github.com/prabhuignoto/react-creme/actions/workflows/codeql-analysis.yml/badge.svg',
    url: 'https://github.com/prabhuignoto/react-creme/actions/workflows/codeql-analysis.yml',
  },
  {
    image: 'https://img.shields.io/bundlephobia/minzip/react-creme',
    url: 'https://bundlephobia.com/package/react-creme@0.12.0',
  },
  {
    image: 'https://img.shields.io/badge/status-alpha-green',
    url: 'https://github.com/prabhuignoto/react-creme',
  },
  {
    image: 'https://badgen.net/npm/v/react-creme',
    url: 'https://www.npmjs.com/package/react-creme',
  },
];

const Badges = () => {
  return (
    <ul className="rc-doc-badges">
      {links.map((link, index) => (
        <li key={index} className="rc-doc-badge">
          <a href={link.url}>
            <img src={link.image} />
          </a>
        </li>
      ))}
    </ul>
  );
};

export { Badges };
