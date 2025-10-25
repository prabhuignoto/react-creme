import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { Default, Expand } from './widget-variants';

const jsxToStringOptions = {
  maxInlineAttributesLineLength: 250,
  showDefaultProps: true,
  showFunctions: true,
  sortProps: true,
  tabStop: 4,
};

function widgets() {
  return (
    <div className={'rc-demo-widgets'}>
      <Section size="md" title="Default" border={false}>
        <DemoWidget name="Image">{Default}</DemoWidget>
      </Section>
      <Section size="md" title="Expandable Image" border={false}>
        <Text>
          use <code>expandImageOnClick</code> to make image expandable on click.
        </Text>
        <DemoWidget name="Image">{Expand}</DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
