import React from 'react';
import { Card, Image, Skeleton } from '../../../lib/components';

export const Default = (
  <Card
    alignHeader="left"
    header={<h2>header</h2>}
    footer={<span>footer</span>}
    height={250}
  >
    <Skeleton
      animate
      rowHeight={7}
      rows={6}
      style={{ marginTop: '1rem' }}
      showCircle
    ></Skeleton>
  </Card>
);

export const CustomImage = (
  <Card alignHeader="left" height={250} shadow={false}>
    <Image src="https://mmc.tirto.id/image/otf/500x0/2016/07/26/TIRTO-20140522_batman_warner-bros_ratio-16x9.jpg" />
  </Card>
);

export const CustomImageCode = `
  <Card alignHeader="left" height={250} shadow={false}>
    <Image src="https://mmc.tirto.id/image/otf/500x0/2016/07/26/TIRTO-20140522_batman_warner-bros_ratio-16x9.jpg" />
  </Card>
`;
