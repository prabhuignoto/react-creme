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
      description="Bread Crumb is a component that displays a list of breadcrumbs. It is used to navigate between pages."
    ></DemoPageRenderer>
  );
}

export default BreadCrumb;
