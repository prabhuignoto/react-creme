import React from 'react';
import { List } from '../list/list';
import { TransferListProps } from './transfer-model';

const TransferList: React.FunctionComponent<TransferListProps> = React.memo(
  ({
    options,
    onSelection,
    enableSearch,
    virtualize,
    focusable,
    size,
    RTL,
  }: TransferListProps) => {
    return (
      <List
        options={options.map(item => ({
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
        size={size}
        focusable={focusable}
        RTL={RTL}
      />
    );
  }
);

TransferList.displayName = 'TransferList';

export { TransferList };
