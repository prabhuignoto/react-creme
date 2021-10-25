import { nanoid } from "nanoid";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TransferControlColumn } from "./transfer-control-column";
import { TransferListItemHeader } from "./transfer-list-header";
import { TransferListItem } from "./transfer-list-item";
import {
  TransferList,
  TransferListInternalModel,
  TransferModel,
} from "./transfer-model";
import "./transfer.scss";

const initMapper = (list: string[]) =>
  list.map((item) => ({
    name: item,
    id: nanoid(),
    selected: false,
    visible: true,
  }));

const Transfer: React.FunctionComponent<TransferModel> = ({
  list1,
  list2,
  onChange,
}) => {
  const [_list1, setList1] = useState<TransferListInternalModel[]>(
    initMapper(list1)
  );
  const [_list2, setList2] = useState<TransferListInternalModel[]>(
    initMapper(list2)
  );

  const leftSelected = useRef<TransferListInternalModel[]>([]);
  const rightSelected = useRef<TransferListInternalModel[]>([]);

  const [list1AllSelected, setList1AllSelected] = useState(false);
  const [list2AllSelected, setList2AllSelected] = useState(false);

  const transferDirection = useRef<string>();

  const firstRender = useRef<boolean>(true);

  useEffect(() => {
    if (firstRender.current) {
      return;
    }

    if (list1AllSelected) {
      leftSelected.current = _list1;
    } else {
      leftSelected.current = [];
    }

    setList1((prev) =>
      prev.map((item) => ({ ...item, selected: list1AllSelected }))
    );
  }, [list1AllSelected]);

  useEffect(() => {
    if (firstRender.current) {
      return;
    }

    if (list2AllSelected) {
      rightSelected.current = _list2;
    } else {
      rightSelected.current = [];
    }

    setList2((prev) =>
      prev.map((item) => ({ ...item, selected: list2AllSelected }))
    );
  }, [list2AllSelected]);

  const handleListSelection = (list: TransferList, id: string) => {
    const setter = list === "list1" ? setList1 : setList2;
    const listToSearch = list === "list1" ? _list1 : _list2;
    const selectedList = list === "list1" ? leftSelected : rightSelected;
    const otherList =
      selectedList === leftSelected ? rightSelected : leftSelected;

    const selectedItem = listToSearch.find((item) => item.id === id);

    if (!selectedItem) {
      return;
    }

    if (list === "list1") {
      setList2((list) => list.map((item) => ({ ...item, selected: false })));
      setList2AllSelected(false);
    } else {
      setList1AllSelected(false);
      setList1((list) => list.map((item) => ({ ...item, selected: false })));
    }

    if (selectedItem?.selected) {
      selectedList.current = selectedList.current.filter(
        (item) => item.id !== selectedItem.id
      );
      otherList.current = [];
    } else {
      selectedList.current = selectedList.current.concat(selectedItem);
      otherList.current = [];
    }

    setter((prev) =>
      prev.map((item) => ({
        ...item,
        selected: item.id === id ? !item.selected : item.selected,
      }))
    );
  };

  const transfer = useCallback((dir: string) => {
    const selectedList = dir === "right" ? leftSelected : rightSelected;
    const otherList =
      selectedList === leftSelected ? rightSelected : leftSelected;
    const selectedListIds = selectedList.current.map((item) => item.id);
    transferDirection.current = dir;

    const addSetter = dir === "right" ? setList2 : setList1;
    const removeSetter = dir === "right" ? setList1 : setList2;

    addSetter((prev) => {
      return [
        ...prev,
        ...selectedList.current.map((item) => ({ ...item, selected: true })),
      ];
    });
    removeSetter((prev) =>
      prev.filter((item) => selectedListIds.indexOf(item.id) < 0)
    );

    otherList.current = otherList.current.concat(selectedList.current);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      return;
    }

    if (transferDirection.current === "left") {
      rightSelected.current = [];
    } else {
      leftSelected.current = [];
    }

    transferDirection.current = "";

    if (onChange) {
      onChange(
        _list1.map((x) => x.name),
        _list2.map((x) => x.name)
      );
    }
  }, [_list1.length, _list2.length]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  }, []);

  const handleSelectionAll = useCallback(
    (list: TransferList) => {
      if (list === "list1") {
        setList1AllSelected(!list1AllSelected);
        setList2AllSelected(false);
        setList2((prev) => prev.map((item) => ({ ...item, selected: false })));
      } else {
        setList1AllSelected(false);
        setList2AllSelected(!list2AllSelected);
        setList1((prev) => prev.map((item) => ({ ...item, selected: false })));
      }
    },
    [list1AllSelected, list2AllSelected]
  );

  const enableTransferRight = useMemo(
    () => _list1.some((item) => item.selected),
    [JSON.stringify(_list1)]
  );

  const enableTransferLeft = useMemo(
    () => _list2.some((item) => item.selected),
    [JSON.stringify(_list2)]
  );

  const handleSearch = (term: string, list: TransferList) => {
    const setter = list === "list1" ? setList1 : setList2;

    if (term) {
      setter((prev) =>
        prev.map((item) => ({ ...item, visible: item.name.includes(term) }))
      );
    } else {
      setter((prev) => prev.map((item) => ({ ...item, visible: true })));
    }
  };

  return (
    <div className="transfer-wrapper">
      <section className="transfer-column1">
        {_list1.length ? (
          <ul className="transfer-list" role="list">
            <TransferListItemHeader
              handleSelectAll={handleSelectionAll}
              allSelected={list1AllSelected}
              list="list1"
              handleSearch={handleSearch}
            />
            {_list1
              .filter((item) => item.visible)
              .map((item, index) => (
                <TransferListItem
                  selected={item.selected}
                  id={item.id}
                  name={item.name}
                  handleSelection={handleListSelection}
                  key={item.id}
                  list="list1"
                />
              ))}
          </ul>
        ) : null}
      </section>
      <TransferControlColumn
        onTransfer={transfer}
        disableTransferLeft={!enableTransferLeft}
        disableTransferRight={!enableTransferRight}
      />
      <section className="transfer-column2">
        {_list2.length ? (
          <ul className="transfer-list" role="list">
            <TransferListItemHeader
              handleSelectAll={handleSelectionAll}
              allSelected={list2AllSelected}
              list="list2"
              handleSearch={handleSearch}
            />
            {_list2
              .filter((item) => item.visible)
              .map((item, index) => (
                <TransferListItem
                  selected={item.selected}
                  id={item.id}
                  name={item.name}
                  handleSelection={handleListSelection}
                  key={item.id}
                  list="list2"
                />
              ))}
          </ul>
        ) : null}
      </section>
    </div>
  );
};

export { Transfer };
