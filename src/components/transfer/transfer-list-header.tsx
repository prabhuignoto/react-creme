import classNames from "classnames";
import React, { useCallback, useRef } from "react";
import { SearchIcon } from "../../icons";
import { CheckBox } from "../checkbox/checkbox";
import { Input } from "../input/input";
import "./transfer-list.scss";
import { TransferList } from "./transfer-model";

interface TransferListItemHeaderModel {
  selected?: boolean;
  allSelected?: boolean;
  handleSelectAll?: (list: TransferList) => void;
  list: TransferList;
  handleSearch?: (term: string, list: TransferList) => void;
}

const TransferListItemHeader: React.FunctionComponent<TransferListItemHeaderModel> = React.memo(
  ({
    selected,
    allSelected,
    handleSelectAll,
    list,
    handleSearch,
  }: TransferListItemHeaderModel) => {
    const value = useRef("");
    const handleKeyUp = useCallback((ev: React.KeyboardEvent) => {
      if (ev.key === "Enter" && handleSearch) {
        handleSearch(value.current, list);
      }
    }, []);

    const handleChange = useCallback((val) => {
      value.current = val;

      if (!val && handleSearch) {
        handleSearch("", list);
      }
    }, []);

    return (
      <li
        className={classNames([
          "transfer-list-item",
          "header",
          selected ? "selected" : "",
        ])}
      >
        <CheckBox
          onChange={() => {
            handleSelectAll && handleSelectAll(list);
          }}
          isChecked={allSelected}
          label=""
        />
        <div className="transfer-search-input">
          <Input
            placeholder="Search ..."
            onKeyUp={handleKeyUp}
            onChange={handleChange}
            enableClear
          >
            <SearchIcon />
          </Input>
        </div>
      </li>
    );
  },
  (prev, cur) =>
    prev.selected === cur.selected && prev.allSelected === cur.allSelected
);

TransferListItemHeader.displayName = "TransferListItemHeader";

export { TransferListItemHeader };
