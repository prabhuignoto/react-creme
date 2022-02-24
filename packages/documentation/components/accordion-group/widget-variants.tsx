import React from 'react';
import { AccordionGroup, Image } from '../../../lib/components';

const Para = () => (
  <p>
    Aenean aliquam dignissim pretium. Ut nulla nunc, euismod sit amet justo vel,
    convallis volutpat neque. Morbi semper odio sed diam tristique, nec tempor
    neque tempus. Praesent quis ultrices odio. Nulla vestibulum nulla sed massa
    molestie, quis vulputate risus semper. Phasellus elementum, metus in iaculis
    sollicitudin, risus elit pulvinar neque, eget pulvinar odio libero eu mi.
    Vivamus id leo facilisis, tincidunt lacus semper, condimentum est. Nam
    euismod non eros a lacinia.
  </p>
);

export const Default = (
  <AccordionGroup titles={['one', 'two']}>
    <Para />
    <div
      style={{
        height: '400px',
        width: '100%',
      }}
    >
      <Image src="https://images.unsplash.com/photo-1635449586099-3ecb7ef8374d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"></Image>
    </div>
  </AccordionGroup>
);

export const InitialState = (
  <AccordionGroup
    titles={['one', 'two']}
    autoClose={false}
    border={false}
    expanded
    focusable
  >
    <Para />
    <div
      style={{
        height: '300px',
        width: '100%',
      }}
    >
      <Image src="https://images.unsplash.com/photo-1635449586099-3ecb7ef8374d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"></Image>
    </div>
  </AccordionGroup>
);

export const AutoClosingSections = (
  <AccordionGroup
    titles={['one', 'two', 'three']}
    autoClose
    border={false}
    size="sm"
  >
    {Array.from({ length: 3 }).map((_, i) => (
      <Para key={i} />
    ))}
  </AccordionGroup>
);

export const CustomIcon = (
  <AccordionGroup
    titles={['one', 'two', 'three', 'four']}
    border={false}
    iconType="plus"
  >
    {Array.from({ length: 4 }).map((_, i) => (
      <Para key={i} />
    ))}
  </AccordionGroup>
);

export const IconCustomPositioning = (
  <AccordionGroup
    titles={['one', 'two', 'three', 'four']}
    border={false}
    alignIconRight
  >
    {Array.from({ length: 4 }).map((_, i) => (
      <Para key={i} />
    ))}
  </AccordionGroup>
);
