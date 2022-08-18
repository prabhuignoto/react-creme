import classNames from 'classnames';
import React from 'react';
import { CheckBox } from '@core';
import styles from './transfer-list.module.scss';
import { TransferListItemModel } from './transfer-model';

const TransferListItem: React.FunctionComponent<TransferListItemModel> =
  React.memo(
    ({ selected, id, name, handleSelection, list }: TransferListItemModel) => {
      return (
        <li
          className={classNames([styles.item, selected ? styles.selected : ''])}
          key={id}
        >
          <CheckBox
            label={name}
            isChecked={selected}
            onChange={(id?: string, checked?: boolean) => {
              if (id && checked !== selected) {
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
