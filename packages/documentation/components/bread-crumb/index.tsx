import React from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function BreadCrumb() {
  return (
    <DemoPageRenderer
      properties={[
        {
          default: 'chevron',
          description:
            'The icon to use for the breadcrumb. Can be <code>chevron</code>, <code>arrow</code> or <code>slash</code>',
          name: 'icon',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'sm',
          description: 'The size of the breadcrumb',
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'sm',
          description: 'The size of the breadcrumb',
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '',
          description: 'The callback to call when a breadcrumb is selected',
          name: 'onSelected',
          optional: 'Yes',
          type: 'Function',
        },
        {
          default: '0',
          description: 'index of the selected crumb',
          name: 'selectedCrumbIndex',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: 'sm',
          description: 'The size of the breadcrumb',
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'true',
          description: 'Whether the link is focusable',
          name: 'focusable',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: [],
          description: 'The links to display in the breadcrumb',
          name: 'links',
          optional: 'Yes',
          type: 'Array',
        },
      ]}
      tabTitles={['Examples', 'properties', 'StackBlitz', 'RTL Support']}
      features={['Custom sizes', 'Custom separator Icons']}
      demoWidget={<Widgets />}
      title="Bread Crumb"
      sourceId="breadcrumb/breadcrumb.tsx"
      editId="bread-crumb"
      description="Breadcrumbs are a list of links representing the current page and its “ancestors” (parent page, grandparent page, and so on), typically going all the way back to the site homepage."
    ></DemoPageRenderer>
  );
}

export default BreadCrumb;
