import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { isDark } from '../common/utils';
import {
  ScrollSpyContent,
  ScrollSpyLinkInternal,
  ScrollSpyProps,
} from './scroll-spy.model';
import styles from './scroll-spy.module.scss';

/**
 * ScrollSpy Component
 *
 * A navigation component that highlights menu items as you scroll through content sections.
 * Provides keyboard navigation, touch-friendly targets, and responsive design.
 *
 * @example
 * ```tsx
 * <ScrollSpy
 *   links={['Introduction', 'Features', 'Installation']}
 *   linksPosition="left"
 *   size="md"
 * >
 *   <div>Introduction content...</div>
 *   <div>Features content...</div>
 *   <div>Installation content...</div>
 * </ScrollSpy>
 * ```
 */
const ScrollSpy: React.FC<ScrollSpyProps> = ({
  links = [],
  children = [],
  linksPosition = 'left',
  showSectionTitle = true,
  size = 'md',
  className,
  ariaLabel = 'Table of Contents',
  offsetTop = 0,
}) => {
  const scrollSpyContentRef = useRef<HTMLDivElement | null>(null);
  const spy = useRef<IntersectionObserver | null>(null);

  // Tracks the scroll direction
  const scrollDirection = useRef<'up' | 'down' | null>(null);

  // Tracks the last selected link index
  const lastSelectedIndex = useRef<number>(0);

  // Derive dark mode directly (no need for useMemo)
  const isDarkMode = isDark();

  // Generate stable IDs for links (derived from props)
  const scrollSpyLinks = useMemo<ScrollSpyLinkInternal[]>(
    () =>
      links.map(link => ({
        active: false,
        id: `spy-${nanoid()}`,
        name: link,
      })),
    [links]
  );

  // State to track active sections (hash timestamps for each section)
  const [activeSections, setActiveSections] = useState<Map<string, number>>(
    new Map()
  );

  // Derive content data from props and scrollSpyLinks
  const contents = useMemo<ScrollSpyContent[]>(() => {
    const childArray = Array.isArray(children) ? children : [children];
    return childArray.map((_, index) => ({
      active: activeSections.has(scrollSpyLinks[index]?.id ?? ''),
      hash: activeSections.get(scrollSpyLinks[index]?.id ?? '') ?? 0,
      id: scrollSpyLinks[index]?.id ?? `spy-${nanoid()}`,
    }));
  }, [children, scrollSpyLinks, activeSections]);

  // Function to handle ref and set up the IntersectionObserver
  const onRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      scrollSpyContentRef.current = node;
      spy.current = new IntersectionObserver(
        entries => {
          setActiveSections(prev => {
            const newMap = new Map(prev);
            entries.forEach(entry => {
              const id = entry.target.id;
              if (entry.isIntersecting) {
                // Section is visible, add/update timestamp
                newMap.set(id, Date.now());
              } else {
                // Section is not visible, remove from active set
                newMap.delete(id);
              }
            });
            return newMap;
          });
        },
        {
          root: node,
        }
      );

      const items = scrollSpyContentRef.current.querySelectorAll(
        '.' + styles.header
      );

      if (items) {
        items.forEach(item => {
          spy.current?.observe(item);
        });
      }
    }
  }, []);

  // Derive the currently active link based on visible sections
  const activeId = useMemo(() => {
    const activeSectionsArray = contents
      .filter(c => c.active)
      .sort((a, b) =>
        scrollDirection.current === 'up' ? b.hash - a.hash : a.hash - b.hash
      );

    const found = activeSectionsArray[0];
    if (found) {
      lastSelectedIndex.current = contents.findIndex(x => x.id === found.id);
      return found.id;
    }
    return null;
  }, [contents]);

  // Function to scroll to the selected section
  const handleScrollTo = useCallback(
    (id: string, index: number) => {
      if (lastSelectedIndex.current < index) {
        scrollDirection.current = 'down';
      } else {
        scrollDirection.current = 'up';
      }

      lastSelectedIndex.current = index;

      const element = scrollSpyContentRef.current?.querySelector(
        `#${id}`
      ) as HTMLElement;

      const ref = scrollSpyContentRef.current;

      if (element && ref) {
        ref.scrollTo({
          behavior: 'smooth',
          top: element.offsetTop - ref.offsetTop - offsetTop,
        });
      }
    },
    [offsetTop]
  );

  // Function to handle scroll wheel event
  const handleScroll = useCallback((ev: React.WheelEvent) => {
    if (ev.deltaY > 0) {
      scrollDirection.current = 'down';
    } else if (ev.deltaY < 0) {
      scrollDirection.current = 'up';
    }
  }, []);

  // Keyboard navigation handler for the navigation list
  const handleKeyDown = useCallback(
    (ev: React.KeyboardEvent, currentIndex: number) => {
      let targetIndex = currentIndex;

      switch (ev.key) {
        case 'ArrowDown':
          ev.preventDefault();
          targetIndex = Math.min(currentIndex + 1, scrollSpyLinks.length - 1);
          break;
        case 'ArrowUp':
          ev.preventDefault();
          targetIndex = Math.max(currentIndex - 1, 0);
          break;
        case 'Home':
          ev.preventDefault();
          targetIndex = 0;
          break;
        case 'End':
          ev.preventDefault();
          targetIndex = scrollSpyLinks.length - 1;
          break;
        case 'Enter':
        case ' ':
          ev.preventDefault();
          handleScrollTo(scrollSpyLinks[currentIndex]?.id ?? '', currentIndex);
          return;
        default:
          return;
      }

      // Focus the target button
      if (targetIndex !== currentIndex) {
        const buttons = document.querySelectorAll(`.${styles.list_item}`);
        const targetButton = buttons[targetIndex] as HTMLButtonElement;
        targetButton?.focus();
      }
    },
    [scrollSpyLinks, handleScrollTo]
  );

  const spyWrapperClass = useMemo(() => {
    return classNames(
      styles.wrapper,
      {
        [styles[`wrapper_${linksPosition}`]]: true,
        [styles[size]]: true,
      },
      className
    );
  }, [linksPosition, size, className]);

  return (
    <div className={spyWrapperClass}>
      <nav className={styles.aside} aria-label={ariaLabel}>
        <ul className={styles.list}>
          {scrollSpyLinks.map((link, index) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.id}>
                <button
                  type="button"
                  className={classNames(
                    styles.list_item,
                    isActive ? styles.active : '',
                    isDarkMode ? styles.dark : ''
                  )}
                  onClick={ev => {
                    ev.preventDefault();
                    handleScrollTo(link.id, index);
                  }}
                  onKeyDown={ev => handleKeyDown(ev, index)}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`Navigate to ${link.name}`}
                  tabIndex={0}
                >
                  {link.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={styles.content} ref={onRef} onWheel={handleScroll}>
        {contents.map((content, index) => {
          return (
            <div key={content.id} className={styles['content-item']}>
              {showSectionTitle && (
                <h4
                  className={classNames(styles.header, {
                    [styles.dark]: isDarkMode,
                  })}
                  id={content.id}
                >
                  {links[index]}
                </h4>
              )}
              {!showSectionTitle && (
                <div
                  className={classNames(styles.header, {
                    [styles.dark]: isDarkMode,
                  })}
                  id={content.id}
                  aria-hidden="true"
                  style={{ height: 0, overflow: 'hidden' }}
                />
              )}
              {Array.isArray(children) ? children[index] : children}
            </div>
          );
        })}
      </div>
    </div>
  );
};

ScrollSpy.displayName = 'ScrollSpy';

export { ScrollSpy };
