import React from 'react';
import { AutoSuggest } from '../../../lib/components';

export const Default = (
  <AutoSuggest
    focusable
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
