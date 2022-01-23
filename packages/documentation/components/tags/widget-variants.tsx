import React from 'react';
import { Tags } from '../../../lib/components';

const items = [
  { disabled: false, name: 'python' },
  { name: 'fortran' },
  { name: 'c sharp' },
  { name: 'Go lang' },
  { disabled: true, name: 'RUST' },
];

export const Default = () => (
  <Tags
    placeholder="Choose a language..."
    items={items}
    maxTags={15}
    onChange={val => console.log(val)}
    tagWidth={150}
    focusable
  />
);

export const Disabled = () => (
  <Tags
    placeholder="Choose a language..."
    items={items}
    maxTags={15}
    onChange={val => console.log(val)}
    tagWidth={150}
    tagStyle="fill"
  />
);

export const ReadOnly = () => (
  <Tags
    placeholder="Choose a language..."
    items={items}
    maxTags={15}
    onChange={val => console.log(val)}
    readonly
    tagWidth={50}
  />
);

export const AutoComplete = () => (
  <Tags
    placeholder="Choose a language..."
    items={items}
    maxTags={15}
    onChange={val => console.log(val)}
    tagWidth={100}
    autoComplete
    suggestions={['one', 'two']}
  />
);
