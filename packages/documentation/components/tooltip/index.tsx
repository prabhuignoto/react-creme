import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './tooltip-widgets';

function tooltip() {
  return (
    <DemoPageRenderer
      title="Tooltip"
      description={`A tooltip is a brief, informative message that appears when a user interacts with an element in a graphical user interface.`}
      pageIcon={<FontAwesomeIcon icon={faComment} />}
      sourceId="tooltip/tooltip.tsx"
      editId="tooltip"
      features={[
        '12 docking positions',
        'Custom sizes',
        'Activate only on click',
        'Always visible tooltip',
      ]}
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
          <em>top right</em> | <em>'bottom left'</em> | <em>bottom center</em> | <em>bottom right</em>`,
          name: 'position',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '150',
          description: 'Minimum width of the tooltip',
          name: 'minWidth',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: '300',
          description: 'Maximum width of the tooltip',
          name: 'maxWidth',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: '',
          description: 'Message to be displayed in the tooltip',
          name: 'message',
          optional: 'No',
          type: 'String',
        },
        {
          default: 'False',
          description: `By default the tooltip is shown on hovering over the target.
            This can be overridden by setting <em>isStatic</em>. When true the tooltip is always shown`,
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
        {
          default: 'False',
          description: 'Pins the tooltip to the center of the target',
          name: 'fixedAtCenter',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'false',
          description: 'Opens the tooltip on click',
          name: 'openOnClick',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'true',
          description: 'Enables additional padding',
          name: 'enablePadding',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: 'sm',
          description:
            'Custom size for the tooltip, this targets the font size and control size (close button)',
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default tooltip;
