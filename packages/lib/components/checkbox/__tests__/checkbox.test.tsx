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
});
