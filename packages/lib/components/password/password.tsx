import { Eye, EyeOff } from '@icons';
import classNames from 'classnames';
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { isDark } from '../common/utils';
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

/**
 * UnmaskIcon Component
 *    @property {boolean} showPassword - Whether the password is currently shown (default: false).
 *    @property {Function} togglePassword - Function to toggle password visibility.
 *    @property {string} size - The size of the unmask icon ('sm', 'md', or 'lg').
 *    @property {boolean} RTL - Whether the layout is right-to-left (default: false).
 * @returns {JSX.Element} The UnmaskIcon component.
 */
const UnmaskIcon: FunctionComponent<{
  RTL?: boolean;
  showPassword: boolean;
  size: string;
  togglePassword: () => void;
}> = ({ showPassword, togglePassword, size, RTL }) => {
  const unMaskClass = useMemo(
    () =>
      classNames(styles.unmask_icon, {
        [styles[size]]: true,
        [styles.rtl]: RTL,
      }),
    [size, RTL]
  );

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      togglePassword();
    }
  };

  return (
    <span
      className={unMaskClass}
      onClick={togglePassword}
      onKeyDown={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={showPassword ? 'hide password' : 'show password'}
    >
      {showPassword ? <EyeOff /> : <Eye />}
    </span>
  );
};

/**
 * Password Component
 *    @property {boolean} RTL - Whether the layout is right-to-left (default: false).
 *    @property {boolean} border - Whether to display a border (default: false).
 *    @property {number} length - The length of the password field.
 *    @property {number} maxLength - The maximum length of the password.
 *    @property {number} minLength - The minimum length of the password.
 *    @property {Function} onChange - Callback function called when the value changes.
 *    @property {string} placeholder - The placeholder text for the password input (default: 'Please enter the password...').
 *    @property {string} size - The size of the password field ('sm', 'md', or 'lg', default: 'sm').
 * @returns {JSX.Element} The Password component.
 */
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

  // Effect to control the input type based on password visibility
  useEffect(() => {
    setType(showPassword ? 'text' : 'password');
  }, [showPassword]);

  // Class for wrapper, including size, RTL, and dark mode considerations
  const wrapperClass = useMemo(
    () =>
      classNames(styles.wrapper, {
        [styles[size]]: true,
        [styles.RTL]: RTL,
        [styles.dark]: isDarkMode,
      }),
    [isDarkMode, size, RTL]
  );

  // Function to toggle password visibility
  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <div className={wrapperClass}>
      <div className={styles.input_wrapper}>
        <Input
          type={type}
          onChange={onChange}
          size={size}
          border={border}
          RTL={RTL}
          placeholder={placeholder}
          transparentBg
          controlled
        />
      </div>
      <UnmaskIcon
        showPassword={showPassword}
        togglePassword={togglePassword}
        size={size}
        RTL={RTL}
      />
    </div>
  );
};

export { Password };
