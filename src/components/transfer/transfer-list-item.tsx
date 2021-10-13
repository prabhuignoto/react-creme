import classNames from "classnames";
import React from "react";
import { CheckBox } from "../checkbox/checkbox";
import "./transfer-list.scss";
import { TransferList } from "./transfer-model";

interface TransferListItemModel {
  selected?: boolean;
  id: string;
  name: string;
  handleSelection: (l: TransferList, id: string) => void;
  list: TransferList;
}

const TransferListItem: React.FunctionComponent<TransferListItemModel> = React.memo(
  ({ selected, id, name, handleSelection, list }: TransferListItemModel) => {
    return (
      <li
        className={classNames([
          "transfer-list-item",
          selected ? "selected" : "",
        ])}
        key={id}
      >
        <CheckBox
          label={name}
          isChecked={selected}
          onChange={() => handleSelection(list, id)}
        />
      </li>
    );
  },
  (prev, cur) => prev.selected === cur.selected
);

TransferListItem.displayName = "TransferListItem";

export { TransferListItem };
