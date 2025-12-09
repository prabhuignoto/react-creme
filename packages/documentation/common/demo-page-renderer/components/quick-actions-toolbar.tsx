import { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Copy, Code, ExternalLink, RotateCcw, Maximize2 } from 'lucide-react';
import type { QuickAction } from '../types';
import './quick-actions-toolbar.scss';

export interface QuickActionsToolbarProps {
  /** Callback when copy code action is triggered */
  onCopyCode?: () => void;

  /** Callback when toggle code panel action is triggered */
  onToggleCode?: () => void;

  /** Callback when open StackBlitz action is triggered */
  onOpenStackBlitz?: () => void;

  /** Callback when reset demo action is triggered */
  onReset?: () => void;

  /** Callback when fullscreen action is triggered */
  onFullscreen?: () => void;

  /** Whether interactive playground is available */
  hasInteractive?: boolean;

  /** Whether code panel is currently open */
  isCodePanelOpen?: boolean;

  /** Disabled actions */
  disabledActions?: QuickAction[];

  /** Optional CSS class name */
  className?: string;

  /** Show keyboard shortcuts in tooltips */
  showShortcuts?: boolean;
}

interface ActionButton {
  action: QuickAction;
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
  onClick?: () => void;
  disabled?: boolean;
  requiresInteractive?: boolean;
}

/**
 * QuickActionsToolbar - Action buttons for demo interactions
 *
 * Features:
 * - Copy code to clipboard
 * - Toggle floating code panel
 * - Open in StackBlitz
 * - Reset demo state
 * - Fullscreen mode
 * - Keyboard shortcuts display
 * - Visual feedback on actions
 *
 * @example
 * ```tsx
 * <QuickActionsToolbar
 *   onCopyCode={() => copyToClipboard(code)}
 *   onToggleCode={() => setCodePanelOpen(!isOpen)}
 *   onOpenStackBlitz={() => window.open(url)}
 *   onReset={() => resetDemoState()}
 *   hasInteractive={true}
 *   showShortcuts={true}
 * />
 * ```
 */
const QuickActionsToolbar: FunctionComponent<QuickActionsToolbarProps> = ({
  onCopyCode,
  onToggleCode,
  onOpenStackBlitz,
  onReset,
  onFullscreen,
  hasInteractive = false,
  isCodePanelOpen = false,
  disabledActions = [],
  className,
  showShortcuts = true,
}) => {
  const actions: ActionButton[] = [
    {
      action: 'copy-code',
      disabled: disabledActions.includes('copy-code'),
      icon: <Copy size={18} />,
      label: 'Copy Code',
      onClick: onCopyCode,
      shortcut: showShortcuts ? '⌘C' : undefined,
    },
    {
      action: 'toggle-code-panel',
      disabled: disabledActions.includes('toggle-code-panel'),
      icon: <Code size={18} />,
      label: isCodePanelOpen ? 'Hide Code' : 'Show Code',
      onClick: onToggleCode,
      shortcut: showShortcuts ? '⌘K' : undefined,
    },
    {
      action: 'open-stackblitz',
      disabled: disabledActions.includes('open-stackblitz') || !hasInteractive,
      icon: <ExternalLink size={18} />,
      label: 'Open in StackBlitz',
      onClick: onOpenStackBlitz,
      requiresInteractive: true,
      shortcut: showShortcuts ? '⌘O' : undefined,
    },
    {
      action: 'reset-demo',
      disabled: disabledActions.includes('reset-demo'),
      icon: <RotateCcw size={18} />,
      label: 'Reset Demo',
      onClick: onReset,
      shortcut: showShortcuts ? '⌘R' : undefined,
    },
    {
      action: 'fullscreen',
      disabled: disabledActions.includes('fullscreen'),
      icon: <Maximize2 size={18} />,
      label: 'Fullscreen',
      onClick: onFullscreen,
      shortcut: showShortcuts ? '⌘F' : undefined,
    },
  ];

  // Filter out actions that require interactive but it's not available
  const visibleActions = actions.filter(
    action => !action.requiresInteractive || hasInteractive
  );

  return (
    <div className={classNames('quick-actions-toolbar', className)}>
      <div className="quick-actions-toolbar__actions">
        {visibleActions.map(action => (
          <button
            key={action.action}
            className={classNames('quick-actions-toolbar__button', {
              'is-active':
                action.action === 'toggle-code-panel' && isCodePanelOpen,
              'is-disabled': action.disabled,
            })}
            onClick={action.onClick}
            disabled={action.disabled}
            title={
              action.shortcut
                ? `${action.label} (${action.shortcut})`
                : action.label
            }
            aria-label={action.label}
            type="button"
          >
            <span className="quick-actions-toolbar__button-icon">
              {action.icon}
            </span>
            <span className="quick-actions-toolbar__button-label">
              {action.label}
            </span>
            {action.shortcut && (
              <span className="quick-actions-toolbar__button-shortcut">
                {action.shortcut}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

QuickActionsToolbar.displayName = 'QuickActionsToolbar';

export { QuickActionsToolbar };
export default QuickActionsToolbar;
