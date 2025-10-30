import React, { CSSProperties, FunctionComponent, memo, useState } from 'react';
import { ChevronDown } from 'react-feather';
import { CodeIcon } from '../../../lib/icons';
import './demo-widget.scss';

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
    disableCode = false,
  }: WidgetProps) => {
    const [isCodeExpanded, setIsCodeExpanded] = useState(showCodeByDefault);

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
            padding: '1rem',
            width: Number.isInteger(width) ? `${width}px` : width,
          }}
        >
          {children}
        </div>
        {!disableCode && (
          <div className="demo-widget__code-section">
            <button
              className="demo-widget__code-toggle"
              onClick={() => setIsCodeExpanded(!isCodeExpanded)}
              type="button"
              aria-expanded={isCodeExpanded}
              aria-label={isCodeExpanded ? 'Hide code' : 'Show code'}
            >
              <CodeIcon width={11} height={11} />
              <span>{isCodeExpanded ? 'Hide Code' : customTitle}</span>
              <ChevronDown
                size={11}
                className={isCodeExpanded ? 'rotated' : ''}
              />
            </button>

            <div
              className={`demo-widget__code-content ${
                isCodeExpanded ? 'expanded' : 'collapsed'
              }`}
            >
              <React.Suspense fallback={<span>loading...</span>}>
                <CodeString name={name} code={codeString} component={component}>
                  {children}
                </CodeString>
              </React.Suspense>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DemoWidget.displayName = 'DemoWidget';

export { DemoWidget };
