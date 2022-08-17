import { render } from '@testing-library/react';
import { Link } from '../link';

describe('Link', () => {
  it.concurrent('should render a link', () => {
    const { getByText } = render(
      <Link href="http://www.google.com">Google</Link>
    );
    expect(getByText('Google')).toBeInTheDocument();
  });

  it.concurrent('should render a link with an icon', () => {
    const { getByText } = render(
      <Link href="http://www.google.com" icon="🔍">
        Google
      </Link>
    );
    expect(getByText('Google')).toBeInTheDocument();
  });

  it.concurrent('should render a link with an icon and text', () => {
    const { getByText } = render(
      <Link href="http://www.google.com" icon="🔍">
        Google
      </Link>
    );
    expect(getByText('Google')).toBeInTheDocument();
  });
});
