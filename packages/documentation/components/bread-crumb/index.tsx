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
      ]}
      tabTitles={['Examples', 'properties', 'StackBlitz']}
      demoWidget={lazy(() => import('./widgets'))}
      title="Bread Crumb"
      description="Breadcrumbs are a list of links representing the current page and its “ancestors” (parent page, grandparent page, and so on), typically going all the way back to the site homepage."
    ></DemoPageRenderer>
  );
}

export default BreadCrumb;
