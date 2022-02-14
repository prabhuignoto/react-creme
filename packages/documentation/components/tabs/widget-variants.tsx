import React from 'react';
import { Settings } from 'react-feather';
import { Tabs } from '../../../lib/components';

const icons = [
  <Settings key="1" />,
  <Settings key="2" />,
  <Settings key="3" />,
  <Settings key="4" />,
  <Settings key="5" />,
  <Settings key="6" />,
  <Settings key="7" />,
  <Settings key="8" />,
  <Settings key="9" />,
];

export const Default = (
  <Tabs
    labels={[
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
    ]}
    tabStyle="flat"
    border={false}
    activeTab="two"
    size="sm"
    // focusable
  >
    <span>one</span>
    <span>two</span>
    <span>three</span>
    <span>four</span>
    <span>five</span>
    <span>six</span>
    <span>seven</span>
    <span>eight</span>
    <span>nine</span>
  </Tabs>
);

export const Rounded = (
  <Tabs
    labels={['one', 'two', 'three', 'four']}
    border={false}
    tabStyle="rounded"
    focusable
  >
    <span>one</span>
    <span>two</span>
    <span>three</span>
    <span>four</span>
  </Tabs>
);

export const Disabled = (
  <Tabs
    labels={['one', 'two', 'three']}
    tabStyle="flat"
    disabledTabs={['two', 'one']}
  >
    <span>one</span>
    <span>two</span>
    <span>three</span>
  </Tabs>
);

export const Icons = (
  <Tabs
    labels={[
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
    ]}
    tabStyle="flat"
    disabledTabs={['two', 'one']}
    icons={icons}
  >
    <span>one</span>
    <span>two</span>
    <span>three</span>
    <span>one</span>
    <span>two</span>
    <span>three</span>
    <span>one</span>
    <span>two</span>
    <span>three</span>
  </Tabs>
);
