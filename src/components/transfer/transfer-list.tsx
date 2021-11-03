import React from "react";
import { List, ListOption } from "../list/list";
import { TransferList as TransferListModel } from "./transfer-model";

export interface TransferListProps {
  listId: TransferListModel;
  options: ListOption[];
  onSelection: (selected: ListOption[]) => void;
}

const TransferList: React.FunctionComponent<TransferListProps> = ({
  listId,
  options,
  onSelection,
}) => {
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
    />
  );
};

export { TransferList };
