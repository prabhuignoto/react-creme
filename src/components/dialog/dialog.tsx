import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { useMemo, useRef } from "react";
import { CheckIcon, CloseIcon } from "../../icons";
import { Button } from "../button/button";
import { useFocus } from "../common/effects/useFocus";
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
  width = 300,
  height = 200,
}: DialogModel) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const dialogClass = useMemo(
    () =>
      classNames([
        "rc-dialog",
        isClosing ? "rc-dialog-close" : "rc-dialog-open",
      ]),
    [isClosing]
  );
  const id = useRef(`rc-dialog-${nanoid()}`);

  const style = useMemo(
    () => ({
      width: width ? `${width}px` : "auto",
      height: height ? `${height}px` : "auto",
    }),
    [width, height]
  );

  useFocus(dialogRef);

  return (
    <div
      className={dialogClass}
      ref={dialogRef}
      role="dialog"
      aria-labelledby={id.current}
      style={style}
    >
      <header className="rc-dialog-header">
        <h2 className="rc-dialog-title" id={id.current}>
          {title}
        </h2>
        <div className="rc-dialog-button-wrapper">
          <Button type="icon" onClick={onClose} size="md">
            <CloseIcon />
          </Button>
        </div>
      </header>
      <section className="rc-dialog-body">{children}</section>
      <footer className="rc-dialog-footer">
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
