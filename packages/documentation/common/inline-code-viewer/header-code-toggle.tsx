import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { Switch } from '../../../lib/components';
import { SyntaxHighLighter } from '../syntax-highlighter';
import type { SupportedLanguage } from '../demo-page-renderer/types';
import './header-code-toggle.scss';

interface HeaderCodeToggleContextValue {
  view: 'component' | 'code';
  toggleView: () => void;
  setView: (view: 'component' | 'code') => void;
  isCodeView: boolean;
}

const HeaderCodeToggleContext = createContext<
  HeaderCodeToggleContextValue | undefined
>(undefined);

const useHeaderCodeToggle = () => {
  const context = useContext(HeaderCodeToggleContext);
  if (!context) {
    throw new Error(
      'HeaderCodeToggle components must be used within HeaderCodeToggleProvider'
    );
  }
  return context;
};

interface HeaderCodeToggleProviderProps {
  children: ReactNode;
  defaultView?: 'component' | 'code';
}

const HeaderCodeToggleProvider: FunctionComponent<
  HeaderCodeToggleProviderProps
> = ({ children, defaultView = 'component' }) => {
  const [view, setView] = useState<'component' | 'code'>(defaultView);

  const toggleView = useCallback(() => {
    setView(prev => (prev === 'component' ? 'code' : 'component'));
  }, []);

  const setViewDirect = useCallback((newView: 'component' | 'code') => {
    setView(newView);
  }, []);

  const value = useMemo(
    () => ({
      isCodeView: view === 'code',
      setView: setViewDirect,
      toggleView,
      view,
    }),
    [view, toggleView, setViewDirect]
  );

  return (
    <HeaderCodeToggleContext.Provider value={value}>
      {children}
    </HeaderCodeToggleContext.Provider>
  );
};

interface HeaderCodeToggleButtonProps {
  className?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const HeaderCodeToggleButton: FunctionComponent<
  HeaderCodeToggleButtonProps
> = ({ className, label, size = 'sm' }) => {
  const { isCodeView, setView } = useHeaderCodeToggle();

  const switchLabel = useMemo(() => {
    if (label) return label;
    return isCodeView ? 'Show Preview' : 'Show Code';
  }, [isCodeView, label]);

  const handleChange = useCallback(
    (checked: boolean) => {
      // Switch checked state: true = code view, false = component view
      setView(checked ? 'code' : 'component');
    },
    [setView]
  );

  return (
    <div
      className={classNames('header-code-toggle__switch-wrapper', className)}
    >
      <Switch
        checked={isCodeView}
        onChange={handleChange}
        label={switchLabel}
        size={size}
        aria-label={isCodeView ? 'Show preview' : 'Show code'}
        style={{ transform: 'scale(0.9)', transformOrigin: 'right center' }}
      />
    </div>
  );
};

interface HeaderCodeToggleContentProps {
  children: ReactNode;
  code: string | ReactNode;
  language?: string;
  componentName?: string;
  showLineNumbers?: boolean;
  className?: string;
}

const HeaderCodeToggleContent: FunctionComponent<
  HeaderCodeToggleContentProps
> = ({
  children,
  code,
  language = 'tsx',
  componentName,
  showLineNumbers = true,
  className,
}) => {
  const { view, isCodeView } = useHeaderCodeToggle();

  const fullCode = useMemo(() => {
    const codeString = typeof code === 'string' ? code : String(code);
    if (componentName) {
      return `import { ${componentName} } from "react-creme";\n\n${codeString}`;
    }
    return codeString;
  }, [code, componentName]);

  return (
    <div
      className={classNames('header-code-toggle__content', className, {
        'is-code-view': isCodeView,
        'is-component-view': !isCodeView,
      })}
    >
      <div className="header-code-toggle__view-wrapper">
        {view === 'component' && (
          <div className="header-code-toggle__component-view">{children}</div>
        )}
        {view === 'code' && (
          <div className="header-code-toggle__code-view">
            <SyntaxHighLighter
              code={fullCode}
              language={language as SupportedLanguage}
              showLineNumbers={showLineNumbers}
              wrap={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

interface HeaderCodeToggleProps {
  code: string | ReactNode;
  language?: string;
  componentName?: string;
  children: ReactNode;
  label?: string;
  showLineNumbers?: boolean;
  defaultView?: 'component' | 'code';
  className?: string;
}

/**
 * HeaderCodeToggle - Component for toggling between component and code views
 *
 * Provides a button for the header and content wrapper that conditionally renders
 * either the component or the code view.
 *
 * Usage pattern:
 * ```tsx
 * <HeaderCodeToggle.Provider>
 *   <Section
 *     title="Example"
 *     headerActions={<HeaderCodeToggle.Button />}
 *   >
 *     <HeaderCodeToggle.Content
 *       code={jsxToString(Component)}
 *       componentName="Button"
 *     >
 *       <Button>Click me</Button>
 *     </HeaderCodeToggle.Content>
 *   </Section>
 * </HeaderCodeToggle.Provider>
 * ```
 */
const HeaderCodeToggle: FunctionComponent<HeaderCodeToggleProps> = ({
  code,
  language = 'tsx',
  componentName,
  children,
  label,
  showLineNumbers = true,
  defaultView = 'component',
  className,
}) => {
  return (
    <HeaderCodeToggleProvider defaultView={defaultView}>
      <div className={classNames('header-code-toggle', className)}>
        <HeaderCodeToggleButton label={label} />
        <HeaderCodeToggleContent
          code={code}
          language={language}
          componentName={componentName}
          showLineNumbers={showLineNumbers}
        >
          {children}
        </HeaderCodeToggleContent>
      </div>
    </HeaderCodeToggleProvider>
  );
};

// Create a properly typed export with sub-components
interface HeaderCodeToggleComponent extends FunctionComponent<HeaderCodeToggleProps> {
  Button: typeof HeaderCodeToggleButton;
  Content: typeof HeaderCodeToggleContent;
  Provider: typeof HeaderCodeToggleProvider;
}

const HeaderCodeToggleWithSubComponents =
  HeaderCodeToggle as HeaderCodeToggleComponent;

HeaderCodeToggleWithSubComponents.Button = HeaderCodeToggleButton;
HeaderCodeToggleWithSubComponents.Content = HeaderCodeToggleContent;
HeaderCodeToggleWithSubComponents.Provider = HeaderCodeToggleProvider;

export { HeaderCodeToggleWithSubComponents as HeaderCodeToggle };
export type { HeaderCodeToggleProps };
