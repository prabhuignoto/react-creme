import { fireEvent, render, waitFor } from '@testing-library/react';
import { it, vi } from 'vitest';
import { BreadCrumb } from '../../core/breadcrumb/breadcrumb';

describe('Breadcrumb', () => {
  it.concurrent('should render', async () => {
    const { getByRole, getByText } = render(
      <BreadCrumb links={['google', 'yahoo', 'amazon']}></BreadCrumb>
    );
    await waitFor(() => {
      expect(getByRole('navigation')).toBeInTheDocument();

      expect(getByText('google')).toBeInTheDocument();
      expect(getByText('yahoo')).toBeInTheDocument();
    });
  });

  it.concurrent('should handler is called', async () => {
    const handler = vi.fn();
    const { getByText } = render(
      <BreadCrumb
        onSelected={handler}
        links={['google', 'yahoo', 'amazon']}
      ></BreadCrumb>
    );

    expect(getByText('google')).toBeInTheDocument();
    fireEvent.click(getByText('google'));

    expect(handler).toBeCalledWith('google');
  });

  it('should render snapshot', () => {
    const { getByRole } = render(
      <BreadCrumb links={['google', 'yahoo', 'amazon']}></BreadCrumb>,
      {
        container: document.body,
      }
    );

    expect(getByRole('navigation')).toMatchSnapshot();
  });
});
