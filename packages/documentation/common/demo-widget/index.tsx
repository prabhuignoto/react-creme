import { CSSProperties, FunctionComponent, memo, ReactNode } from 'react';
import { Accordion } from '../../../lib/components/accordion/accordion';
import { CodeIcon } from '../../../lib/icons';
import { Code } from '../syntax-highlighter/syntax';

interface WidgetProps {
  children?: React.ReactNode;
  codeString?: string;
  component?: React.ReactElement;
  customTitle?: string;
  fullWidth?: boolean;
  height?: string | number;
  layout?: 'horizontal' | 'vertical';
  name?: string;
  showCodeByDefault?: boolean;
  style?: CSSProperties;
  width?: string | number;
}

const CodeString: FunctionComponent<{
  children?: ReactNode;
  code?: string;
  component?: ReactNode;
  name?: string;
}> = ({ code, name, component, children }) => {
  return code ? (
    <Code code={code} name={name} />
  ) : (
    <Code name={name}>{component || children}</Code>
  );
};

const DemoWidget: FunctionComponent<WidgetProps> = memo(
  ({
    children,
    layout = 'vertical',
    showCodeByDefault = true,
    customTitle = 'Show Code',
    width,
    height,
    component,
    codeString,
    name,
  }: WidgetProps) => {
    return (
      <div
        className="rc-demo-widget"
        style={{
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: layout === 'horizontal' ? 'row' : 'column',
          justifyContent: 'flex-start',
        }}
      >
        <div
          style={{
            height: height ? `${height}px` : '100%',
            margin: '1rem 0',
            width: width ? `${width}px` : '100%',
          }}
        >
          {children}
        </div>
        <div style={{ width: '100%' }}>
          {!showCodeByDefault ? (
            <Accordion
              title={customTitle}
              border={false}
              focusable={false}
              expanded={showCodeByDefault}
              disableCollapse={showCodeByDefault}
              disableIcon={showCodeByDefault}
              customIcon={<CodeIcon />}
              size="sm"
            >
              <CodeString name={name} code={codeString} component={component}>
                {children}
              </CodeString>
            </Accordion>
          ) : (
            <CodeString name={name} code={codeString} component={component}>
              {children}
            </CodeString>
          )}
        </div>
      </div>
    );
  }
);

DemoWidget.displayName = 'DemoWidget';

export { DemoWidget };
