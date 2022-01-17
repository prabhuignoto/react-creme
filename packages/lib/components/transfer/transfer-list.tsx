import React from 'react';
import { List } from '../list/list';
import { TransferListProps } from './transfer-model';

const TransferList: React.FunctionComponent<TransferListProps> = React.memo(
  ({
    listId,
    options,
    onSelection,
    enableSearch,
    virtualize,
    focusable,
  }: TransferListProps) => {
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
        virtualized={virtualize}
        focusable={focusable}
      />
    );
  }
);

TransferList.displayName = 'TransferList';

export { TransferList };
