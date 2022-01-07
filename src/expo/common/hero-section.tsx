import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { asideState, responsiveState } from "../atoms/home";
import { HomeButton } from "../home-button";
import { Features } from "./../home-data";
import "./hero-section.scss";

function HeroSection() {
  const media = useRecoilValue(responsiveState);
  const setAsideState = useSetRecoilState(asideState);

  const handleOpenSidebar = useCallback(() => {
    setAsideState({ isOpen: true });
  }, []);

  return (
    media && (
      <section className="rc-demo-app-hero">
        <header className="rc-demo-app-hero-header">
          <span className="rc-demo-app-icon"></span>
          <span className="rc-demo-app-title">react-creme</span>
        </header>
        {/* FEATURES SECTION */}
        <ul className="rc-demo-app-features">
          {Features.map((feature, index) => (
            <li key={index} className="rc-demo-app-feature">
              <span className="rc-demo-app-feature-icon">
                <FontAwesomeIcon icon={feature.icon} size="2x" />
              </span>
              <span className="rc-demo-app-feature-name">{feature.title}</span>
            </li>
          ))}
        </ul>
        {media.isMobile && (
          <div className="home-menu">
            <HomeButton onClick={handleOpenSidebar}>
              <FontAwesomeIcon icon={faBars} size="2x" />
            </HomeButton>
          </div>
        )}
        <div className="github-home-btn">
          <HomeButton
            label="Github"
            link="https://github.com/prabhuignoto/react-creme"
          >
            <FontAwesomeIcon icon={faGithub} />
          </HomeButton>
        </div>
      </section>
    )
  );
}

export default HeroSection;