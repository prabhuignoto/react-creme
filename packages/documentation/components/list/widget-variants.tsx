import React from 'react';
import { List } from '../../../lib/components';

export const Default = (
  <List
    maxHeight={450}
    onSelection={val => console.log(val)}
    options={Array.from({ length: 5 }, (_, i) => ({
      name: `Item ${i + 1}`,
      value: `Item ${i + 1}`,
    }))}
  />
);

export const MultiSelection = (
  <List
    onSelection={val => console.log(val)}
    allowMultiSelection
    maxHeight={350}
    border={false}
    options={[
      {
        name: 'india',
        value: 'india',
      },
      { name: 'usa', value: 'usa' },
      { name: 'uk', value: 'uk' },
      { name: 'France', value: 'france' },
      {
        disabled: true,
        name: 'germany',
        value: 'germany',
      },
    ]}
  />
);

export const Search = (
  <List
    maxHeight={400}
    virtualized
    enableSearch
    onSelection={val => console.log(val)}
    options={Array.from({ length: 30 }, (_, i) => ({
      name: `Item ${i}`,
      value: `Item ${i}`,
    }))}
  />
);

export const Virtualized = (
  <List
    maxHeight={350}
    virtualized
    showCheckIcon
    focusable={false}
    onSelection={val => console.log(val)}
    options={Array.from({ length: 30 }, (_, i) => ({
      name: `Item ${i}`,
      value: `Item ${i}`,
    }))}
  />
);
