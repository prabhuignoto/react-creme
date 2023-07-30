import { UserIcon } from '@icons';
import classNames from 'classnames';
import { FunctionComponent, useMemo } from 'react';
import { AvatarProps } from './avatar.model';
import styles from './avatar.module.scss';

// Use a more descriptive function name instead of "cx" for classNames
const getClassNames = classNames;

/**
 * Avatar Component - Displays a user avatar.
 *
 * @component
 *
 * @param {'sm'|'md'|'lg'} props.size - The size of the avatar (small by default)
 * @param {ReactNode} props.children - The content to be rendered inside the avatar
 * @param {string} props.letter - The letter to be displayed when no children are provided
 *
 * @returns {ReactNode} React component
 */
const Avatar: FunctionComponent<AvatarProps> = ({
  size = 'sm',
  children,
  letter = '',
}) => {
  // unless the dependencies (in this case, [size]) change
  const wrapperClass = useMemo(
    () => getClassNames(styles.avatar, styles[size]),
    [size]
  );

  /**
   * unless the dependencies ([children, letter]) change.
   * This will render children if it exists, else a letter or default to UserIcon.
   */
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (letter) {
      return letter;
    }

    return <UserIcon />;
  }, [children, letter]);

  return (
    <div className={wrapperClass} role="img">
      <span className={styles.icon_container}>{content}</span>
    </div>
  );
};

// displayName is used in debugging messages
Avatar.displayName = 'Avatar';

export { Avatar };
