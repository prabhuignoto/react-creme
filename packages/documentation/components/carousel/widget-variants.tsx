import React from 'react';
import { Carousel, Image } from '../../../lib/components';

export const Horizontal = (
  <Carousel direction="horizontal" focusable>
    <Image src="https://bit.ly/3tYnFoD" />
    <Image src="https://bit.ly/3q3YLmk" />
    <Image src="https://bit.ly/3I8nuvN" />
    <Image src="https://bit.ly/3JcM9ko" />
    <span>1233</span>
  </Carousel>
);

export const Vertical = (
  <Carousel direction="vertical" focusable>
    <Image src="https://bit.ly/3tYnFoD" />
    <Image src="https://bit.ly/3q3YLmk" />
    <Image src="https://bit.ly/3I8nuvN" />
    <Image src="https://bit.ly/3JcM9ko" />
  </Carousel>
);
