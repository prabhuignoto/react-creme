import classNames from "classnames";
import React, { useMemo } from "react";
import { CardModel } from "./card-model";
import "./card.scss";

const Card: React.FunctionComponent<CardModel> = ({
  footer,
  header,
  minHeight = 200,
  maxHeight = 400,
  borderLess = true,
  alignFooter = "left",
  alignHeader = "left",
  children,
  shadow = true,
}) => {
  const style = useMemo(() => {
    return {
      minHeight: `${minHeight}px`,
      maxHeight: `${maxHeight}px`,
      gridTemplateRows: `${header ? "50px" : ""} 1fr ${
        footer ? "50px" : ""
      }`.trim(),
    };
  }, [minHeight, maxHeight]);

  const cardWrapperClass = useMemo(() => {
    return classNames("rc-card-wrapper", {
      "rc-card-border-less": borderLess,
      "rc-card-shadow": shadow,
    });
  }, [borderLess]);

  return (
    <div className={cardWrapperClass} style={style}>
      {header && (
        <header
          className={classNames("rc-card-header", {
            [`rc-card-align-${alignHeader}`]: true,
          })}
        >
          {header}
        </header>
      )}
      <section className="rc-card-body">{children}</section>
      {footer && (
        <footer
          className={classNames("rc-card-footer", {
            [`rc-card-align-${alignFooter}`]: true,
          })}
        >
          {footer}
        </footer>
      )}
    </div>
  );
};

export { Card };
