import classNames from "classnames";
import React from "react";
import { ChevronRightIcon } from "../../icons";

interface TransferControlModel {
  onTransfer: (dir: string) => void;
  disableTransferRight?: boolean;
  disableTransferLeft?: boolean;
}

const check = (prev: TransferControlModel, cur: TransferControlModel) => {
  return (
    prev.disableTransferLeft === cur.disableTransferLeft &&
    prev.disableTransferRight === cur.disableTransferRight
  );
};

const TransferControlColumn: React.FunctionComponent<TransferControlModel> =
  React.memo(
    ({
      onTransfer,
      disableTransferLeft,
      disableTransferRight,
    }: TransferControlModel) => {
      return (
        <section className="transfer-control-column">
          <button
            className={classNames([
              "transfer-btn",
              "right",
              disableTransferRight ? "disabled" : "",
            ])}
            onClick={() => onTransfer("right")}
          >
            <ChevronRightIcon />
          </button>
          <button
            className={classNames([
              "transfer-btn",
              "left",
              disableTransferLeft ? "disabled" : "",
            ])}
            onClick={() => onTransfer("left")}
          >
            <ChevronRightIcon />
          </button>
        </section>
      );
    },
    check
  );

TransferControlColumn.displayName = "TransferControlColumn";

export { TransferControlColumn };
