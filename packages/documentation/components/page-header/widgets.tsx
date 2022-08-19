import { BlockQuote, PageHeader, Section } from '@core';
import { DemoWidget } from '../../common/demo-widget';

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section>
        <DemoWidget name="PageHeader" fullWidth>
          <PageHeader title="Page Header" />
        </DemoWidget>
      </Section>
      <Section>
        <BlockQuote>
          use the <code>RTL</code> prop to support right to left languages.
        </BlockQuote>
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
