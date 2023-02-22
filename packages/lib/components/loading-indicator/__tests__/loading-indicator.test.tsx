import { render } from '@testing-library/react';
import { LoadingIndicator } from '../loading-indicator';
import styles from '../loading-indicator.module.scss';

describe('Loading Indicator', () => {
  it('should render loading indicator', () => {
    const { getByRole } = render(<LoadingIndicator />);
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render square shape', () => {
    const { getByRole } = render(<LoadingIndicator shape="square" />);
    expect(getByRole('progressbar').children[0]).toHaveClass(styles.square);
  });

  it('should render a large sized loading indicator', () => {
    const { getByRole } = render(<LoadingIndicator size="lg" />);
    expect(getByRole('progressbar').children[0]).toHaveClass(styles.lg);
  });

  // should render a custom sized loading indicator and check if the height and width are equal to the custom size
  it('should render a custom sized loading indicator', () => {
    const { getByRole } = render(<LoadingIndicator customSize={100} />);
    expect(getByRole('progressbar').children[0]).toHaveStyle(
      'height: 100px; width: 100px;'
    );
  });

  it('should render in rtl mode', () => {
    const { getByRole } = render(<LoadingIndicator rtl />);
    expect(getByRole('progressbar')).toHaveClass(styles.rtl);
  });

  it('should render custom number of loading indicators', () => {
    const { getByRole } = render(<LoadingIndicator count={5} />);
    expect(getByRole('progressbar').children).toHaveLength(5);
  });

  //check if the loading indicator is rendered with the normal speed and check is the css transition is applied
  it('should render loading indicator with normal speed', () => {
    const { getByRole } = render(<LoadingIndicator speed="normal" />);
    expect(getByRole('progressbar').children[0]).toHaveStyle(
      'transition: background 500ms ease-in-out;'
    );
  });
});
