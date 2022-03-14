import { faGithub, faHackerNews } from '@fortawesome/free-brands-svg-icons';
import {
  faAddressBook,
  faHouse,
  faLaptop,
  faPaintbrush,
  faSailboat,
  faSearch,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Tabs } from '../../../lib/components';

const icons = [
  <FontAwesomeIcon icon={faAddressBook} key="1" />,
  <FontAwesomeIcon icon={faSearch} key="2" />,
  <FontAwesomeIcon icon={faWrench} key="3" />,
  <FontAwesomeIcon icon={faHouse} key="4" />,
  <FontAwesomeIcon icon={faPaintbrush} key="5" />,
  <FontAwesomeIcon icon={faLaptop} key="6" />,
  <FontAwesomeIcon icon={faSailboat} key="7" />,
  <FontAwesomeIcon icon={faGithub} key="8" />,
  <FontAwesomeIcon icon={faHackerNews} key="9" />,
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
        <FontAwesomeIcon icon={faAddressBook} key="1" />,
        <FontAwesomeIcon icon={faSearch} key="2" />,
        <FontAwesomeIcon icon={faWrench} key="3" />,
        <FontAwesomeIcon icon={faHouse} key="4" />,
        <FontAwesomeIcon icon={faPaintbrush} key="5" />,
        <FontAwesomeIcon icon={faLaptop} key="6" />,
        <FontAwesomeIcon icon={faSailboat} key="7" />,
        <FontAwesomeIcon icon={faGithub} key="8" />,
        <FontAwesomeIcon icon={faHackerNews} key="9" />
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
