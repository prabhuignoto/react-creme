import { faGithub, faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import { faBars, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { asideState, responsiveState, themeState } from '../../atoms/home';
import { HomeButton } from '../../home/home-button';
import { Features } from '../../home/home-data';
import { Badges } from '../badges';
import './hero-section.scss';

function HeroSection() {
  const media = useRecoilValue(responsiveState);
  const setAsideState = useSetRecoilState(asideState);
  const theme = useRecoilValue(themeState);

  const handleOpenSidebar = useCallback(() => {
    setAsideState({ isAnyOverlayOpen: false, isOpen: true });
  }, []);

  return (
    media && (
      <section
        className={classNames('rc-doc-app-hero', {
          dark: theme.darkMode,
        })}
      >
        <header className="rc-doc-app-hero-header">
          <span className="rc-doc-app-icon"></span>
          <span className="rc-doc-app-title">react-creme</span>
        </header>

        <Badges />

        {/* FEATURES SECTION */}
        <ul className="rc-doc-app-features">
          {Features.map(({ icon, title }, index) => (
            <li
              key={index}
              className={classNames('rc-doc-app-feature', {
                dark: theme.darkMode,
              })}
            >
              <span className="rc-doc-app-feature-icon">
                <FontAwesomeIcon icon={icon} size="2x" />
              </span>
              <span
                className={classNames('rc-doc-app-feature-name', {
                  dark: theme.darkMode,
                })}
              >
                {title}
              </span>
            </li>
          ))}
        </ul>
        {media.isMobile && (
          <div className="home-menu">
            <HomeButton onClick={handleOpenSidebar} size="md">
              <FontAwesomeIcon icon={faBars} size="2x" />
            </HomeButton>
          </div>
        )}
        <div className="github-home-btn">
          <HomeButton
            label="Github"
            size="md"
            link="https://github.com/prabhuignoto/react-creme"
          >
            <FontAwesomeIcon icon={faGithub} />
          </HomeButton>
        </div>
        <div className="rc-home-buttons">
          <HomeButton
            label="Explore Storybook"
            size="md"
            accent="round"
            fillStyle="solid"
            link="https://61f8f3a47390f6003aed34df-shwfuqunrb.chromatic.com/"
          >
            <FontAwesomeIcon icon={faBookOpen} />
          </HomeButton>
          <HomeButton
            label="Star this Project"
            size="md"
            accent="round"
            fillStyle="solid"
            link="https://github.com/prabhuignoto/react-creme/stargazers"
          >
            <FontAwesomeIcon icon={faGithubAlt} />
          </HomeButton>
        </div>
      </section>
    )
  );
}

export default HeroSection;
