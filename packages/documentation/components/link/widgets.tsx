import jsxToString from 'react-element-to-jsx-string';
import { Link as LinkIcon } from 'lucide-react';
import { Link, Section } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';

function Widgets() {
  const defaultLink = <Link href="http://www.google.com">google.com</Link>;
  const linkWithIcon = (
    <Link href="http://www.google.com" icon={<LinkIcon />}>
      Test Link
    </Link>
  );

  return (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section size="md" title="Default" border={false}>
          <HeaderCodeToggle.Button />
          <HeaderCodeToggle.Content
            code={jsxToString(defaultLink, jsxToStringOptions)}
            language="jsx"
            componentName="Link"
          >
            <DemoWidget name="Link" width={100}>
              {defaultLink}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section size="md" title="Link with Icon" border={false}>
          <HeaderCodeToggle.Button />
          <HeaderCodeToggle.Content
            code={jsxToString(linkWithIcon, jsxToStringOptions)}
            language="jsx"
            componentName="Link"
          >
            <DemoWidget name="Link" width={100}>
              {linkWithIcon}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
}

export default Widgets;
