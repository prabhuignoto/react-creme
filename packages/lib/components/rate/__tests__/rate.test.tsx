import { fireEvent, render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Rate } from '../rate';
import styles from '../rate.module.scss';

describe('Rate', () => {
  it('renders correctly', () => {
    const { getByRole, getAllByRole } = render(<Rate />);

    expect(getByRole('radiogroup')).toBeInTheDocument();
    expect(getAllByRole('radio')).toHaveLength(5);
  });

  it('renders custom icon count', () => {
    const { getByRole, getAllByRole } = render(<Rate iconCount={7} />);

    expect(getByRole('radiogroup')).toBeInTheDocument();
    expect(getAllByRole('radio')).toHaveLength(7);
  });

  it('renders custom icon', () => {
    const { getAllByRole } = render(<Rate icon={<div>custom</div>} />);

    expect(getAllByRole('radio')).toHaveLength(5);
    expect(getAllByRole('img')).toHaveLength(5);
  });

  it('should call onChange', () => {
    const onChange = vi.fn();
    const { getAllByRole } = render(<Rate onChange={onChange} />);

    const image = getAllByRole('radio')[0]?.querySelector("span[role='img']");

    if (image) {
      fireEvent.click(image);
      expect(onChange).toHaveBeenCalledTimes(1);
    }
  });

  it('should change on hover', async () => {
    const onChange = vi.fn();
    const { getAllByRole } = render(<Rate onChange={onChange} />);

    fireEvent.mouseOver(getAllByRole('radio')[2]);

    await waitFor(() => {
      const radios = getAllByRole('radio').slice(0, 3);

      radios.forEach(radio => {
        expect(radio).toHaveClass(styles.hovered);
      });

      const radios2 = getAllByRole('radio').slice(3, radios.length);

      radios2.forEach(radio => {
        expect(radio).not.toHaveClass(styles.hovered);
      });
    });
  });

  it('check disabled state', () => {
    const { getAllByRole } = render(<Rate disabled />);

    getAllByRole('radio').forEach(radio => {
      expect(radio).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Rate />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
