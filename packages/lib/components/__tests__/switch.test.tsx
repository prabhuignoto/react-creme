import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Switch } from '../inputs/switch/switch';
import styles from '../inputs/switch/switch.module.scss';

const handler = vi.fn();

describe('Switch', () => {
  it.concurrent('should render default', () => {
    const { container } = render(<Switch />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it.concurrent('should be checked', () => {
    const { getByRole } = render(<Switch checked />);

    expect(getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it.concurrent('should display toggle states', async () => {
    const { getByRole } = render(<Switch onChange={handler} />);

    const switchItem = getByRole('switch');

    userEvent.click(switchItem);

    await waitFor(() => {
      expect(handler).toBeCalledWith(true);
      expect(switchItem.firstChild).toHaveClass(styles.track_on);
    });

    userEvent.click(switchItem);

    await waitFor(() => {
      expect(handler).toBeCalledWith(false);
      expect(switchItem.firstChild).toHaveClass(styles.track_off);
    });
  });
});
