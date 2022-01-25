import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { Link } from '../../link/link';
import { BreadCrumb } from '../breadcrumb';

const handler = vi.fn();

describe('Breadcrumb', () => {
  it('should render', () => {
    const { getByRole, getAllByRole } = render(
      <BreadCrumb>
        <Link href="http://google.com" />
        <Link href="http://yahoo.com" />
        <Link href="http://amazon.com" />
      </BreadCrumb>
    );

    expect(getByRole('navigation')).toBeInTheDocument();
    expect(getAllByRole('link')).toHaveLength(3);
  });

  it('should onClick is called', () => {
    const { getByText } = render(
      <BreadCrumb onClick={handler}>
        <Link href="http://google.com">google</Link>
        <Link href="http://yahoo.com">yahoo</Link>
        <Link href="http://amazon.com">amazon</Link>
      </BreadCrumb>
    );

    expect(getByText('google')).toBeInTheDocument();
    fireEvent.click(getByText('google'));

    expect(handler).toBeCalled();
  });

  it('should render snapshot', () => {
    const { getByRole } = render(
      <BreadCrumb>
        <Link href="http://google.com" />
        <Link href="http://yahoo.com" />
        <Link href="http://amazon.com" />
      </BreadCrumb>
    );

    expect(getByRole('navigation')).toMatchSnapshot();
  });
});
