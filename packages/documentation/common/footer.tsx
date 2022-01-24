import React from 'react';
import { ReactComponent as GithubSVG } from '../images/github.svg';
import './footer-styles.scss';

function Footer() {
  return (
    <div className="rc-demo-footer">
      <div className="rc-demo-footer-content">
        Made with{' '}
        <span role="img" aria-label="love">
          ❤️
        </span>{' '}
        by{' '}
        <a href="https://www.prabhumurthy.com" target="_new">
          @prabhuignoto
        </a>
      </div>
      <div className='rc-footer-credit'>
        💪 Proudly built with{' '}
        <a href="https://github.com/prabhuignoto/react-creme/">@react-creme</a>
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
