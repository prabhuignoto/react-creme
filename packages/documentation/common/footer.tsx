import React from 'react';
import { ReactComponent as GithubSVG } from '../images/github.svg';
import './footer-styles.scss';

function Footer() {
  return (
    <div className="rc-demo-footer">
      <div className="rc-demo-footer-content">
        <a
          href="https://www.twitter.com/prabhumurthy2"
          target="_blank"
          rel="noreferrer"
        >
          Made with ❤️ by @prabhuignoto
        </a>
      </div>
      <div className="rc-footer-credit">
        <a
          href="https://github.com/prabhuignoto/react-creme/"
          target="_blank"
          rel="noreferrer"
        >
          💪 Proudly built with @react-creme
        </a>
      </div>
      <div className="rc-footer-author">
        <a href="https://www.prabhumurthy.com" target="_blank" rel="noreferrer">
          &copy; {new Date().getFullYear()} PrabhuMurthy.com
        </a>
      </div>
      <div className="github-link">
        <a
          href="https://github.com/prabhuignoto"
          target="__blank"
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
