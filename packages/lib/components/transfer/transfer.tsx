import { nanoid } from 'nanoid';
import React, { useCallback, useEffect, useState } from 'react';
import { useFirstRender } from '../common/effects/useFirstRender';
import { ListOption } from '../list/list-model';
import { TransferControlColumn } from './transfer-control-column';
import { TransferList } from './transfer-list';
import { TransferListInternalModel, TransferProps } from './transfer-model';
import './transfer.scss';

const initMapper = (list: string[]) =>
  list.map(item => ({
    id: nanoid(),
    name: item,
    selected: false,
    visible: true,
  }));

const Transfer: React.FunctionComponent<TransferProps> = ({
  list1,
  list2,
  onChange,
  enableSearch = false,
  virtualize = false,
  focusable = true,
}) => {
  const [leftList, setLeftList] = useState<TransferListInternalModel[]>(
    initMapper(list1)
  );
  const [rightList, setRightList] = useState<TransferListInternalModel[]>(
    initMapper(list2)
  );

  const [leftSelected, setLeftSelected] = useState<TransferListInternalModel[]>(
    []
  );

  const isFirstRender = useFirstRender();

  const [rightSelected, setRightSelected] = useState<
    TransferListInternalModel[]
  >([]);

  const transfer = useCallback(
    (dir: string) => {
      if (dir === 'right') {
        setRightList(prev => prev.concat(leftSelected));
        const leftSelectedIds = leftSelected.map(item => item.id);
        setLeftList(prev =>
          prev.filter(item => !leftSelectedIds.includes(item.id))
        );
        setRightSelected(prev => prev.concat(leftSelected));
        setLeftSelected([]);
      } else {
        setLeftList(prev => {
          return prev.concat(rightSelected);
        });
        const rightSelectedIds = rightSelected.map(item => item.id);
        setRightList(prev =>
          prev.filter(item => !rightSelectedIds.includes(item.id))
        );
        setLeftSelected(prev => {
          return prev.concat(rightSelected);
        });
        setRightSelected([]);
      }
    },
    [leftSelected.length, rightSelected.length]
  );

  const handleListSelectionLeft = useCallback((sel: ListOption[]) => {
    setLeftSelected(
      sel.map(item => ({
        id: item.id,
        name: item.name,
        selected: true,
        visible: true,
      }))
    );
    const selIds = sel.map(item => item.id);
    setLeftList(prev =>
      prev.map(item => ({
        ...item,
        selected: selIds.includes(item.id),
      }))
    );
  }, []);

  const handleListSelectionRight = useCallback((sel: ListOption[]) => {
    setRightSelected(
      sel.map(item => ({
        id: item.id,
        name: item.name,
        selected: true,
        visible: true,
      }))
    );
    setRightSelected(sel);
    const selIds = sel.map(item => item.id);
    setRightList(prev =>
      prev.map(item => ({
        ...item,
        selected: selIds.includes(item.id),
      }))
    );
  }, []);

  useEffect(() => {
    if (onChange && !isFirstRender.current) {
      onChange(
        leftList.map(item => item.name as string),
        rightList.map(item => item.name as string)
      );
    }
  }, [leftList.length, rightList.length]);

  return (
    <div className="transfer-wrapper">
      <section className="transfer-column1">
        {leftList.length ? (
          <TransferList
            listId="list1"
            options={leftList as ListOption[]}
            onSelection={handleListSelectionLeft}
            enableSearch={enableSearch}
            virtualize={virtualize}
            focusable={focusable}
          />
        ) : null}
      </section>
      <TransferControlColumn
        onTransfer={transfer}
        disableTransferLeft={!rightSelected.length}
        disableTransferRight={!leftSelected.length}
      />
      <section className="transfer-column2">
        {rightList.length ? (
          <TransferList
            listId="list2"
            options={rightList as ListOption[]}
            onSelection={handleListSelectionRight}
            enableSearch={enableSearch}
            focusable={focusable}
          />
        ) : null}
      </section>
    </div>
  );
};

export { Transfer };
