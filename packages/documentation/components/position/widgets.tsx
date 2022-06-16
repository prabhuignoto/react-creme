import { BlockQuote, Section, Tags } from '../../../lib/components';
import { Position } from '../../../lib/components/common/effects/usePosition';
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
      <Section noPadding>
        <BlockQuote>
          The below examples show how to use the <code>usePosition</code> hook
          to position an element relative to a container element. The hook
          support 12 different positions.
        </BlockQuote>
        <div style={{ width: '70%' }}>
          <Tags
            tagWidth={100}
            readonly
            items={positions.map(position => ({ name: position }))}
          />
        </div>
      </Section>
      <Section title="Positioned Left center" size="md">
        <DemoWidget codeString={PositionLeftCode}>
          <PositionLeft />
        </DemoWidget>
      </Section>
      <Section title="Positioned Right Bottom" size="md">
        <DemoWidget codeString={PositionRightCode}>
          <PositionRightBottom />
        </DemoWidget>
      </Section>
      <Section title="Positioned Left Top" size="md">
        <DemoWidget codeString={PositionTopCode}>
          <PositionLeftTop />
        </DemoWidget>
      </Section>
      <Section title="Positioned Right Top" size="md">
        <DemoWidget codeString={PositionRightTopCode}>
          <PositionRightTop />
        </DemoWidget>
      </Section>
      <Section title="Positioned Left Bottom" size="md">
        <DemoWidget codeString={PositionLeftBottomCode}>
          <PositionLeftBottom />
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
