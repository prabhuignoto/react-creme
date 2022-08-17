import { render } from '@testing-library/react';
import { PageHeader } from '../page-header';

describe('PageHeader', () => {
  it.concurrent('should render', () => {
    const { getByText } = render(<PageHeader title="Tests" />);
    expect(getByText('Tests')).toBeInTheDocument();
  });

  it.concurrent('should render the children', () => {
    const { getByText } = render(<PageHeader title="Tests">Test</PageHeader>);
    expect(getByText('Test')).toBeInTheDocument();
  });
});
