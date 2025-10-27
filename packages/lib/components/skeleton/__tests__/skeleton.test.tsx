import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Skeleton } from '../skeleton';
import styles from '../skeleton.module.scss';

expect.extend(toHaveNoViolations);

describe('Skeleton', () => {
  it('should render skeleton', () => {
    const { getByTestId } = render(<Skeleton rows={5} />);

    expect(getByTestId('rc-skeleton')).toBeInTheDocument();

    const children =
      getByTestId('rc-skeleton').querySelectorAll('.rc-skeleton-row');

    expect(children).toHaveLength(5);
  });

  it('should render skeleton blocks', () => {
    const { getByTestId } = render(<Skeleton rows={5} blocks={2} />);

    expect(getByTestId('rc-skeleton')).toBeInTheDocument();

    const children =
      getByTestId('rc-skeleton').querySelectorAll('.rc-skeleton-row');

    expect(children).toHaveLength(10);
  });

  it('should blink', () => {
    const { getByTestId } = render(
      <Skeleton rows={5} animate rowHeight={20} />
    );

    expect(getByTestId('rc-skeleton')).toBeInTheDocument();

    const children = getByTestId('rc-skeleton').children;

    expect(children[0].firstChild).toHaveClass(styles.animate);
    // expect(children[0].firstChild).toHaveStyle("--height: 20px");
  });

  it('should render with showCircle', () => {
    const { container } = render(<Skeleton rows={3} showCircle />);

    const circles = container.querySelectorAll(`.${styles.circle}`);
    expect(circles).toHaveLength(1);
  });

  it('should render multiple blocks with showCircle', () => {
    const { container } = render(<Skeleton rows={3} blocks={2} showCircle />);

    const circles = container.querySelectorAll(`.${styles.circle}`);
    expect(circles).toHaveLength(2);
  });

  it('should handle RTL direction', () => {
    const { container } = render(<Skeleton rows={3} RTL />);

    const blocks = container.querySelectorAll(`.${styles.block_rtl}`);
    expect(blocks.length).toBeGreaterThan(0);
  });

  it('should apply custom row height', () => {
    const { getByTestId } = render(<Skeleton rows={3} rowHeight={20} />);

    const skeleton = getByTestId('rc-skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  it('should not animate when disabled', () => {
    const { getByTestId } = render(<Skeleton rows={3} animate={false} />);

    const skeleton = getByTestId('rc-skeleton');
    const children = skeleton.querySelectorAll('.rc-skeleton-row');

    children.forEach(child => {
      expect(child).toHaveClass(styles.disable_animation);
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Skeleton />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have role="status"', () => {
      const { getByTestId } = render(<Skeleton />);
      expect(getByTestId('rc-skeleton')).toHaveAttribute('role', 'status');
    });

    it('should have default aria-label', () => {
      const { getByTestId } = render(<Skeleton />);
      expect(getByTestId('rc-skeleton')).toHaveAttribute('aria-label', 'Loading...');
    });

    it('should have custom aria-label', () => {
      const { getByTestId } = render(<Skeleton label="Loading content" />);
      expect(getByTestId('rc-skeleton')).toHaveAttribute(
        'aria-label',
        'Loading content'
      );
    });

    it('should have aria-busy="true"', () => {
      const { getByTestId } = render(<Skeleton />);
      expect(getByTestId('rc-skeleton')).toHaveAttribute('aria-busy', 'true');
    });
  });
});
