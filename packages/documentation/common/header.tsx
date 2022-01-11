import React from "react";
import { Badge, GithubLink } from "./github-link";
import { Logo } from "./logo";

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
