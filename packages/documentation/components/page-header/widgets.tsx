import { PageHeader, Section, Text } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';

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
