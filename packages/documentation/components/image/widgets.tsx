import { Section, Text } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
import { Default, Expand } from './widget-variants';

function widgets() {
  return (
    <div className={'rc-demo-widgets'}>
      <Section size="md" title="Default render">
        <DemoWidget name="Image">{Default}</DemoWidget>
      </Section>
      <Section size="md" title="Expandable Image">
        <Text>
          use <code>expandImageOnClick</code> to make image expandable on click.
        </Text>
        <DemoWidget name="Image">{Expand}</DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
