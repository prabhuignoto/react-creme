import React from 'react';
import { Transfer } from '../../../lib/components';

export const Default = (
  <Transfer
    list1={['one', 'two', 'five', 'six']}
    list2={['three', 'four', 'seven', 'eight']}
    onChange={(val, val2) => console.log(val, val2)}
  />
);

export const Searchable = (
  <Transfer
    list1={[
      'one',
      'two',
      'five',
      'six',
      'nine',
      'ten',
      'thirteen',
      'fourteen',
      'seventeen',
      'eighteen',
    ]}
    list2={['three', 'four', 'seven', 'eight']}
    onChange={(val, val2) => console.log(val, val2)}
    enableSearch
    virtualize
    focusable
  />
);