import { CSSProperties, memo } from 'react';
import { Code } from '../syntax';

interface WidgetProps {
  children?: React.ReactNode;
  codeString?: string;
  component?: React.ReactElement;
  customTitle?: string;
  fullWidth?: boolean;
  height?: string | number;
  layout?: 'horizontal' | 'vertical';
  showCodeByDefault?: boolean;
  style?: CSSProperties;
  width?: string | number;
}

const DemoWidget: React.FC<WidgetProps> = memo(
  ({
    children,
    layout = 'vertical',
    // showCodeByDefault = false,
    // customTitle = 'Show Code',
    width,
    height,
    component,
    codeString,
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
          {codeString ? (
            <Code code={codeString} />
          ) : (
            <Code>{component ? component : children}</Code>
          )}
          {/* <Accordion
            title={customTitle}
            border={false}
            focusable={false}
            expanded={showCodeByDefault}
            disableCollapse={showCodeByDefault}
            disableIcon={showCodeByDefault}
            customIcon={<CodeIcon />}
            size="sm"
          >
          </Accordion> */}
        </div>
      </div>
    );
  }
);

DemoWidget.displayName = 'DemoWidget';

export { DemoWidget };
