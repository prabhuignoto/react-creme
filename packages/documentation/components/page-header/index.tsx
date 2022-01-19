import { faHeading } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function PageHeader() {
  return (
    <DemoPageRenderer
      demoWidget={lazy(() => import('./widgets'))}
      properties={[
        {
          default: 'Page Header',
          description: `Title of the page.`,
          name: 'title',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'False',
          description: `Right to left support.`,
          name: 'RTL',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'md',
          description: `Size of the page header.
          </br> can be <em>sm</em> or <em>md</em> or <em>lg</em>.`,
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Type definitions', 'Stackblitz']}
      description="Page header can be used to display the title of the page."
      title="Page Header"
      stackBlitzCodes={['react-ts-wo1xvm']}
      pageIcon={<FontAwesomeIcon icon={faHeading} size="2x" />}
    />
  );
}

export default PageHeader;
