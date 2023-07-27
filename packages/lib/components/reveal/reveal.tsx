import classNames from 'classnames';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { RevealProps } from './reveal-model';
import styles from './reveal.module.scss';

/**
 * Reveal Component
 *    @property {React.ReactNode} children - The content to be revealed based on intersection with the parent.
 *    @property {React.RefObject<HTMLElement>} parent - The parent element used as the intersection root.
 * @returns {JSX.Element} The Reveal component.
 */
const Reveal: React.FunctionComponent<RevealProps> = ({ children, parent }) => {
  const observer = useRef<IntersectionObserver>();

  // State to track whether the parent is available
  const [isParentAvailable, setIsParentAvailable] = useState(false);

  // State to track the visibility of the content based on intersection
  const [visible, setVisible] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  // Check if the parent element is available
  useEffect(() => {
    if (parent.current) {
      setIsParentAvailable(true);
    }
  }, [parent.current]);

  // Function to handle ref and set up the IntersectionObserver
  const onRef = useCallback((node: HTMLDivElement) => {
    if (node && parent.current) {
      ref.current = node;
      observer.current = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            setVisible(entry.isIntersecting);
          });
        },
        {
          root: parent.current,
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );
      observer.current.observe(node);
    }
  }, []);

  // Calculate the class for the reveal element based on visibility
  const revealClass = useMemo(
    () =>
      classNames(styles.reveal, {
        [styles.hide]: !visible,
        [styles.show]: visible,
      }),
    [visible]
  );

  // Cleanup: disconnect the IntersectionObserver
  useEffect(() => {
    return () => {
      observer.current?.disconnect();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {isParentAvailable && (
        <div className={revealClass} ref={onRef}>
          {children}
        </div>
      )}
    </div>
  );
};

Reveal.displayName = 'Reveal';

export { Reveal };
