import { faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function comparer() {
  return (
    <DemoPageRenderer
      title="Image Comparer"
      description="Compare images side by side either horizontally or vertically."
      pageIcon={<FontAwesomeIcon icon={faImages} size="2x" />}
      editId="comparer"
      sourceId="image-comparer/image-comparer.tsx"
      properties={[
        {
          defaultValue: 'horizontal',
          description: 'The direction of the comparer',
          name: 'direction',
          optional: 'Yes',
          type: 'string',
        },
        {
          defaultValue: '',
          description: 'Source of the first image. Should be a valid URL.',
          name: 'sourceOne',
          optional: 'Yes',
          type: 'string',
        },
        {
          defaultValue: '',
          description: 'Source of the second image. Should be a valid URL.',
          name: 'sourceTwo',
          optional: 'Yes',
          type: 'string',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-kgea3r']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default comparer;
