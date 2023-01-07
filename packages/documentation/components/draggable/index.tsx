import { faHandPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DemoPageRenderer from '../../common/demo-page-renderer';
import './draggable.scss';
import Widgets from './widgets';

const Description = (
  <div>
    <p className="rc-component-description">
      A draggable UI component is a user interface element that allows the user
      to move or reposition it within the screen or application by dragging it
      with their mouse or finger. This can be useful for organizing and
      rearranging elements within a layout or for providing a more interactive
      and customizable experience for the user.
    </p>
    <p>
      Some examples of draggable UI components include icons on a desktop or
      home screen, items in a list or grid layout, and elements within a
      graphical user interface.
    </p>
  </div>
);

function Draggable() {
  return (
    <DemoPageRenderer
      demoWidget={<Widgets />}
      title="useDraggable"
      features={[
        'Restrict dragging to the containing element',
        'Restrict drag to either Horizontal or Vertical axis',
        'Enable dragging on multiple targets',
      ]}
      properties={[]}
      description={Description}
      tabTitles={['Examples', 'Stackblitz']}
      stackBlitzCodes={['react-ts-re75pw']}
      sourceId="common/effects/useDraggable.ts"
      editId="draggable"
      pageIcon={<FontAwesomeIcon icon={faHandPointer} size="2x" />}
    ></DemoPageRenderer>
  );
}

export default Draggable;
