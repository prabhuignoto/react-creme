import React from 'react';
import { AutoSuggest } from '../../../lib/components';

export const Default = (
  <AutoSuggest
    placeholder="Choose a name"
    suggestions={[
      'Alex',
      'Alec Baldwin',
      'Bob Odenkirk',
      'Charlie Day',
      'David Letterman',
      'Eddie Murphy',
      'George Carlin',
      'Harrison Ford',
      'Jerry Seinfeld',
      'Jonathan Frakes',
      'Iggy Azalea',
      'Kevin James',
      'Lloyd Banks',
      'Michael Richards',
      'Nicole Kidman',
      'Richard Pryor',
      'Steve Martin',
      'Tina Fey',
      'Tom Hanks',
    ].map(item => ({
      name: item,
      value: item,
    }))}
  />
);

export const Accent = (
  <AutoSuggest
    accent="rounded"
    placeholder="Choose a name"
    suggestions={[
      'Alex',
      'Alec Baldwin',
      'Bob Odenkirk',
      'Charlie Day',
      'David Letterman',
      'Eddie Murphy',
      'George Carlin',
      'Harrison Ford',
      'Jerry Seinfeld',
      'Jonathan Frakes',
    ].map(item => ({
      name: item,
      value: item,
    }))}
  />
);

export const RTL = (
  <AutoSuggest
    rtl
    accent="rounded"
    placeholder="Choose a name"
    suggestions={[
      'Alex',
      'Alec Baldwin',
      'Bob Odenkirk',
      'Charlie Day',
      'David Letterman',
      'Eddie Murphy',
      'George Carlin',
      'Harrison Ford',
      'Jerry Seinfeld',
      'Jonathan Frakes',
    ].map(item => ({
      name: item,
      value: item,
    }))}
  />
);
