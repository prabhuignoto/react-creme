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

const Reveal: React.FunctionComponent<RevealProps> = ({ children, parent }) => {
  const observer = useRef<IntersectionObserver>();

  const [isParentAvailable, setIsParentAvailable] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (parent.current) {
      setIsParentAvailable(true);
    }
  }, [parent.current]);

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

  const revealClass = useMemo(
    () =>
      classNames(styles.reveal, {
        [styles.hide]: !visible,
        [styles.show]: visible,
      }),
    [visible]
  );

  // cleanup
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
