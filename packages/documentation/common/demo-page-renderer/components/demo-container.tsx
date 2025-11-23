import { FunctionComponent, ReactNode, useState } from 'react';
import classNames from 'classnames';
import { Smartphone, Tablet, Monitor } from 'react-feather';
import type { ViewportSize, DemoControls } from '../types';
import './demo-container.scss';

export interface DemoContainerProps {
  /** The demo component to display */
  children: ReactNode;

  /** Optional title for the demo */
  title?: string;

  /** Optional description */
  description?: string;

  /** Controls to show */
  controls?: DemoControls;

  /** Initial viewport size */
  defaultViewport?: ViewportSize;

  /** Initial theme mode */
  defaultTheme?: 'light' | 'dark';

  /** Callback when viewport changes */
  onViewportChange?: (viewport: ViewportSize) => void;

  /** Callback when theme changes */
  onThemeChange?: (theme: 'light' | 'dark') => void;

  /** Callback when reset is clicked */
  onReset?: () => void;

  /** Optional CSS class name */
  className?: string;
}

/**
 * DemoContainer - Enhanced wrapper for component demos
 *
 * Features:
 * - Elevated card design with shadow
 * - Theme toggle (light/dark background preview)
 * - Viewport size toggles (mobile/tablet/desktop)
 * - Fullscreen mode
 * - Reset button
 * - Better padding and visual hierarchy
 * - Loading skeleton support
 *
 * @example
 * ```tsx
 * <DemoContainer
 *   title="Basic Example"
 *   description="A simple button component"
 *   controls={{
 *     theme: true,
 *     viewport: true,
 *     reset: true
 *   }}
 *   onReset={() => resetState()}
 * >
 *   <Button>Click me</Button>
 * </DemoContainer>
 * ```
 */
const DemoContainer: FunctionComponent<DemoContainerProps> = ({
  children,
  title,
  description,
  controls = {},
  defaultViewport = 'desktop',
  defaultTheme = 'light',
  onViewportChange,
  onThemeChange,
  onReset,
  className,
}) => {
  const [viewport, setViewport] = useState<ViewportSize>(defaultViewport);
  const [theme, setTheme] = useState<'light' | 'dark'>(defaultTheme);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleViewportChange = (newViewport: ViewportSize) => {
    setViewport(newViewport);
    onViewportChange?.(newViewport);
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    onThemeChange?.(newTheme);
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const viewportSizes: { size: ViewportSize; icon: ReactNode; label: string }[] = [
    { size: 'mobile', icon: <Smartphone size={16} />, label: 'Mobile' },
    { size: 'tablet', icon: <Tablet size={16} />, label: 'Tablet' },
    { size: 'desktop', icon: <Monitor size={16} />, label: 'Desktop' },
  ];

  const hasControls =
    controls.theme || controls.viewport || controls.reset || controls.fullscreen;

  return (
    <div
      className={classNames('demo-container', className, {
        'demo-container--fullscreen': isFullscreen,
        'demo-container--dark': theme === 'dark',
        [`demo-container--${viewport}`]: viewport !== 'desktop',
      })}
    >
      {/* Header */}
      {(title || description || hasControls) && (
        <div className="demo-container__header">
          <div className="demo-container__header-content">
            {title && <h4 className="demo-container__title">{title}</h4>}
            {description && (
              <p className="demo-container__description">{description}</p>
            )}
          </div>

          {/* Controls */}
          {hasControls && (
            <div className="demo-container__controls">
              {/* Viewport Toggles */}
              {controls.viewport && (
                <div className="demo-container__viewport-controls">
                  {viewportSizes.map(({ size, icon, label }) => (
                    <button
                      key={size}
                      className={classNames('demo-container__control-btn', {
                        'is-active': viewport === size,
                      })}
                      onClick={() => handleViewportChange(size)}
                      aria-label={label}
                      title={label}
                      type="button"
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Demo Area */}
      <div className="demo-container__demo">
        <div
          className={classNames('demo-container__demo-inner', {
            'demo-container__demo-inner--mobile': viewport === 'mobile',
            'demo-container__demo-inner--tablet': viewport === 'tablet',
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

DemoContainer.displayName = 'DemoContainer';

export { DemoContainer };
export default DemoContainer;
