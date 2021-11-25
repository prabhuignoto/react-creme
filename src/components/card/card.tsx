import classNames from "classnames";
import React, { useMemo } from "react";
import { CardModel } from "./card-model";
import "./card.scss";

const Card: React.FunctionComponent<CardModel> = ({
  alignFooter = "left",
  alignHeader = "left",
  border = false,
  children,
  footer,
  header,
  minHeight = 200,
  shadow = true,
}) => {
  const style = useMemo(() => {
    return {
      minHeight: `${minHeight}px`,
      gridTemplateRows: `${header ? "50px" : ""} 1fr ${
        footer ? "50px" : ""
      }`.trim(),
    };
  }, [minHeight]);

  const cardWrapperClass = useMemo(() => {
    return classNames("rc-card-wrapper", {
      "rc-card-border-less": !border,
      "rc-card-shadow": shadow,
    });
  }, [border]);

  const cardHeaderClass = useMemo(() => {
    return classNames("rc-card-header", {
      [`rc-card-align-${alignHeader}`]: true,
    });
  }, []);

  const cardFooterClass = useMemo(() => {
    return classNames("rc-card-footer", {
      [`rc-card-align-${alignFooter}`]: true,
    });
  }, []);

  return (
    <div className={cardWrapperClass} style={style}>
      {header && <header className={cardHeaderClass}>{header}</header>}
      <section className="rc-card-body">{children}</section>
      {footer && <footer className={cardFooterClass}>{footer}</footer>}
    </div>
  );
};

export { Card };
