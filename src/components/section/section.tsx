import classNames from "classnames";
import React, { CSSProperties, useMemo } from "react";
import { SectionModel } from "./section-model";
import "./section.scss";

const Section: React.FC<SectionModel> = ({
  children,
  title,
  height = 150,
  layout = "row",
  RTL = false,
}) => {
  const sectionStyle = useMemo(
    () =>
      ({
        minHeight: `${height}px`,
      } as CSSProperties),
    [height]
  );

  const bodyStyle = useMemo(
    () =>
      ({
        flexDirection: layout === "column" ? "row" : "column",
        alignItems: layout === "column" ? "center" : "stretch",
      } as CSSProperties),
    []
  );

  const sectionClass = useMemo(
    () =>
      classNames("rc-section-body", {
        [`rc-section-${layout}`]: true,
        "rc-section-no-title": !title,
        "rc-section-rtl": RTL,
      }),
    [layout, title]
  );

  const headerClass = useMemo(() => {
    return classNames("rc-section-header", {
      "rc-section-header-rtl": RTL,
    });
  }, []);

  return (
    <div style={sectionStyle} className={"rc-section"}>
      {title && <div className={headerClass}>{title}</div>}
      <div style={bodyStyle} className={sectionClass}>
        {children}
      </div>
    </div>
  );
};

export { Section };
