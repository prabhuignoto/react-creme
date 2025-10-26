import { render } from '@testing-library/react';
import { Avatar } from '../avatar';
import styles from '../avatar.module.scss';

describe('Avatar', () => {
  it('should render avatar with default props', () => {
    const { container, getByRole } = render(<Avatar />);
    expect(container).toMatchSnapshot();
    expect(getByRole('img')).toBeInTheDocument();
  });

  it('should render custom icon', () => {
    const { getByText } = render(<Avatar>icon</Avatar>);
    expect(getByText('icon')).toBeInTheDocument();
  });

  it('should render medium sized avatar', () => {
    const { getByRole } = render(<Avatar size="md" />);
    expect(getByRole('img')).toHaveClass(styles.md);
  });

  it('should render large sized avatar', () => {
    const { getByRole } = render(<Avatar size="lg" />);
    expect(getByRole('img')).toHaveClass(styles.lg);
  });

  it('should render avatar with letter', () => {
    const { getByText } = render(<Avatar letter="A" />);
    expect(getByText('A')).toBeInTheDocument();
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Avatar />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
