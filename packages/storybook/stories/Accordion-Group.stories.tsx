import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { AccordionGroup } from '../../lib/components';

const Para = () => (
  <p>
    Sed laoreet neque eget sem varius, et interdum dui venenatis. Suspendisse in
    faucibus tortor, nec aliquet arcu. Quisque at Proin auctor velit massa,
    euismod pretium dui euismod in. Pellentesque rhoncus eros id posuere
    tincidunt. Maecenas quis libero vitae elit consectetur finibus et ac libero.
    Donec at fermentum lectus. Cras iaculis augue non mauris interdum, vitae
    pretium mi blandit. Aenean ultrices pellentesque lectus ac faucibus. Morbi
    tristique vulputate nisi, id porttitor diam egestas a. Suspendisse a tortor
    suscipit, accumsan massa at, viverra urna. Maecenas vel lectus sodales,
    dapibus dolor eget, pharetra neque. Nam eleifend id mauris in suscipit. Ut
    sed risus at mi vulputate rhoncus.
  </p>
);

export default {
  component: AccordionGroup,
  decorators: [
    (Story: () => JSX.Element) => (
      <div style={{ margin: '0 auto', width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Accordion Group',
} as ComponentMeta<typeof AccordionGroup>;

export const AutoClosing = () => (
  <AccordionGroup autoClose titles={['View Info 1', 'View Info 2']}>
    <Para />
    <Para />
  </AccordionGroup>
);

export const CustomIconExample = () => (
  <AccordionGroup
    icons={[
      <i>
        <img src="https://img.icons8.com/material-sharp/24/000000/plus--v1.png" />
      </i>,
      <i>
        <img src="https://img.icons8.com/material-sharp/24/000000/plus--v1.png" />
      </i>,
    ]}
    titles={['View Info 1', 'View Info 2']}
  >
    <Para />
    <Para />
  </AccordionGroup>
);

export const InitialStateExample = () => (
  <AccordionGroup expanded titles={['View Info 1', 'View Info 2']}>
    <Para />
    <Para />
  </AccordionGroup>
);

export const DefaultExample = () => (
  <AccordionGroup titles={['View Info 1', 'View Info 2']}>
    <Para />
    <Para />
  </AccordionGroup>
);
