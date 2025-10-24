import React, { CSSProperties, FunctionComponent, memo } from 'react';
import { Accordion } from '../../../lib/components/accordion/accordion';
// import { CodeIcon } from '../../../lib/icons';

interface WidgetProps {
  children?: React.ReactNode;
  codeString?: string;
  component?: React.ReactElement;
  customTitle?: string;
  disableCode?: boolean;
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
    disableCode = true, // Code display moved to Section header action
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
            margin: '0.5rem 0',
            width: Number.isInteger(width) ? `${width}px` : width,
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

DemoWidget.displayName = 'DemoWidget';

export { DemoWidget };
