import React from 'react';
import { AutoSuggest } from '../../../lib/components';

export const Default = (
  <AutoSuggest
    placeholder="Choose a name"
    suggestionsWidth={320}
    debounce={200}
    onChange={(value: string) => console.log(value)}
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
      'Kurt Cobain',
      'Kate McKinnon',
      'Kirk Douglas',
      'Kevin Kline',
      'Koala',
      'Kid Rock',
      'Kevin Smith',
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
    suggestionsWidth={320}
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

export const Medium = (
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
    ].map(item => ({
      name: item,
      value: item,
    }))}
    size="md"
  />
);

export const Large = (
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
    ].map(item => ({
      name: item,
      value: item,
    }))}
    size="lg"
  />
);
