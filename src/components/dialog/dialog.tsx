import classNames from "classnames";
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

  useCloseOnEscape((ev) => onClose?.(), dialogRef);

  return (
    <div className={dialogClass} ref={dialogRef} tabIndex={0}>
      <header className="header">
        <span className="title">{title}</span>
        <div className="button-wrapper">
          <Button borderLess onClick={onClose}>
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
