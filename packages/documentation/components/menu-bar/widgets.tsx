import { faHackerNews } from '@fortawesome/free-brands-svg-icons';
import { faFile, faSearch, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { BlockQuote, MenuBar, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';

const icons = [
  <FontAwesomeIcon icon={faFile} key="1" />,
  <FontAwesomeIcon icon={faSearch} key="2" />,
  <FontAwesomeIcon icon={faWrench} key="3" />,
  <FontAwesomeIcon icon={faHackerNews} key="9" />,
];

const items = [
  {
    items: [
      {
        name: 'Open',
      },
      {
        name: 'Save As',
      },
      {
        name: 'Save',
      },
      {
        name: 'Close',
      },
    ],
    name: 'File',
  },
  {
    items: [
      {
        name: 'Cut',
      },
      {
        name: 'Copy',
      },
      {
        name: 'Paste',
      },
      {
        name: 'Select All',
      },
    ],
    name: 'Edit',
  },
  {
    items: [
      {
        name: 'About',
      },
      {
        name: 'Version',
      },
    ],
    name: 'Help',
  },
];

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default Render" size="md">
        <DemoWidget width={400} style={{ marginLeft: '2rem' }}>
          <MenuBar items={items} />
        </DemoWidget>
      </Section>
      <Section title="RTL" size="md">
        <BlockQuote>
          Use the <code>RTL</code> prop for right to left alignment
        </BlockQuote>
        <DemoWidget width={400} style={{ marginLeft: '2rem' }}>
          <MenuBar items={items} RTL />
        </DemoWidget>
      </Section>
      <Section title="Icons" size="md">
        <BlockQuote>
          The <code>icons</code> prop can be used to add a custom icon for each
          top level menu bar item
        </BlockQuote>
        <DemoWidget width={400} style={{ marginLeft: '2rem' }}>
          <MenuBar items={items} icons={icons} />
        </DemoWidget>
      </Section>
      <Section title="Custom Sizes" size="md">
        <BlockQuote>
          With the <code>size</code> prop customize the size of the menu bar.
        </BlockQuote>
        <DemoWidget width={400} style={{ marginLeft: '2rem' }}>
          <MenuBar items={items} size="md" />
        </DemoWidget>
        <DemoWidget width={400} style={{ marginLeft: '2rem' }}>
          <MenuBar items={items} size="lg" />
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
