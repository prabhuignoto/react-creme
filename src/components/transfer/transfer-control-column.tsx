import React from "react";
import { Button } from "..";
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
          <Button
            type="icon"
            size="md"
            onClick={() => onTransfer("right")}
            disabled={disableTransferRight}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            type="icon"
            size="md"
            onClick={() => onTransfer("left")}
            disabled={disableTransferLeft}
            style={{ transform: "rotate(180deg)" }}
          >
            <ChevronRightIcon />
          </Button>
        </section>
      );
    },
    check
  );

TransferControlColumn.displayName = "TransferControlColumn";

export { TransferControlColumn };
