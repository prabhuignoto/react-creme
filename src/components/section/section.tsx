import React, { CSSProperties, useMemo } from "react";
import { SectionModel } from "./section-model";
import "./section.scss";

const Section: React.FC<SectionModel> = ({
  children,
  title,
  height = 200,
  layout = "row",
}) => {
  const sectionStyle = useMemo(
    () =>
      ({
        minHeight: `${height}px`,
      } as CSSProperties),
    []
  );

  const bodyStyle = useMemo(
    () =>
      ({
        flexDirection: layout === "column" ? "row" : "column",
        alignItems: layout === "column" ? "center" : "stretch",
      } as CSSProperties),
    []
  );

  return (
    <div className="rc-section" style={sectionStyle}>
      {title && <div className="rc-section-header">{title}</div>}
      <div className="rc-section-body" style={bodyStyle}>
        {children}
      </div>
    </div>
  );
};

export { Section };
