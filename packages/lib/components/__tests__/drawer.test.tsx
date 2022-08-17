import { fireEvent, render, waitFor } from '@testing-library/react';
import { Drawer } from '../overlay/drawer/drawer';
import styles from '../overlay/drawer/drawer.module.scss';

describe('Drawer', () => {
  it.concurrent('should render the drawer', () => {
    const { getByRole, getByText } = render(
      <Drawer width={400}>
        <span>content</span>
      </Drawer>
    );

    expect(getByRole('dialog')).toBeInTheDocument();
    expect(getByRole('dialog')).toHaveStyle('--min-width: 400px');
    expect(getByRole('dialog')).toHaveClass(
      styles.visible,
      styles.slide_left_enter
    );
    expect(getByText('content')).toBeInTheDocument();
  });

  it('should render the drawer from right', async () => {
    const { getByRole } = render(
      <Drawer width={400} position="right">
        <span>content</span>
      </Drawer>,
      {
        container: document.body,
      }
    );

    await waitFor(() => {
      expect(getByRole('dialog')).toBeInTheDocument();
      expect(getByRole('dialog')).toHaveClass(
        styles.visible,
        styles.slide_right_enter
      );
    });
  });

  it('should render the drawer from bottom', async () => {
    const { getByRole } = render(
      <Drawer width={400} position="bottom">
        <span>content</span>
      </Drawer>
    );

    await waitFor(() => {
      expect(getByRole('dialog')).toHaveClass(
        styles.visible,
        styles.slide_bottom_enter
      );
    });
  });

  it('should render the drawer from top', async () => {
    const { getByRole } = render(
      <Drawer width={400} position="top">
        <span>content</span>
      </Drawer>
    );

    expect(getByRole('dialog')).toHaveClass(
      styles.visible,
      styles.slide_top_enter
    );
  });

  it('should close the drawer', async () => {
    const { queryByRole, getByRole } = render(
      <Drawer>
        <span>content</span>
      </Drawer>
    );

    fireEvent.keyUp(getByRole('dialog'), {
      key: 'Escape',
      keyCode: 'Escape',
    });

    await waitFor(
      async () => {
        expect(queryByRole('dialog')).not.toBeInTheDocument();
      },
      {
        timeout: 1000,
      }
    );
  });

  it('should close button has focus on load', async () => {
    const { getAllByRole } = render(
      <Drawer>
        <span>content</span>
      </Drawer>
    );

    await waitFor(() => {
      expect(getAllByRole('button')[0]).toHaveFocus();
    });
  });
});
