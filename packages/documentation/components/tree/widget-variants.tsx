import React from 'react';
import { Tree } from '../../../lib/components';

const data = [
  {
    name: 'one',
    nodes: [
      {
        name: 'two',
      },
      {
        name: 'three',
        nodes: [
          {
            name: 'This is a long text that should be truncated',
          },
          { name: 'four' },
          { name: 'five' },
          { name: 'six' },
          { name: 'seven' },
        ],
      },
    ],
  },
  {
    disabled: true,
    name: 'sixteen',
  },
  { name: 'twenty', nodes: [{ name: 'twenty one' }] },
  { name: 'twenty two' },
];

export const Default = (
  // <Tree
  //   height={400}
  //   items={data}
  //   onChange={selected => console.log(selected, name)}
  // />
  <Tree nodes={data} />
);

// export const Selection = <Tree height={400} allowSelection items={data} />;

// export const CustomIcon = <Tree height={400} items={data} iconType="plus" />;
