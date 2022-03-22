import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { isDark } from '../common/utils';
import {
  ScrollSpyContent,
  ScrollSpyLinkInternal,
  ScrollSpyProps,
} from './scroll-spy.model';
import styles from './scroll-spy.module.scss';

const ScrollSpy: React.FC<ScrollSpyProps> = ({
  links = [],
  children = [],
  linksPosition = 'left',
}) => {
  const scrollSpyContentRef = React.useRef<HTMLDivElement | null>(null);
  const spy = useRef<IntersectionObserver>();

  // tracks the scroll direction
  const scrollDirection = useRef<'up' | 'down'>();

  // tracks the last selected link index
  const lastSelectedIndex = useRef<number>(0);

  const isDarkMode = useMemo(() => isDark(), []);

  const [scrollSpyLinks, setScrollSpyLinks] = React.useState<
    ScrollSpyLinkInternal[]
  >(
    links.map(link => ({
      active: false,
      id: `spy-${nanoid()}`,
      name: link,
    }))
  );

  const [contents, setContents] = React.useState<ScrollSpyContent[]>(
    Array.isArray(children)
      ? children.map((_, index) => ({
          active: false,
          hash: 0,
          id: scrollSpyLinks[index].id,
        }))
      : [
          {
            active: false,
            hash: 0,
            id: scrollSpyLinks[0].id,
          },
        ]
  );

  const onRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      scrollSpyContentRef.current = node;
      spy.current = new IntersectionObserver(
        entries => {
          const ids = entries.map(entry => [
            entry.target.id,
            entry.isIntersecting,
          ]) as [string, boolean][];

          setContents(prev =>
            prev.map(content => {
              const found = ids.find(id => id[0] === content.id) as [
                string,
                boolean
              ];

              return found
                ? {
                    ...content,
                    active: found[1],
                    hash: found && found[1] ? Date.now() : content.hash,
                  }
                : content;
            })
          );
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

  useEffect(() => {
    const found = contents
      .filter(c => c.active)
      .sort((a, b) =>
        scrollDirection.current === 'up' ? b.hash - a.hash : a.hash - b.hash
      )[0];

    lastSelectedIndex.current = contents.findIndex(x => x === found);

    if (found) {
      setScrollSpyLinks(prev =>
        prev.map(link => ({
          ...link,
          active: link.id === found.id,
        }))
      );
    }
  }, [JSON.stringify(contents)]);

  const handleScrollTo = useCallback((id: string, index: number) => {
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
        top: element.offsetTop - ref.offsetTop,
      });
    }
  }, []);

  const handleScroll = useCallback((ev: React.WheelEvent) => {
    if (ev.deltaY > 0) {
      scrollDirection.current = 'down';
    } else if (ev.deltaY < 0) {
      scrollDirection.current = 'up';
    }
  }, []);

  const spyWrapperClass = useMemo(() => {
    return classNames(styles.wrapper, {
      [styles[`wrapper_${linksPosition}`]]: true,
    });
  }, []);

  return (
    <div className={spyWrapperClass}>
      <div className={styles.aside}>
        <ul className={styles.list}>
          {scrollSpyLinks.map((link, index) => {
            return (
              <li
                key={link.id}
                className={classNames(
                  styles.list_item,
                  link.active ? styles.active : '',
                  isDarkMode ? styles.dark : ''
                )}
                onClick={ev => {
                  ev.preventDefault();
                  handleScrollTo(link.id, index);
                }}
              >
                {link.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.content} ref={onRef} onWheel={handleScroll}>
        {contents.map((content, index) => {
          return (
            <div
              key={content.id}
              className={classNames(
                styles['content-item']
                // content.active ? styles.active : ''
              )}
            >
              <h4
                className={classNames(styles.header, {
                  [styles.dark]: isDarkMode,
                })}
                id={content.id}
              >
                {links[index]}
              </h4>
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
