/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { axe } from 'jest-axe';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { it, vi } from 'vitest';
import { Dialog } from '../dialog';

describe('Dialog', () => {
  it('should render the dialog', async () => {
    const { getByRole, getByText } = render(<Dialog title="test title" />);

    expect(getByRole('dialog')).toBeInTheDocument();

    expect(getByText('test title')).toBeInTheDocument();
  });

  it('should close the dialog', async () => {
    const { getByText, queryByRole } = render(
      <Dialog title="test title">
        <span>dialog content</span>
      </Dialog>,
      {
        container: document.body,
      }
    );

    expect(queryByRole('dialog')).toBeInTheDocument();

    fireEvent.click(getByText('cancel'));

    await waitFor(
      async () => {
        expect(queryByRole('dialog')).not.toBeInTheDocument();
      },
      {
        timeout: 2000,
      }
    );
  });

  it('should call onOpen', async () => {
    const onOpen = vi.fn();
    const { queryByRole } = render(
      <Dialog title="test title" onOpen={onOpen}>
        <span>dialog content</span>
      </Dialog>,
      {
        container: document.body,
      }
    );

    await waitFor(() => {
      expect(queryByRole('dialog')).toBeInTheDocument();
      expect(onOpen).toBeCalled();
    });
  });

  it('should render children', async () => {
    const { getByText } = render(
      <Dialog title="test title">
        <span>dialog content</span>
      </Dialog>
    );

    await waitFor(
      async () => {
        expect(getByText('dialog content')).toBeInTheDocument();
      },
      {
        timeout: 2000,
      }
    );
  });

  it("should render dialog with animation type 'rise'", async () => {
    const { getByRole } = render(
      <Dialog title="test title" animationType="rise">
        <span>dialog content</span>
      </Dialog>
    );
    await waitFor(() => {
      expect(getByRole('dialog')).toHaveStyle('--rc-dialog-animation:rise');
    });
  });

  it('should render dialog with custom animation duration', async () => {
    const { getByRole } = render(
      <Dialog title="test title" animationType="pop" animationDuration={400}>
        <span>dialog content</span>
      </Dialog>
    );
    expect(getByRole('dialog')).toHaveStyle('--rc-dialog-animation:pop');
  });

  it('should close button have the focus on load', async () => {
    const { getAllByRole } = render(
      <Dialog title="test title" focusable>
        <span>dialog content</span>
      </Dialog>
    );

    await waitFor(() => {
      expect(getAllByRole('button')[0]).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Dialog title="Accessible Dialog" />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have aria-modal="true" attribute', () => {
      const { getByRole } = render(<Dialog title="Modal Dialog" />);
      const dialog = getByRole('dialog');

      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('should have aria-labelledby pointing to title', () => {
      const { getByRole, getByText } = render(<Dialog title="My Dialog" />);
      const dialog = getByRole('dialog');
      const title = getByText('My Dialog');

      expect(dialog).toHaveAttribute('aria-labelledby', title.id);
    });

    it('should have aria-describedby pointing to body', () => {
      const { getByRole } = render(
        <Dialog title="My Dialog">
          <span>Body content</span>
        </Dialog>
      );
      const dialog = getByRole('dialog');
      const body = dialog.querySelector('section');

      expect(dialog).toHaveAttribute('aria-describedby', body?.id);
    });
  });

  describe('Custom Props', () => {
    it('should render custom button labels', () => {
      const { getByText } = render(
        <Dialog
          title="Custom Labels"
          primaryButtonLabel="Confirm"
          secondaryButtonLabel="Dismiss"
        />
      );

      expect(getByText('Confirm')).toBeInTheDocument();
      expect(getByText('Dismiss')).toBeInTheDocument();
    });

    it('should hide footer when showFooter is false', () => {
      const { container } = render(
        <Dialog title="No Footer" showFooter={false} />
      );
      const footer = container.querySelector('footer');

      expect(footer).not.toBeInTheDocument();
    });

    it('should hide close button when showCloseButton is false', () => {
      const { container } = render(
        <Dialog title="No Close Button" showCloseButton={false} />
      );
      const closeButtonWrapper = container.querySelector(
        '.button_wrapper'
      ) as HTMLElement;

      // Header close button should not exist
      expect(closeButtonWrapper).not.toBeInTheDocument();
    });

    it('should call onPrimaryClick when primary button is clicked', () => {
      const onPrimaryClick = vi.fn();
      const { getByText } = render(
        <Dialog title="Primary Click" onPrimaryClick={onPrimaryClick} />
      );

      fireEvent.click(getByText('okay'));
      expect(onPrimaryClick).toHaveBeenCalled();
    });

    it('should call onSecondaryClick when secondary button is clicked', () => {
      const onSecondaryClick = vi.fn();
      const { getByText } = render(
        <Dialog title="Secondary Click" onSecondaryClick={onSecondaryClick} />
      );

      fireEvent.click(getByText('cancel'));
      expect(onSecondaryClick).toHaveBeenCalled();
    });

    it('should support custom title levels', () => {
      const { getByRole } = render(
        <Dialog title="Custom Level" titleLevel="h1" />
      );
      const heading = getByRole('heading', { level: 1 });

      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Custom Level');
    });
  });

  describe('Sizes', () => {
    it('should render with small size', () => {
      const { getByRole } = render(<Dialog title="Small" size="sm" />);
      const dialog = getByRole('dialog');

      expect(dialog.className).toContain('dialog-sm');
    });

    it('should render with medium size', () => {
      const { getByRole } = render(<Dialog title="Medium" size="md" />);
      const dialog = getByRole('dialog');

      expect(dialog.className).toContain('dialog-md');
    });

    it('should render with large size', () => {
      const { getByRole } = render(<Dialog title="Large" size="lg" />);
      const dialog = getByRole('dialog');

      expect(dialog.className).toContain('dialog-lg');
    });
  });

  describe('Dimensions', () => {
    it('should apply custom width', () => {
      const { getByRole } = render(<Dialog title="Custom Width" width={500} />);
      const dialog = getByRole('dialog');

      expect(dialog).toHaveStyle('--min-width: 500px');
    });

    it('should apply custom height', () => {
      const { getByRole } = render(
        <Dialog title="Custom Height" height={400} />
      );
      const dialog = getByRole('dialog');

      expect(dialog).toHaveStyle('min-height: 400px');
    });
  });

  describe('Backward Compatibility', () => {
    it('should still support deprecated onSuccess callback', () => {
      const onSuccess = vi.fn();
      const { getByText } = render(
        <Dialog title="Legacy" onSuccess={onSuccess} />
      );

      fireEvent.click(getByText('okay'));
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
