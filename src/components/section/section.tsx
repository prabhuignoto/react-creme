import React from "react";
import { SectionModel } from "./section-model";
import "./section.scss";

const Section: React.FC<SectionModel> = ({ children, title, height = 350 }) => {
  return (
    <div className="rc-section" style={{ minHeight: `${height}px` }}>
      <div className="rc-section-header">{title}</div>
      <div className="rc-section-body">{children}</div>
    </div>
  );
};

export { Section };
