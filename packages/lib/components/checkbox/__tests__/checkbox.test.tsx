import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import { CheckBox } from '../checkbox';
import styles from '../checkbox.module.scss';

const handler = vi.fn();

describe('Checkbox', () => {
  it('should render default', async () => {
    const { container } = render(<CheckBox label="My Checkbox" />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render disabled', async () => {
    const { getByRole } = render(<CheckBox label="My Checkbox" disabled />);

    expect(getByRole('checkbox')).toHaveClass(styles.disabled);
    expect(getByRole('checkbox')).toHaveAttribute('aria-disabled', 'true');
  });

  it('should render default prop isChecked', async () => {
    const { container } = render(<CheckBox label="My Checkbox" isChecked />);

    expect(container.querySelector('.' + styles.icon)).toHaveClass(
      styles.checked
    );
  });

  it('should call the handler', async () => {
    const { getByRole } = render(
      <CheckBox label="My Checkbox" onChange={handler} noUniqueId id="12445" />
    );

    fireEvent.click(getByRole('checkbox'));

    expect(handler).toBeCalled();
    expect(handler).toHaveBeenCalledWith('12445', true);
  });

  it('should receive focus', async () => {
    const { getByRole } = render(<CheckBox label="My Checkbox" focusable />);

    expect(getByRole('checkbox')).toHaveAttribute('tabindex', '0');
  });

  it('should be checked by default', async () => {
    const { getByRole } = render(<CheckBox label="My Checkbox" isChecked />);

    expect(getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
  });

  // Test if the checkbox is unchecked by default when the `isChecked` prop is not provided
  it('should be unchecked by default if isChecked prop is not provided', async () => {
    const { getByRole } = render(<CheckBox label="My Checkbox" />);

    expect(getByRole('checkbox')).toHaveAttribute('aria-checked', 'false');
  });

  // Test if the `onChange` handler is not called when the checkbox is disabled and clicked
  it('should not call the handler if the checkbox is disabled', async () => {
    const callback = vi.fn();
    const { getByRole } = render(
      <CheckBox label="My Checkbox" onChange={callback} disabled />
    );

    fireEvent.click(getByRole('checkbox'));

    expect(callback).not.toBeCalled();
  });

  // Test if the checkbox is not focusable when the `focusable` prop is `false` or not provided
  it('should not be focusable if focusable prop is false or not provided', async () => {
    const { getByRole, rerender } = render(
      <CheckBox label="My Checkbox" focusable={false} />
    );

    expect(getByRole('checkbox')).not.toHaveAttribute('tabindex', '0');

    rerender(<CheckBox label="My Checkbox" focusable={false} />);

    expect(getByRole('checkbox')).not.toHaveAttribute('tabindex', '0');
  });
});
