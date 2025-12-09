import {
  BookOpen,
  Search,
  Wrench,
  Home,
  Paintbrush,
  Laptop,
  Sailboat,
  Github,
  Code,
} from 'lucide-react';

import { Tabs } from '../../../lib/components';

const icons = [
  <BookOpen size={24} key="1" />,
  <Search size={24} key="2" />,
  <Wrench size={24} key="3" />,
  <Home size={24} key="4" />,
  <Paintbrush size={24} key="5" />,
  <Laptop size={24} key="6" />,
  <Sailboat size={24} key="7" />,
  <Github size={24} key="8" />,
  <Code size={24} key="9" />,
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
    minHeight={250}
    width="100%"
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
    minHeight={250}
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
    minHeight={250}
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
    minHeight={250}
    disabledTabs={['two', 'one']}
    icons={icons}
    size="sm"
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

export const IconsCode = `
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
    minHeight={250}
    disabledTabs={['two', 'one']}
    icons={
      [
        <BookOpen size={24} key="1" />,
        <Search size={24} key="2" />,
        <Wrench size={24} key="3" />,
        <Home size={24} key="4" />,
        <Paintbrush size={24} key="5" />,
        <Laptop size={24} key="6" />,
        <Sailboat size={24} key="7" />,
        <Github size={24} key="8" />,
        <Code size={24} key="9" />
      ]
    }
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
`;
