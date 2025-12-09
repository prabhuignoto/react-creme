import { Hand } from 'lucide-react';

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
        'Container-bound dragging',
        'Axis restriction',
        'Multiple targets',
      ]}
      properties={[]}
      description={Description}
      tabTitles={['Examples', 'Playground']}
      stackBlitzCodes={['react-ts-re75pw']}
      sourceId="common/effects/useDraggable.ts"
      editId="draggable"
      pageIcon={<Hand size={32} />}
    ></DemoPageRenderer>
  );
}

export default Draggable;
