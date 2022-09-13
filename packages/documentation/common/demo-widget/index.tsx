import React, { CSSProperties, FunctionComponent, memo } from 'react';
import { Accordion } from '../../../lib/components/accordion/accordion';
// import { CodeIcon } from '../../../lib/icons';

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

import CodeString from './code-string';

const DemoWidget: FunctionComponent<WidgetProps> = memo(
  ({
    children,
    layout = 'vertical',
    showCodeByDefault = false,
    customTitle = 'Show Code',
    width = '100%',
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
            width: Number.isInteger(width) ? `${width}px` : width,
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
              // customIcon={<CodeIcon />}
              size="sm"
            >
              <React.Suspense fallback={<span>loading ...</span>}>
                <CodeString name={name} code={codeString} component={component}>
                  {children}
                </CodeString>
              </React.Suspense>
            </Accordion>
          ) : (
            <React.Suspense fallback={<span>loading ...</span>}>
              <CodeString name={name} code={codeString} component={component}>
                {children}
              </CodeString>
            </React.Suspense>
          )}
        </div>
      </div>
    );
  }
);

DemoWidget.displayName = 'DemoWidget';

export { DemoWidget };
