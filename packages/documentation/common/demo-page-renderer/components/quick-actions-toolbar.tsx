import { FunctionComponent } from 'react';
import classNames from 'classnames';
import {
  Copy,
  Code,
  ExternalLink,
  RotateCcw,
  Maximize2,
} from 'react-feather';
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
      icon: <Copy size={18} />,
      label: 'Copy Code',
      shortcut: showShortcuts ? '⌘C' : undefined,
      onClick: onCopyCode,
      disabled: disabledActions.includes('copy-code'),
    },
    {
      action: 'toggle-code-panel',
      icon: <Code size={18} />,
      label: isCodePanelOpen ? 'Hide Code' : 'Show Code',
      shortcut: showShortcuts ? '⌘K' : undefined,
      onClick: onToggleCode,
      disabled: disabledActions.includes('toggle-code-panel'),
    },
    {
      action: 'open-stackblitz',
      icon: <ExternalLink size={18} />,
      label: 'Open in StackBlitz',
      shortcut: showShortcuts ? '⌘O' : undefined,
      onClick: onOpenStackBlitz,
      disabled: disabledActions.includes('open-stackblitz') || !hasInteractive,
      requiresInteractive: true,
    },
    {
      action: 'reset-demo',
      icon: <RotateCcw size={18} />,
      label: 'Reset Demo',
      shortcut: showShortcuts ? '⌘R' : undefined,
      onClick: onReset,
      disabled: disabledActions.includes('reset-demo'),
    },
    {
      action: 'fullscreen',
      icon: <Maximize2 size={18} />,
      label: 'Fullscreen',
      shortcut: showShortcuts ? '⌘F' : undefined,
      onClick: onFullscreen,
      disabled: disabledActions.includes('fullscreen'),
    },
  ];

  // Filter out actions that require interactive but it's not available
  const visibleActions = actions.filter(
    (action) => !action.requiresInteractive || hasInteractive
  );

  return (
    <div className={classNames('quick-actions-toolbar', className)}>
      <div className="quick-actions-toolbar__actions">
        {visibleActions.map((action) => (
          <button
            key={action.action}
            className={classNames('quick-actions-toolbar__button', {
              'is-disabled': action.disabled,
              'is-active': action.action === 'toggle-code-panel' && isCodePanelOpen,
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
