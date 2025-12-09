import jsxToString from 'react-element-to-jsx-string';
import { PageHeader, Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';

function widgets() {
  const defaultPageHeader = <PageHeader title="Page Header" />;
  const rtlPageHeader = (
    <PageHeader title="Page Header (Right to Left)" RTL>
      This is a test content
    </PageHeader>
  );

  return (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(defaultPageHeader, jsxToStringOptions)}
            language="jsx"
            componentName="PageHeader"
          >
            <DemoWidget name="PageHeader" fullWidth>
              {defaultPageHeader}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            use the <code>RTL</code> prop to support right to left languages.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(rtlPageHeader, jsxToStringOptions)}
            language="jsx"
            componentName="PageHeader"
          >
            <DemoWidget name="PageHeader" fullWidth>
              {rtlPageHeader}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
}

export default widgets;
