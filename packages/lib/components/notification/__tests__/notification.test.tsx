import React from 'react';
import { axe } from 'jest-axe';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Notification } from '../notification';

describe('Notification', () => {
  describe('Rendering', () => {
    it('should render the notification with default props', async () => {
      const { getByRole, getByText } = render(
        <Notification title="Test">
          <span>content</span>
        </Notification>
      );

      await waitFor(() => {
        expect(getByRole('alertdialog')).toBeInTheDocument();
        expect(getByText('content')).toBeInTheDocument();
      });
    });

    it('should render with custom width and height', async () => {
      const { getByRole } = render(
        <Notification width={400} height={200} title="test notification">
          <span>content</span>
        </Notification>
      );

      await waitFor(() => {
        const dialog = getByRole('alertdialog');
        expect(dialog).toHaveStyle('--min-width: 400px');
        expect(dialog).toHaveStyle('--min-height: 200px');
      });
    });

    it('should render title in header', async () => {
      const { getByText } = render(
        <Notification title="Important Message">
          <span>content</span>
        </Notification>
      );

      await waitFor(() => {
        expect(getByText('Important Message')).toBeInTheDocument();
      });
    });

    it('should render without header when disableHeader is true', async () => {
      const { queryByText, getByRole } = render(
        <Notification title="Title" disableHeader>
          <span>content</span>
        </Notification>
      );

      await waitFor(() => {
        expect(getByRole('alertdialog')).toBeInTheDocument();
        expect(queryByText('Title')).not.toBeInTheDocument();
      });
    });

    it('should render small size', async () => {
      const { getByRole } = render(
        <Notification size="sm" title="test">
          <span>content</span>
        </Notification>
      );

      await waitFor(() => {
        expect(getByRole('alertdialog')).toBeInTheDocument();
      });
    });

    it('should render medium size', async () => {
      const { getByRole } = render(
        <Notification size="md" title="test">
          <span>content</span>
        </Notification>
      );

      await waitFor(() => {
        expect(getByRole('alertdialog')).toBeInTheDocument();
      });
    });

    it('should render large size', async () => {
      const { getByRole } = render(
        <Notification size="lg" title="test">
          <span>content</span>
        </Notification>
      );

      await waitFor(() => {
        expect(getByRole('alertdialog')).toBeInTheDocument();
      });
    });
  });

  describe('Positions', () => {
    const positions = [
      'top-left',
      'top-right',
      'top-center',
      'bottom-left',
      'bottom-right',
      'bottom-center',
    ] as const;

    positions.forEach(position => {
      it(`should render in ${position} position`, async () => {
        const { getByRole } = render(
          <Notification position={position} title="test">
            <span>content</span>
          </Notification>
        );

        await waitFor(() => {
          expect(getByRole('alertdialog')).toBeInTheDocument();
        });
      });
    });
  });

  describe('Interaction', () => {
    it('should render close button with accessible label', async () => {
      const { getByLabelText } = render(
        <Notification title="test">
          <span>content</span>
        </Notification>
      );

      await waitFor(() => {
        expect(getByLabelText('Close notification')).toBeInTheDocument();
      });
    });

    it('should render close button as button role', async () => {
      const { getByLabelText } = render(
        <Notification title="test">
          <span>content</span>
        </Notification>
      );

      await waitFor(() => {
        const closeBtn = getByLabelText('Close notification');
        expect(closeBtn).toHaveAttribute('role', 'button');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper role', async () => {
      const { getByRole } = render(
        <Notification title="test">
          <span>content</span>
        </Notification>
      );

      await waitFor(() => {
        expect(getByRole('alertdialog')).toBeInTheDocument();
      });
    });

    it('should have aria-modal attribute', async () => {
      const { getByRole } = render(
        <Notification title="test">
          <span>content</span>
        </Notification>
      );

      await waitFor(() => {
        expect(getByRole('alertdialog')).toHaveAttribute('aria-modal', 'true');
      });
    });

    it('should have aria-labelledby when title is present', async () => {
      const { getByRole, getByText } = render(
        <Notification title="Test Title">
          <span>content</span>
        </Notification>
      );

      await waitFor(() => {
        const dialog = getByRole('alertdialog');
        const title = getByText('Test Title');
        const labelledBy = dialog.getAttribute('aria-labelledby');
        expect(labelledBy).toBeTruthy();
        expect(title.id).toBe(labelledBy);
      });
    });

    it('should have aria-describedby for content', async () => {
      const { getByRole, getByText } = render(
        <Notification title="test">
          <span>Test Content</span>
        </Notification>
      );

      await waitFor(() => {
        const dialog = getByRole('alertdialog');
        const content = getByText('Test Content').parentElement;
        const describedBy = dialog.getAttribute('aria-describedby');
        expect(describedBy).toBeTruthy();
        expect(content?.id).toBe(describedBy);
      });
    });

    it('should have aria-live attribute', async () => {
      const { getByRole } = render(
        <Notification title="test">
          <span>content</span>
        </Notification>
      );

      await waitFor(() => {
        expect(getByRole('alertdialog')).toHaveAttribute(
          'aria-live',
          'assertive'
        );
      });
    });

    it('should have no accessibility violations', async () => {
      const { container, getByRole } = render(
        <Notification title="test">
          <span>content</span>
        </Notification>
      );

      await waitFor(() => {
        expect(getByRole('alertdialog')).toBeInTheDocument();
      });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with all props', async () => {
      const { container, getByRole } = render(
        <Notification
          title="Important Notification"
          position="top-right"
          size="lg"
          width={500}
          height={300}
        >
          <div>
            <p>This is important content</p>
          </div>
        </Notification>
      );

      await waitFor(() => {
        expect(getByRole('alertdialog')).toBeInTheDocument();
      });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty title gracefully', async () => {
      const { getByRole } = render(
        <Notification title="">
          <span>content</span>
        </Notification>
      );

      await waitFor(() => {
        expect(getByRole('alertdialog')).toBeInTheDocument();
      });
    });

    it('should handle very long content', async () => {
      const longContent = 'x'.repeat(1000);
      const { getByRole } = render(
        <Notification title="test">
          <span>{longContent}</span>
        </Notification>
      );

      await waitFor(() => {
        expect(getByRole('alertdialog')).toBeInTheDocument();
      });
    });

    it('should handle complex children', async () => {
      const { getByRole, getByText } = render(
        <Notification title="test">
          <div>
            <h3>Heading</h3>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
            <button>Action</button>
          </div>
        </Notification>
      );

      await waitFor(() => {
        expect(getByRole('alertdialog')).toBeInTheDocument();
        expect(getByText('Heading')).toBeInTheDocument();
        expect(getByText('Action')).toBeInTheDocument();
      });
    });
  });
});
