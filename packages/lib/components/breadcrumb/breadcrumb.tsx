import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useKeyNavigation } from '../common/effects/useKeyNavigation';
import { BreadCrumbItem } from './breadcrumb-item';
import { BreadCrumbProps } from './breadcrumb-model';
import styles from './breadcrumb.module.scss';

/**
 * BreadCrumb Component
 *
 * A hierarchical navigation component that displays the user's current location within a site
 * structure and enables quick navigation back to parent pages. Breadcrumbs show the path from
 * the root to the current page, improving user wayfinding and reducing cognitive load.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with callback
 * <BreadCrumb
 *   links={['Home', 'Products', 'Electronics', 'Phones']}
 *   onSelected={(item) => navigate(`/${item.toLowerCase()}`)}
 * />
 *
 * // With custom styling
 * <BreadCrumb
 *   links={['Dashboard', 'Analytics', 'Reports']}
 *   icon="arrow"
 *   size="lg"
 *   selectedCrumbIndex={2}
 * />
 *
 * // RTL layout for international apps
 * <BreadCrumb
 *   links={['الرئيسية', 'المنتجات', 'الهواتف']}
 *   icon="chevron"
 *   RTL
 * />
 * ```
 *
 * @features
 * - **Keyboard Navigation**: Full arrow key support (Left/Right, Home, End) for efficient navigation
 * - **Customizable Separators**: Choose between chevron (›), arrow (→), or slash (—) icons
 * - **Size Variants**: Three sizes (sm, md, lg) to match different design requirements
 * - **RTL Support**: Automatic layout reversal for right-to-left languages
 * - **Accessibility**: WCAG 2.1 AA compliant with semantic HTML, ARIA attributes, and screen reader support
 * - **Performance**: Optimized with React.memo and useMemo for minimal re-renders
 *
 * @accessibility
 * - Uses semantic `<nav>` element with `aria-label="Breadcrumb"`
 * - Current page marked with `aria-current="page"` on last item
 * - Keyboard navigable with arrow keys and standard key commands
 * - Screen reader announces navigation hierarchy
 * - Focusable with visible focus indicators
 *
 * @param {BreadCrumbProps} props - Component properties
 * @param {string[]} props.links - **Required.** Array of breadcrumb labels (e.g., ['Home', 'Products', 'Item'])
 * @param {function} [props.onSelected] - Callback invoked when user clicks or navigates to a breadcrumb
 * @param {'chevron' | 'arrow' | 'slash'} [props.icon='chevron'] - Separator icon style
 * @param {'sm' | 'md' | 'lg'} [props.size='sm'] - Visual size of breadcrumb
 * @param {boolean} [props.focusable=true] - Enables keyboard navigation
 * @param {number} [props.selectedCrumbIndex=0] - Index of initially selected item
 * @param {boolean} [props.RTL=false] - Right-to-left layout mode
 *
 * @returns {React.ReactElement | null} Breadcrumb navigation or null if no links provided
 */
const BreadCrumb: React.FunctionComponent<BreadCrumbProps> = React.memo(
  ({
    onSelected,
    icon = 'chevron',
    size = 'sm',
    focusable = true,
    selectedCrumbIndex = 0,
    links = [],
    RTL = false,
  }) => {
    const breadcrumbRef = useRef<HTMLUListElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(selectedCrumbIndex);
    const [parentHasFocus, setParentHasFocus] = useState(false);
    const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    // Derive items from props (removes props-to-state anti-pattern)
    const items = useMemo(
      () =>
        links.map((link, index) => ({
          id: nanoid(),
          name: link,
          selected: currentIndex === index,
        })),
      [links, currentIndex]
    );

    // Handle selection by index
    const handleNavigate = useCallback(
      (index: number) => {
        setCurrentIndex(index);
        onSelected?.(links[index]);
      },
      [links, onSelected]
    );

    // Handle selection by name (from click)
    const handleSelection = useCallback(
      (index: number, name: string) => {
        setCurrentIndex(index);
        onSelected?.(name);
      },
      [onSelected]
    );

    // Enhanced keyboard navigation with horizontal support
    const { setSelection } = useKeyNavigation(
      breadcrumbRef as React.RefObject<HTMLElement>,
      currentIndex,
      items.length,
      {
        onNavigate: handleNavigate,
        orientation: 'horizontal',
        rtl: RTL,
        wrap: false,
      },
      focusable
    );

    // Track focus state for programmatic focus
    // Note: We don't use useFocusNew on the container since it adds a span
    // directly inside the ul, which violates HTML semantics (ul can only have li as direct children)
    useEffect(() => {
      const handleFocus = () => setParentHasFocus(true);
      const handleBlur = () => setParentHasFocus(false);

      const element = breadcrumbRef.current;
      if (element) {
        element.addEventListener('focus', handleFocus);
        element.addEventListener('blur', handleBlur);

        return () => {
          element.removeEventListener('focus', handleFocus);
          element.removeEventListener('blur', handleBlur);
        };
      }
    }, []);

    // Programmatic focus management (following TabHead pattern)
    useEffect(() => {
      if (parentHasFocus && itemRefs.current[currentIndex]) {
        itemRefs.current[currentIndex]?.focus();
      }
    }, [currentIndex, parentHasFocus]);

    // Sync external selection changes
    useEffect(() => {
      setSelection(currentIndex);
    }, [currentIndex, setSelection]);

    const wrapperClass = useMemo(
      () => classNames(styles.bread_crumbs_wrapper, { [styles.rtl]: RTL }),
      [RTL]
    );

    // Handle empty links gracefully
    if (links.length === 0) {
      return null;
    }

    return (
      <nav aria-label="Breadcrumb">
        <ul className={wrapperClass} ref={breadcrumbRef}>
          {items.map(({ id, selected, name }, index) => (
            <BreadCrumbItem
              id={id}
              onSelected={handleSelection}
              showChevron={index < items.length - 1}
              key={id}
              icon={icon}
              size={size}
              selected={selected}
              index={index}
              focusable={focusable}
              name={name}
              RTL={RTL}
              isLast={index === items.length - 1}
              ref={el => {
                itemRefs.current[index] = el;
              }}
            />
          ))}
        </ul>
      </nav>
    );
  }
);

BreadCrumb.displayName = 'BreadCrumb';

export { BreadCrumb };
