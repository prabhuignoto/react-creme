import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { Tooltip } from '../tooltip';
import styles from '../tooltip.module.scss';

describe('Tooltip', () => {
  it('Should render tooltip', () => {
    const { getByRole } = render(
      <Tooltip position="top center" message="this is a test tooltip">
        <span>content</span>
      </Tooltip>
    );

    expect(getByRole('tooltip')).toBeInTheDocument();
  });

  it('Should show/hide tooltip on hover', async () => {
    const { getByRole } = render(
      <Tooltip position="top center" message="this is a test tooltip">
        <span>content</span>
      </Tooltip>
    );

    const hostContent = getByRole('tooltip').querySelector(
      '.tooltip-host-content'
    );
    const message = getByRole('tooltip').querySelector(styles.tooltip_message);

    if (hostContent && message) {
      // await act(async () => {
      fireEvent.mouseEnter(hostContent);
      // });

      await waitFor(
        async () => {
          expect(message).toHaveClass('show-tooltip');
        },
        {
          timeout: 1500,
        }
      );

      // await act(async () => {
      fireEvent.mouseLeave(hostContent);
      // });

      await waitFor(
        async () => {
          expect(message).toHaveClass('hide-tooltip');
        },
        {
          timeout: 1500,
        }
      );
    }
  });

  it('should render tooltip statically', async () => {
    const { getByRole } = render(
      <Tooltip position="top center" message="this is a test tooltip" isStatic>
        <span>content</span>
      </Tooltip>
    );

    expect(getByRole('tooltip')).toBeInTheDocument();
    // expect(getByRole('tooltip')).toHaveClass(styles.tooltip_static);
    expect(getByRole('tooltip').firstChild).toHaveClass(
      styles.tooltip_top_center
    );
  });

  it('should render tooltip bottom center', () => {
    const { getByRole } = render(
      <Tooltip position="bottom center" message="this is a test tooltip">
        <span>content</span>
      </Tooltip>
    );

    expect(getByRole('tooltip')).toBeInTheDocument();
    expect(getByRole('tooltip').firstChild).toHaveClass(
      styles.tooltip_bottom_center
    );
  });

  it('should render tooltip bottom left', () => {
    const { getByRole } = render(
      <Tooltip position="bottom left" message="this is a test tooltip">
        <span>content</span>
      </Tooltip>
    );

    expect(getByRole('tooltip')).toBeInTheDocument();
    expect(getByRole('tooltip').firstChild).toHaveClass(
      styles.tooltip_bottom_left
    );
  });

  it('should render tooltip bottom right', () => {
    const { getByRole } = render(
      <Tooltip position="bottom right" message="this is a test tooltip">
        <span>content</span>
      </Tooltip>
    );

    expect(getByRole('tooltip')).toBeInTheDocument();
    expect(getByRole('tooltip').firstChild).toHaveClass(
      styles.tooltip_bottom_right
    );
  });

  it('should render tooltip top left', () => {
    const { getByRole } = render(
      <Tooltip position="top left" message="this is a test tooltip">
        <span>content</span>
      </Tooltip>
    );

    expect(getByRole('tooltip')).toBeInTheDocument();
    expect(getByRole('tooltip').firstChild).toHaveClass(
      styles.tooltip_top_left
    );
  });

  it('should render tooltip top right', () => {
    const { getByRole } = render(
      <Tooltip position="top right" message="this is a test tooltip">
        <span>content</span>
      </Tooltip>
    );

    expect(getByRole('tooltip')).toBeInTheDocument();
    expect(getByRole('tooltip').firstChild).toHaveClass(
      styles.tooltip_top_right
    );
  });

  it('should render left center', () => {
    const { getByRole } = render(
      <Tooltip position="left center" message="this is a test tooltip">
        <span>content</span>
      </Tooltip>
    );

    expect(getByRole('tooltip')).toBeInTheDocument();
    expect(getByRole('tooltip').firstChild).toHaveClass(
      styles.tooltip_left_center
    );
  });

  it('should render right center', () => {
    const { getByRole } = render(
      <Tooltip position="right center" message="this is a test tooltip">
        <span>content</span>
      </Tooltip>
    );

    expect(getByRole('tooltip')).toBeInTheDocument();
    expect(getByRole('tooltip').firstChild).toHaveClass(
      styles.tooltip_right_center
    );
  });

  it('should render left top', () => {
    const { getByRole } = render(
      <Tooltip position="left top" message="this is a test tooltip">
        <span>content</span>
      </Tooltip>
    );

    expect(getByRole('tooltip')).toBeInTheDocument();
    expect(getByRole('tooltip').firstChild).toHaveClass(
      styles.tooltip_left_top
    );
  });

  it('should render left bottom', () => {
    const { getByRole } = render(
      <Tooltip position="left bottom" message="this is a test tooltip">
        <span>content</span>
      </Tooltip>
    );

    expect(getByRole('tooltip')).toBeInTheDocument();
    expect(getByRole('tooltip').firstChild).toHaveClass(
      styles.tooltip_left_bottom
    );
  });

  it('should render Tooltip on click', async () => {
    const { getByRole, getByText } = render(
      <Tooltip
        position="left bottom"
        message="this is a test tooltip"
        openOnClick
      >
        <span>content</span>
      </Tooltip>
    );

    await waitFor(
      () => {
        expect(getByRole('tooltip').firstChild).not.toHaveClass(
          styles.show_tooltip
        );
      },
      {
        timeout: 1000,
      }
    );

    fireEvent.click(getByText('content'));

    await waitFor(() => {
      expect(getByRole('tooltip').firstChild).toHaveClass(styles.show_tooltip);
    });

    fireEvent.click(getByRole('button'));

    await waitFor(() => {
      expect(getByRole('tooltip').firstChild).toHaveClass(styles.hide_tooltip);
    });
  });
});
