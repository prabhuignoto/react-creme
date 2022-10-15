import { UserIcon } from '@icons';
import cx from 'classnames';
import { FunctionComponent, useMemo } from 'react';
import { AvatarProps } from './avatar.model';
import styles from './avatar.module.scss';

const Avatar: FunctionComponent<AvatarProps> = ({
  size = 'sm',
  children,
  letter = '',
}) => {
  const wrapperClass = useMemo(() => cx(styles.avatar, styles[size]), [size]);

  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (letter) {
      return letter;
    }

    return <UserIcon />;
  }, [children, size]);

  return (
    <div className={wrapperClass} role="img">
      <span className={styles.icon_container}>{content}</span>
    </div>
  );
};

Avatar.displayName = 'Avatar';

export { Avatar };
