import React from 'react';
import { Carousel, Image } from '../../../lib/components';

export const Horizontal = () => (
  <Carousel direction="horizontal" focusable>
    <Image src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1474&q=80" />
    <Image src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1274&q=80" />
    <Image src="https://images.unsplash.com/photo-1588392382834-a891154bca4d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1476&q=80" />
    <Image src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1275&q=80" />
    <span>1233</span>
  </Carousel>
);

export const Vertical = () => (
  <Carousel direction="vertical" focusable>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non tempor
      nunc, quis gravida justo. Proin sed pellentesque odio. In congue leo
      lacus, ac fringilla arcu gravida a. Ut ac interdum risus. Maecenas lacinia
      vulputate lorem, in dignissim magna faucibus quis. Phasellus augue erat,
      maximus non turpis eget, egestas venenatis turpis. Sed elementum porttitor
      eleifend. Nulla tincidunt lobortis libero eu fringilla. Curabitur congue
      ac libero ac porta. Proin quam risus.
    </p>
    <p>
      Nulla lacinia nibh sit amet tortor rhoncus, et fringilla diam scelerisque.
      Nullam diam elit, malesuada in tincidunt id, interdum non urna. Nullam
      libero neque, egestas non facilisis et, egestas vel mi. Aenean volutpat
      velit id lectus venenatis tincidunt. Vestibulum et nisl dolor. Suspendisse
      vel ipsum ut neque laoreet auctor id varius magna. Donec in nisl rutrum,
      facilisis leo id, ultrices ex.
    </p>
  </Carousel>
);
