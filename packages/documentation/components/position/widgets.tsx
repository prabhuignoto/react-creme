import { Section, Tags, Text } from '../../../lib/components';
import { Position } from '../../../lib/components/common/effects/use-position-model';
import { DemoWidget } from '../../common/demo-widget';
import {
  PositionLeft,
  PositionLeftBottom,
  PositionLeftTop,
  PositionRightBottom,
  PositionRightTop,
} from './position-examples';
import {
  PositionLeftBottomCode,
  PositionLeftCode,
  PositionRightCode,
  PositionRightTopCode,
  PositionTopCode,
} from './widget-variants';

const positions: Position[] = [
  'top left',
  'top right',
  'top center',
  'bottom center',
  'bottom left',
  'bottom right',
  'left center',
  'left top',
  'left bottom',
  'right top',
  'right bottom',
  'right center',
];

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" noPadding>
        <Text>
          The below examples show how to use the <code>usePosition</code> hook
          to position an element relative to a container element. The hook
          support 12 different positions.
        </Text>
        <div style={{ width: '70%' }}>
          <Tags
            tagWidth={100}
            readonly
            items={positions.map(position => ({ name: position }))}
          />
        </div>
      </Section>
      <Section size="md" title="Positioned Left center">
        <DemoWidget name="usePosition" codeString={PositionLeftCode}>
          <PositionLeft />
        </DemoWidget>
      </Section>
      <Section size="md" title="Positioned Right Bottom">
        <DemoWidget name="usePosition" codeString={PositionRightCode}>
          <PositionRightBottom />
        </DemoWidget>
      </Section>
      <Section size="md" title="Positioned Left Top">
        <DemoWidget name="usePosition" codeString={PositionTopCode}>
          <PositionLeftTop />
        </DemoWidget>
      </Section>
      <Section size="md" title="Positioned Right Top">
        <DemoWidget name="usePosition" codeString={PositionRightTopCode}>
          <PositionRightTop />
        </DemoWidget>
      </Section>
      <Section size="md" title="Positioned Left Bottom">
        <DemoWidget name="usePosition" codeString={PositionLeftBottomCode}>
          <PositionLeftBottom />
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
