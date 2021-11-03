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

const TransferListItem: React.FunctionComponent<TransferListItemModel> = ({
  selected,
  id,
  name,
  handleSelection,
  list,
}: TransferListItemModel) => {
  return (
    <li
      className={classNames(["transfer-list-item", selected ? "selected" : ""])}
      key={id}
      role="listitem"
    >
      <CheckBox
        label={name}
        isChecked={selected}
        onChange={(checked) => {
          if (checked !== selected) {
            handleSelection(list, id);
          }
        }}
      />
    </li>
  );
};

TransferListItem.displayName = "TransferListItem";

export { TransferListItem };
