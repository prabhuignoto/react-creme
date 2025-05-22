import { UserIcon } from '@icons';
import classNames from 'classnames';
import React, { FunctionComponent, useMemo } from 'react';
import { AvatarProps } from './avatar.model';
import styles from './avatar.module.scss';

const Avatar: FunctionComponent<AvatarProps> = React.memo(
  ({ size = 'sm', children, letter = '' }) => {
    const wrapperClass = useMemo(
      () => classNames(styles.avatar, styles[size]),
      [size]
    );

    const content = children || letter || <UserIcon />;

    return (
      <div className={wrapperClass} role="img">
        <span className={styles.icon_container}>{content}</span>
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
