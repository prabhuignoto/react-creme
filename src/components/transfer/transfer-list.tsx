import React from "react";
import { List } from "../list/list";
import { ListOption } from "../list/list-model";
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
