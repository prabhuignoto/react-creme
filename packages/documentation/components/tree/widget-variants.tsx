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
          { name: 'seven', nodes: [{ name: 'eight' }] },
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

const dataSmall = [
  {
    name: 'File',
    nodes: [
      {
        name: 'Open',
      },
    ],
  },
  {
    name: 'Edit',
  },
];

export const SmallTree = <Tree nodes={dataSmall} size="sm" selectable />;

export const Default = (
  // <Tree
  //   height={400}
  //   items={data}
  //   onChange={selected => console.log(selected, name)}
  // />
  <Tree nodes={data} onSelected={val => console.log(val)} size="sm" />
);

export const Selection = <Tree selectable nodes={data} size="sm" />;

// export const CustomIcon = <Tree height={400} items={data} iconType="plus" />;
