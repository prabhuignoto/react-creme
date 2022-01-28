import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function BreadCrumb() {
  return (
    <DemoPageRenderer
      properties={[
        {
          default: 'chevron',
          description: 'The icon to use for the breadcrumb',
          name: 'icon',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: 'sm',
          description: 'The size of the breadcrumb',
          name: 'size',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: 'sm',
          description: 'The size of the breadcrumb',
          name: 'size',
          optional: 'Yes',
          type: 'string',
        },
        {
          default: '',
          description: 'The callback to call when a breadcrumb is selected',
          name: 'onSelected',
          optional: 'Yes',
          type: 'function',
        },
        {
          default: '0',
          description: 'index of the selected crumb',
          name: 'selectedCrumbIndex',
          optional: 'Yes',
          type: 'number',
        },
      ]}
      tabTitles={['Examples', 'properties', 'StackBlitz']}
      demoWidget={lazy(() => import('./widgets'))}
      title="Bread Crumb"
      description="Breadcrumbs are a list of links representing the current page and its “ancestors” (parent page, grandparent page, and so on), typically going all the way back to the site homepage."
    ></DemoPageRenderer>
  );
}

export default BreadCrumb;
