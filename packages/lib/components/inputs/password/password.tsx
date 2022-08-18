import { isDark } from '@common';
import { Eye, EyeOff } from '@common/icons';
import classNames from 'classnames';
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Input } from '../input/input';
import styles from './password.module.scss';

export type PasswordProps = {
  RTL?: boolean;
  border?: boolean;
  length?: number;
  maxLength?: number;
  minLength?: number;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
};

const Password: FunctionComponent<PasswordProps> = ({
  RTL,
  size = 'sm',
  onChange,
  border = false,
  placeholder = 'Please enter the password...',
}) => {
  const [type, setType] = useState<'password' | 'text'>('password');

  const [showPassword, setShowPassword] = useState(false);

  const isDarkMode = useMemo(() => isDark(), []);

  useEffect(() => {
    if (showPassword) {
      setType('text');
    } else {
      setType('password');
    }
  }, [showPassword]);

  const wrapperClass = useMemo(
    () =>
      classNames(styles.wrapper, {
        [styles[size]]: true,
        [styles.RTL]: RTL,
        [styles.dark]: isDarkMode,
      }),
    [isDarkMode]
  );

  const unMaskClass = useMemo(
    () =>
      classNames(styles.unmask_icon, {
        [styles[size]]: true,
        [styles.rtl]: RTL,
      }),
    []
  );

  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <div className={wrapperClass}>
      <div className={styles.input_wrapper}>
        <Input
          type={type}
          onChange={onChange}
          focusable={false}
          size={size}
          border={border}
          RTL={RTL}
          placeholder={placeholder}
          transparentBg
          controlled
        />
      </div>
      {showPassword ? (
        <span
          className={unMaskClass}
          onClick={togglePassword}
          role="button"
          aria-label="hide password"
        >
          <EyeOff />
        </span>
      ) : (
        <span
          className={unMaskClass}
          onClick={togglePassword}
          role="button"
          aria-label="show password"
        >
          <Eye />
        </span>
      )}
    </div>
  );
};

export { Password };
