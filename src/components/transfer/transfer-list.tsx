import React from "react";
import { List } from "../list/list";
import { ListOption } from "../list/list-model";
import { TransferList as TransferListModel } from "./transfer-model";

export interface TransferListProps {
  listId: TransferListModel;
  options: ListOption[];
  onSelection: (selected: ListOption[]) => void;
  enableSearch?: boolean;
}

const TransferList: React.FunctionComponent<TransferListProps> = React.memo(
  ({ listId, options, onSelection, enableSearch }: TransferListProps) => {
    return (
      <List
        options={options
          .filter((i) => i.visible)
          .map((item) => ({
            ...item,
            name: item.name,
            value: item.name,
          }))}
        allowMultiSelection
        maxHeight={350}
        noUniqueIds
        onSelection={onSelection}
        itemHeight={40}
        enableSearch={enableSearch}
      />
    );
  }
);

TransferList.displayName = "TransferList";

export { TransferList };
