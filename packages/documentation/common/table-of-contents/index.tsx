import { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import cx from 'classnames';
import styles from './table-of-contents.module.scss';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  /**
   * CSS selector for the container to search for headings
   * @default '.section-content'
   */
  containerSelector?: string;

  /**
   * Heading levels to include (e.g., ['h2', 'h3'])
   * @default ['h2', 'h3']
   */
  headingLevels?: string[];

  /**
   * Offset from top for active heading detection
   * @default 100
   */
  scrollOffset?: number;
}

/**
 * Modern Table of Contents component with scroll spy functionality
 *
 * Features:
 * - Automatically extracts headings from page
 * - Active section highlighting based on scroll position
 * - Smooth scroll on click with hash URL updates
 * - Intersection Observer for performance
 * - Responsive with smooth animations
 * - Re-extracts headings on route changes
 */
export function TableOfContents({
  containerSelector = '.section-content',
  headingLevels = ['h2', 'h3'],
  scrollOffset = 100,
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const location = useLocation();

  // Extract headings from the page
  useEffect(() => {
    let observer: MutationObserver | null = null;
    let debounceTimer: NodeJS.Timeout | null = null;

    // Retry logic to wait for content to be rendered
    let retryCount = 0;
    const maxRetries = 10; // Try for up to 1 second (100ms * 10)

    const extractHeadings = () => {
      const container = document.querySelector(containerSelector);

      if (!container) {
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(extractHeadings, 100);
        } else {
          setHeadings([]);
        }
        return;
      }

      // Setup MutationObserver to watch for lazy-loaded content
      if (!observer) {
        observer = new MutationObserver(() => {
          // Debounce to avoid excessive re-extraction
          if (debounceTimer) {
            clearTimeout(debounceTimer);
          }
          debounceTimer = setTimeout(() => {
            performExtraction(container);
          }, 300);
        });

        observer.observe(container, {
          childList: true,
          subtree: true,
        });
      }

      performExtraction(container);
    };

    const performExtraction = (container: Element) => {
      const headingSelector = headingLevels.join(', ');
      const headingElements = container.querySelectorAll<HTMLHeadingElement>(headingSelector);

      const extractedHeadings: Heading[] = Array.from(headingElements)
        .filter(heading => {
          // Only include actual h2/h3 HTML elements (not divs with role="heading")
          const tagName = heading.tagName.toLowerCase();
          if (!['h2', 'h3'].includes(tagName)) {
            return false;
          }

          // Filter out empty headings or headings with only whitespace
          const text = heading.textContent?.trim();
          if (!text || text.length === 0) {
            return false;
          }

          // Always include h2 page titles (from PageHeader component)
          if (tagName === 'h2') {
            return true;
          }

          // For h3 elements, check if they're Section component headings
          // Section components add 'rc-component-widget-heading' class
          const isSectionHeading = heading.classList.contains('rc-component-widget-heading');
          if (isSectionHeading) {
            return true;
          }

          // Allow h3 headings inside property/callback sections
          const isInPropertySection = heading.closest('.rc-demo-prop-section');
          if (isInPropertySection) {
            return true;
          }

          // Exclude h3 headings that are rendered inside actual demo components
          // (not Section wrappers, but the actual component demos)
          const excludedParentSelectors = [
            '.rc-accordion-body',      // Content inside accordions
            '.rc-demo-code-block',     // Code blocks
            '.sandpack-demo-container', // Sandpack demos
          ];

          for (const selector of excludedParentSelectors) {
            if (heading.closest(selector)) {
              return false;
            }
          }

          // Include other h3 headings
          return true;
        })
        .map((heading, index) => {
          // Generate ID if it doesn't exist
          if (!heading.id) {
            const text = heading.textContent || '';
            const id = text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '');
            heading.id = id || `heading-${index}`;
          }

          return {
            id: heading.id,
            text: heading.textContent?.trim() || '',
            level: parseInt(heading.tagName[1] || '2', 10),
          };
        });

      setHeadings(extractedHeadings);
    };

    // Start extraction with initial delay
    const timer = setTimeout(extractHeadings, 100);

    return () => {
      clearTimeout(timer);
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      if (observer) {
        observer.disconnect();
      }
    };
  }, [containerSelector, headingLevels, location.pathname]);

  // Scroll spy with Intersection Observer
  useEffect(() => {
    if (headings.length === 0) return;

    const observerOptions = {
      rootMargin: `-${scrollOffset}px 0px -80% 0px`,
      threshold: [0, 1],
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [headings, scrollOffset]);

  // Smooth scroll to heading
  const scrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const yOffset = -scrollOffset;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });

    // Update URL hash without jumping
    history.pushState(null, '', `#${id}`);
    setActiveId(id);
  }, [scrollOffset]);

  // Group headings by level for indentation
  const groupedHeadings = useMemo(() => {
    if (headings.length === 0) return [];

    const minLevel = Math.min(...headings.map(h => h.level));
    return headings.map(heading => ({
      ...heading,
      indent: heading.level - minLevel,
    }));
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className={styles.toc} aria-label="Table of contents">
      <h2 className={styles.toc_title}>On this page</h2>
      <ul className={styles.toc_list}>
        {groupedHeadings.map(({ id, text, indent }) => (
          <li
            key={id}
            className={cx(styles.toc_item, {
              [styles.active]: activeId === id,
              [styles.indent_1]: indent === 1,
              [styles.indent_2]: indent === 2,
              [styles.indent_3]: indent >= 3,
            })}
          >
            <a
              href={`#${id}`}
              className={styles.toc_link}
              onClick={(e) => {
                e.preventDefault();
                scrollToHeading(id);
              }}
              aria-current={activeId === id ? 'location' : undefined}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TableOfContents;
