import { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Check } from 'react-feather';
import type { ComponentVariant, VariantLayout } from '../types';
import './variant-selector.scss';

export interface VariantSelectorProps {
  /** Available variants */
  variants: ComponentVariant[];

  /** Currently active variant ID */
  activeVariant: string;

  /** Callback when variant changes */
  onChange: (variantId: string) => void;

  /** Layout style */
  layout?: VariantLayout;

  /** Optional CSS class name */
  className?: string;
}

/**
 * VariantSelector - Switch between component variants
 *
 * Features:
 * - Grid or list layout
 * - Active state indicator
 * - Keyboard navigation (arrow keys)
 * - Description tooltips
 * - Smooth transitions
 *
 * @example
 * ```tsx
 * <VariantSelector
 *   variants={[
 *     { id: 'default', title: 'Default', ... },
 *     { id: 'large', title: 'Large Size', ... }
 *   ]}
 *   activeVariant="default"
 *   onChange={(id) => setActiveVariant(id)}
 *   layout="grid"
 * />
 * ```
 */
const VariantSelector: FunctionComponent<VariantSelectorProps> = ({
  variants,
  activeVariant,
  onChange,
  layout = 'tabs',
  className,
}) => {
  if (variants.length <= 1) {
    return null;
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const { key } = e;
    let nextIndex = index;

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      nextIndex = index > 0 ? index - 1 : variants.length - 1;
      e.preventDefault();
    } else if (key === 'ArrowRight' || key === 'ArrowDown') {
      nextIndex = index < variants.length - 1 ? index + 1 : 0;
      e.preventDefault();
    } else if (key === 'Home') {
      nextIndex = 0;
      e.preventDefault();
    } else if (key === 'End') {
      nextIndex = variants.length - 1;
      e.preventDefault();
    }

    if (nextIndex !== index) {
      onChange(variants[nextIndex]!.id);
    }
  };

  return (
    <div
      className={classNames('variant-selector', className, {
        [`variant-selector--${layout}`]: layout,
      })}
      role="tablist"
      aria-label="Component variants"
    >
      {variants.map((variant, index) => {
        const isActive = variant.id === activeVariant;

        return (
          <button
            key={variant.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`variant-panel-${variant.id}`}
            className={classNames('variant-selector__item', {
              'is-active': isActive,
            })}
            onClick={() => onChange(variant.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            type="button"
            title={variant.description}
          >
            {isActive && (
              <Check size={16} className="variant-selector__item-check" />
            )}
            <span className="variant-selector__item-title">{variant.title}</span>
            {variant.description && layout !== 'tabs' && (
              <span className="variant-selector__item-description">
                {variant.description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

VariantSelector.displayName = 'VariantSelector';

export { VariantSelector };
export default VariantSelector;
