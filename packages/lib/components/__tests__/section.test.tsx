import { render } from '@testing-library/react';
import { Section } from '../core/section/section';

describe('Section', () => {
  it.concurrent('should render Section correctly', () => {
    const { container, getByText } = render(
      <Section title="test">
        <span></span>
      </Section>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(getByText('test')).toBeInTheDocument();
  });

  it.concurrent('should render section content', () => {
    const { getByText } = render(<Section>Section content</Section>);
    expect(getByText('Section content')).toBeInTheDocument();
  });

  it.concurrent('should render title with hash', () => {
    const { getByText } = render(
      <Section useHash title="test">
        content
      </Section>
    );
    expect(getByText('# test')).toBeInTheDocument();
  });
});
