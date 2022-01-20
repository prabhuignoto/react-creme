import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import DemoPageRenderer from '../../common/demo-page-renderer';

function tooltip() {
  return (
    <DemoPageRenderer
      title="Tooltip"
      description="Tooltip is a small overlay that displays a message when a user hovers over an element."
      pageIcon={<FontAwesomeIcon icon={faComment} />}
      callbacks={[
        {
          default: '',
          description: 'Callback invoked on tooltip render',
          name: 'onTooltipRendered',
          optional: 'Yes',
          type: 'Function',
        },
      ]}
      properties={[
        {
          default: 'bottom center',
          description: `Docking position of the tooltip.
          <br> <em>'top left'</em> | <em>top center</em> |
          <em>top right</em> <em>'bottom left'</em> | <em>bottom center</em> | <em>bottom right</em>`,
          name: 'position',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '150',
          description: 'Minimum width of the tooltip',
          name: 'width',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: '',
          description: 'Message to be displayed inside the tooltip',
          name: 'message',
          optional: 'No',
          type: 'String',
        },
        {
          default: 'False',
          description: `By default the tooltip is shown on hover.
            This can be overridden by setting <em>isStatic</em>. When true the popup is always shown`,
          name: 'isStatic',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '#fff',
          description: 'Background color of the tooltip',
          name: 'bgColor',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '#000',
          description: 'Foreground color of the tooltip',
          name: 'foreColor',
          optional: 'Yes',
          type: 'String',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      stackBlitzCodes={['react-ts-pwaial']}
      demoWidget={lazy(() => import('./tooltip-widgets'))}
    ></DemoPageRenderer>
  );
}

export default tooltip;
