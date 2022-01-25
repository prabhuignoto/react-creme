import React from 'react';
import { Tree } from '../../../lib/components';

const data = [
  {
    child: [
      {
        name: 'two',
      },
      {
        child: [
          {
            name: 'This is a long text that should be truncated',
          },
          { name: 'four' },
          { name: 'five' },
          { name: 'six' },
          { name: 'seven' },
        ],
        name: 'three',
      },
    ],
    name: 'one',
  },
  {
    disabled: true,
    name: 'sixteen',
  },
  { child: [{ name: 'twenty one' }], name: 'twenty' },
  { name: 'twenty two' },
];

export const Default = (
  <Tree
    height={400}
    items={data}
    onChange={selected => console.log(selected, name)}
  />
);

export const Selection = <Tree height={400} allowSelection items={data} />;

export const CustomIcon = <Tree height={400} items={data} iconType="plus" />;
