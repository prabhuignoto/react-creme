import React from 'react';
import { Dropdown } from '../../../lib/components';

export const SingleSelection = (
  <Dropdown
    maxMenuHeight={300}
    placeholder="choose a country"
    onSelected={val => console.log(val)}
    options={[
      {
        name: 'germany',
        value: 'germany',
      },
      { name: 'india', value: 'india' },
      { name: 'usa', value: 'usa' },
      { name: 'uk', value: 'uk' },
      { name: 'srilanka', value: 'srilanka' },
    ]}
  />
);

export const MultiSelection = (
  <Dropdown
    onSelected={val => console.log(val)}
    placeholder="choose a country"
    allowMultiSelection
    maxMenuHeight={300}
    focusable
    options={[
      {
        name: 'germany',
        value: 'germany',
      },
      { name: 'india', value: 'india' },
      { name: 'usa', value: 'usa' },
      { name: 'uk', selected: true, value: 'uk' },
      {
        name: 'srilanka',
        selected: false,
        value: 'srilanka',
      },
      {
        name: 'brazil',
        selected: false,
        value: 'brazil',
      },
    ]}
  />
);

export const Searchable = (
  <Dropdown
    maxMenuHeight={300}
    placeholder="choose a country"
    onSelected={val => console.log(val)}
    enableSearch
    options={[
      {
        disabled: true,
        name: 'germany',
        value: 'germany',
      },
      { name: 'india', value: 'india' },
      {
        name: 'usa',
        selected: true,
        value: 'usa',
      },
      { name: 'uk', value: 'uk' },
      { name: 'srilanka', value: 'srilanka' },
    ]}
  />
);

export const Virtualized = (
  <Dropdown
    maxMenuHeight={300}
    placeholder="choose a country"
    onSelected={val => console.log(val)}
    virtualize
    enableSearch
    options={[
      {
        disabled: true,
        name: 'germany',
        value: 'germany',
      },
      { name: 'india', value: 'india' },
      {
        name: 'usa',
        selected: true,
        value: 'usa',
      },
      { name: 'uk', value: 'uk' },
      { name: 'srilanka', value: 'srilanka' },
      { name: 'canada', value: 'canada' },
      { name: 'thailand', value: 'thailand' },
      { name: 'brazil', value: 'brazil' },
      { name: 'china', value: 'china' },
      { name: 'japan', value: 'japan' },
      { name: 'korea', value: 'korea' },
      { name: 'indonesia', value: 'indonesia' },
      { name: 'malaysia', value: 'malaysia' },
    ]}
  />
);

export const RTL = (
  <Dropdown
    maxMenuHeight={300}
    placeholder="choose a country"
    onSelected={val => console.log(val)}
    enableSearch
    RTL
    focusable
    allowMultiSelection
    options={[
      {
        disabled: true,
        name: 'germany',
        value: 'germany',
      },
      { name: 'india', value: 'india' },
      {
        name: 'usa',
        selected: true,
        value: 'usa',
      },
      { name: 'uk', value: 'uk' },
      { name: 'srilanka', value: 'srilanka' },
      { name: 'malaysia', value: 'malaysia' },
    ]}
  />
);
