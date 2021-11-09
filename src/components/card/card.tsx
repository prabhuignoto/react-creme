import classNames from "classnames";
import React, { useMemo } from "react";
import { CardModel } from "./card-model";
import "./card.scss";

const Card: React.FunctionComponent<CardModel> = ({
  footer,
  header,
  minHeight = 200,
  maxHeight = 400,
  borderLess = false,
  alignFooter = "left",
  alignHeader = "left",
}) => {
  const style = useMemo(() => {
    return {
      minHeight: `${minHeight}px`,
      maxHeight: `${maxHeight}px`,
    };
  }, [minHeight, maxHeight]);

  const cardWrapperClass = useMemo(() => {
    return classNames("rc-card-wrapper", {
      "rc-card-border-less": borderLess,
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
      <section className="rc-card-body"></section>
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
