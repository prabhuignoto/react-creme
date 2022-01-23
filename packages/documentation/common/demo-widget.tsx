import React, { CSSProperties } from 'react';
import { Accordion } from '../../lib/components';
import { CodeIcon } from '../../lib/icons';
import './demo-widget.scss';
import { Code } from './syntax';

interface WidgetProps {
  children: React.ReactNode;
  component?: React.ReactNode;
  customTitle?: string;
  fullWidth?: boolean;
  layout?: 'horizontal' | 'vertical';
  showCodeByDefault?: boolean;
  style?: CSSProperties;
  width?: string | number;
}

const DemoWidget: React.FC<WidgetProps> = React.memo(
  ({
    children,
    layout = 'vertical',
    fullWidth = false,
    showCodeByDefault = false,
    customTitle = 'Show Code',
    component,
    width,
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
          style={{ margin: '0.5rem 0', width: width ? `${width}px` : '100%' }}
        >
          {children}
        </div>
        <div style={{ width: '100%' }}>
          <Accordion
            title={customTitle}
            border={false}
            focusable={false}
            expanded={showCodeByDefault}
            disableCollapse={showCodeByDefault}
            disableIcon={showCodeByDefault}
            customIcon={<CodeIcon />}
          >
            <Code>{children}</Code>
          </Accordion>
        </div>
      </div>
    );
  }
);

DemoWidget.displayName = 'DemoWidget';

export { DemoWidget };
