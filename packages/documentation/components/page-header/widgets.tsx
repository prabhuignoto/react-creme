import jsxToString from 'react-element-to-jsx-string';
import { PageHeader, Section, Text } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';

const jsxToStringOptions = {
  maxInlineAttributesLineLength: 250,
  showDefaultProps: true,
  showFunctions: true,
  sortProps: true,
  tabStop: 4,
};

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" border={false}>
        <DemoWidget name="PageHeader" fullWidth>
          <PageHeader title="Page Header" />
        </DemoWidget>
      </Section>
      <Section size="md" border={false}>
        <Text>
          use the <code>RTL</code> prop to support right to left languages.
        </Text>
        <DemoWidget name="PageHeader" fullWidth>
          <PageHeader title="Page Header (Right to Left)" RTL>
            This is a test content
          </PageHeader>
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
