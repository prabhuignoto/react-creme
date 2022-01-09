import React from "react";
import { ChevronRightIcon } from "../../icons";
import { Button } from "../button/button";

interface TransferControlModel {
  onTransfer: (dir: string) => void;
  disableTransferRight?: boolean;
  disableTransferLeft?: boolean;
}

const TransferControlColumn: React.FunctionComponent<TransferControlModel> = ({
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
};

TransferControlColumn.displayName = "TransferControlColumn";

export { TransferControlColumn };
