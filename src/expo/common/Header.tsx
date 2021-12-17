import React from "react";
import { Badge, GithubLink } from "./GithubLink";
import { Logo } from "./Logo";

const Header: React.FC<{ isMobile?: boolean; onOpen?: () => void }> = ({
  isMobile,
  onOpen,
}) => {
  return (
    <header className="app-header">
      <Logo isMobile={isMobile} onMenuClick={onOpen} />
      <Badge />
      <GithubLink />
    </header>
  );
};

export { Header };
