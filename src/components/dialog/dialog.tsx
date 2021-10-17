import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { useMemo, useRef } from "react";
import { CheckIcon, CloseIcon } from "../../icons";
import { Button } from "../button/button";
import { useCloseOnEscape } from "../common/effects/useCloseOnEsc";
import { withOverlay } from "../common/withOverlay";
import { DialogModel } from "./dialog-model";
import "./dialog.scss";

const DialogComponent: React.FunctionComponent<DialogModel> = ({
  children,
  isClosing,
  onClose,
  onSuccess,
  showClose,
  title,
}: DialogModel) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const dialogClass = useMemo(
    () =>
      classNames([
        "dialog-wrapper",
        isClosing ? "dialog-close" : "dialog-open",
      ]),
    [isClosing]
  );
  const id = useRef(`dialog-${nanoid()}`);

  useCloseOnEscape((ev) => onClose?.(), dialogRef);

  return (
    <div
      className={dialogClass}
      ref={dialogRef}
      tabIndex={0}
      role="dialog"
      aria-labelledby={id.current}
    >
      <header className="header">
        <h2 className="title" id={id.current}>
          {title}
        </h2>
        <div className="button-wrapper">
          <Button type="icon" onClick={onClose}>
            <CloseIcon />
          </Button>
        </div>
      </header>
      <section className="body">{children}</section>
      <footer className="footer">
        <Button label="okay" type="primary" onClick={onSuccess}>
          <CheckIcon />
        </Button>
        <Button label="cancel" onClick={onClose}>
          <CloseIcon />
        </Button>
      </footer>
    </div>
  );
};

const Dialog = withOverlay<DialogModel>(DialogComponent, {
  disableAnimation: false,
});

export { Dialog };
