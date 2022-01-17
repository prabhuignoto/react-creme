import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function image() {
  return (
    <DemoPageRenderer
      title="Image"
      description="Embed images in your app with the Image component."
      tabTitles={['Examples', 'Properties', 'Type definitions', 'Stackblitz']}
      stackBlitzCodes={['react-ts-fujyxg']}
      callbacks={[
        {
          default: '',
          description: 'Callback executed on image load',
          name: 'onLoad',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      properties={[
        {
          default: '',
          description: 'Source url of the image',
          name: 'src',
          optional: 'No',
          type: 'String',
        },
        {
          default: 'false',
          description:
            'expands the image to the best possible resolution on full screen',
          name: 'expandImageOnClick',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '',
          description: 'Alternative text for the image',
          name: 'alt',
          optional: 'No',
          type: 'String',
        },
        {
          default: '100%',
          description: 'Width of the image',
          name: 'width',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '100%',
          description: 'Height of the image',
          name: 'height',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'true',
          description: 'Shows a loader while the image is loading',
          name: 'showLoader',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'sm',
          description:
            'Size of the loading icon. can be <em>sm</em> | <em>md</em> | <em>lg</em>',
          name: 'loaderSize',
          optional: 'Yes',
          type: 'String',
        },
      ]}
      demoWidget={lazy(() => import('./widgets'))}
    ></DemoPageRenderer>
  );
}

export default image;
