import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRecoilValue } from 'recoil';
import { useDebouncedCallback } from 'use-debounce';
import { themeState } from '../../atoms/home';
import './widget-wrapper.scss';

type Link = {
  id: string;
  label: string;
  selected?: boolean;
};

const WidgetsWrapper: React.FunctionComponent<{
  children: ReactNode[] | ReactNode;
}> = ({ children }) => {
  const ref = useRef(null);

  const [links, setLinks] = useState<Link[]>([]);
  const resizeObserver = useRef<ResizeObserver>(null);

  const [scrollPosition, setScrollPosition] = useState(0);

  const { darkMode } = useRecoilValue(themeState);

  const currentRect = useRef<DOMRect>(null);
  const scrollDirection = useRef<'up' | 'down' | null>(null);

  const setupLinks = useDebouncedCallback(() => {
    const headings: HTMLElement[] = Array.from(
      ref.current.querySelectorAll('[role="heading"]')
    );

    setLinks(
      headings.map(head => ({
        id: head.id,
        label: head.textContent,
      }))
    );
  }, 100);

  const handleClick = useCallback((id: string) => {
    const element = ref.current.querySelector(`#${id}`);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      setLinks(prev =>
        prev.map(link => ({
          ...link,
          selected: link.id === id,
        }))
      );
    }
  }, []);

  const onWidgetsRendered = useCallback(node => {
    if (node) {
      ref.current = node;
      resizeObserver.current = new ResizeObserver(() => {
        setupLinks();
      });

      resizeObserver.current.observe(node);
    }
  }, []);

  const onLinksRendered = useCallback(node => {
    if (node) {
      setTimeout(() => {
        currentRect.current = node.getBoundingClientRect();
      }, 500);
    }
  }, []);

  const handleScroll = useCallback(() => {
    scrollDirection.current = scrollPosition > window.scrollY ? 'up' : 'down';
    // setScrollPosition(window.scrollY);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getTop = useMemo(() => {
    if (currentRect.current) {
      const { height, bottom } = currentRect.current;
      const dir = scrollDirection.current;
      const top =
        dir === 'up'
          ? scrollPosition - bottom + 10
          : scrollPosition - height + 10;
      return top > 0 ? top + 10 : 0;
    }
  }, [scrollPosition]);

  return (
    <div className="rc-doc-widgets-wrapper">
      <div className="rc-doc-widgets-collection" ref={onWidgetsRendered}>
        {children}
      </div>
      {links.length ? (
        <div className="rc-doc-links-container">
          <div
            className={classNames(
              'rc-doc-links-wrapper',
              darkMode ? 'dark' : ''
            )}
            style={{ top: `${getTop}px` }}
            ref={onLinksRendered}
          >
            <header
              className={classNames(
                'rc-doc-links-header',
                darkMode ? 'dark' : ''
              )}
            >
              Table of Contents
            </header>
            {links.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={classNames(
                  'rc-doc-link',
                  {
                    selected: link.selected,
                  },
                  darkMode ? 'dark' : ''
                )}
                onClick={ev => {
                  ev.preventDefault();
                  handleClick(link.id);
                }}
              >
                <span
                  className={classNames(
                    'rc-link-icon',
                    link.selected ? 'selected' : '',
                    darkMode ? 'dark' : ''
                  )}
                >
                  <FontAwesomeIcon icon={faCircle} />
                </span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default WidgetsWrapper;
