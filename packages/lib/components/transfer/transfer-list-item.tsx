import classNames from 'classnames';
import React from 'react';
import { CheckBox } from '../checkbox/checkbox';
import './transfer-list.scss';
import { TransferListItemModel } from './transfer-model';

const TransferListItem: React.FunctionComponent<TransferListItemModel> =
  React.memo(
    ({ selected, id, name, handleSelection, list }: TransferListItemModel) => {
      return (
        <li
          className={classNames([
            'transfer-list-item',
            selected ? 'selected' : '',
          ])}
          key={id}
          role="listitem"
        >
          <CheckBox
            label={name}
            isChecked={selected}
            onChange={(id: string, name: string, checked: boolean) => {
              if (checked !== selected) {
                handleSelection(list, id);
              }
            }}
          />
        </li>
      );
    },
    (prevProps, nextProps) => {
      return prevProps.selected === nextProps.selected;
    }
  );

TransferListItem.displayName = 'TransferListItem';

TransferListItem.displayName = 'TransferListItem';

export { TransferListItem };
