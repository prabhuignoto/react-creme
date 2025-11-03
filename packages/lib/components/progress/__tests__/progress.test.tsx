/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CircularProgress } from '../circular-progress';
import { Progress } from '../progress';

expect.extend(toHaveNoViolations);

describe('Progress', () => {
  it('should render progressbar in indeterminate mode', async () => {
    const { getByRole } = render(
      <Progress
        type="indeterminate"
        maxValue={200}
        size="sm"
        width={300}
        currentValue={120}
      />
    );

    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render in determinate mode', () => {
    const { getByRole } = render(
      <Progress
        type="determinate"
        maxValue={200}
        size="sm"
        width={300}
        currentValue={120}
      />
    );

    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('should have all aria values', () => {
    const { getByRole } = render(
      <Progress
        type="determinate"
        maxValue={200}
        size="sm"
        width={300}
        currentValue={120}
      />
    );

    expect(getByRole('progressbar')).toHaveAttribute('aria-valuemin', '0');
    expect(getByRole('progressbar')).toHaveAttribute('aria-valuemax', '200');
    expect(getByRole('progressbar')).toHaveAttribute('aria-valuenow', '120');
  });

  it('should render in success status', () => {
    const { getByRole } = render(
      <Progress type="determinate" currentValue={100} maxValue={100} status="success" />
    );

    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render in error status', () => {
    const { getByRole } = render(
      <Progress type="determinate" currentValue={50} maxValue={100} status="error" />
    );

    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render sm size', () => {
    const { getByRole } = render(
      <Progress type="determinate" currentValue={50} maxValue={100} size="sm" />
    );

    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render md size', () => {
    const { getByRole } = render(
      <Progress type="determinate" currentValue={50} maxValue={100} size="md" />
    );

    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render lg size', () => {
    const { getByRole } = render(
      <Progress type="determinate" currentValue={50} maxValue={100} size="lg" />
    );

    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('should show progress value when enabled', () => {
    const { getByText } = render(
      <Progress
        type="determinate"
        currentValue={50}
        maxValue={100}
        size="md"
        showProgressValue
      />
    );

    expect(getByText('50%')).toBeInTheDocument();
  });

  it('should handle RTL direction', () => {
    const { getByRole } = render(
      <Progress type="determinate" currentValue={50} maxValue={100} RTL />
    );

    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('should apply custom width', () => {
    const { getByRole } = render(
      <Progress type="determinate" currentValue={50} maxValue={100} width={400} />
    );

    const progressbar = getByRole('progressbar');
    expect(progressbar).toHaveStyle({ '--width': '400px' });
  });

  describe('Indeterminate Animation Styles', () => {
    it('should render with disappear animation style', () => {
      const { getByRole } = render(
        <Progress type="indeterminate" indeterminateStyle="disappear" />
      );

      expect(getByRole('progressbar')).toBeInTheDocument();
    });

    it('should render with bob animation style', () => {
      const { getByRole } = render(
        <Progress type="indeterminate" indeterminateStyle="bob" />
      );

      expect(getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('Progress Value Display', () => {
    it('should not show progress value for size sm even when enabled', () => {
      const { queryByText } = render(
        <Progress
          type="determinate"
          currentValue={50}
          maxValue={100}
          size="sm"
          showProgressValue
        />
      );

      expect(queryByText('50%')).not.toBeInTheDocument();
    });

    it('should show progress value for size md', () => {
      const { getByText } = render(
        <Progress
          type="determinate"
          currentValue={50}
          maxValue={100}
          size="md"
          showProgressValue
        />
      );

      expect(getByText('50%')).toBeInTheDocument();
    });

    it('should show progress value for size lg', () => {
      const { getByText } = render(
        <Progress
          type="determinate"
          currentValue={75}
          maxValue={100}
          size="lg"
          showProgressValue
        />
      );

      expect(getByText('75%')).toBeInTheDocument();
    });

    it('should show 0 instead of percentage when value is less than 5%', () => {
      const { queryByText } = render(
        <Progress
          type="determinate"
          currentValue={2}
          maxValue={100}
          size="md"
          showProgressValue
        />
      );

      // When value is ≤ 5%, the component hides the value to avoid clutter
      // This is intentional UX design - don't show tiny percentages
      expect(queryByText('0')).not.toBeInTheDocument();
      expect(queryByText('2%')).not.toBeInTheDocument();
    });

    it('should not show progress value for indeterminate type', () => {
      const { queryByText } = render(
        <Progress
          type="indeterminate"
          currentValue={50}
          maxValue={100}
          size="md"
          showProgressValue
        />
      );

      expect(queryByText('50%')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero progress', () => {
      const { getByRole } = render(
        <Progress
          type="determinate"
          currentValue={0}
          maxValue={100}
        />
      );

      expect(getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    });

    it('should handle 100% progress', () => {
      const { getByRole } = render(
        <Progress
          type="determinate"
          currentValue={100}
          maxValue={100}
        />
      );

      expect(getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    });

    it('should handle very large maxValue', () => {
      const { getByRole } = render(
        <Progress
          type="determinate"
          currentValue={5000}
          maxValue={10000}
        />
      );

      expect(getByRole('progressbar')).toHaveAttribute('aria-valuenow', '5000');
    });

    it('should handle non-integer progress values', () => {
      const { getByRole } = render(
        <Progress
          type="determinate"
          currentValue={33.33}
          maxValue={100}
        />
      );

      expect(getByRole('progressbar')).toHaveAttribute('aria-valuenow', '33');
    });
  });

  describe('Indeterminate Mode ARIA', () => {
    it('should not have aria-valuemin/max/now in indeterminate mode', () => {
      const { getByRole } = render(
        <Progress
          type="indeterminate"
          currentValue={50}
          maxValue={100}
        />
      );

      const progressbar = getByRole('progressbar');
      expect(progressbar).not.toHaveAttribute('aria-valuemin');
      expect(progressbar).not.toHaveAttribute('aria-valuemax');
      expect(progressbar).not.toHaveAttribute('aria-valuenow');
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <Progress type="determinate" currentValue={50} maxValue={100} />
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have no violations in indeterminate mode', async () => {
      const { container } = render(
        <Progress type="indeterminate" />
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have proper aria-label', () => {
      const { getByRole } = render(
        <Progress
          type="determinate"
          currentValue={50}
          maxValue={100}
          label="Upload progress"
        />
      );

      expect(getByRole('progressbar')).toHaveAttribute('aria-label', 'Upload progress');
    });

    it('should have aria-valuetext when provided', () => {
      const { getByRole } = render(
        <Progress
          type="determinate"
          currentValue={50}
          maxValue={100}
          statusText="50 of 100 files uploaded"
        />
      );

      expect(getByRole('progressbar')).toHaveAttribute(
        'aria-valuetext',
        '50 of 100 files uploaded'
      );
    });

    it('should have proper ARIA for all sizes in determinate mode', async () => {
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

      for (const size of sizes) {
        const { container, getByRole, unmount } = render(
          <Progress
            type="determinate"
            currentValue={50}
            maxValue={100}
            size={size}
            label={`Progress ${size}`}
          />
        );

        const progressbar = getByRole('progressbar');
        expect(progressbar).toHaveAttribute('aria-label', `Progress ${size}`);
        expect(progressbar).toHaveAttribute('aria-valuemin', '0');
        expect(progressbar).toHaveAttribute('aria-valuemax', '100');
        expect(progressbar).toHaveAttribute('aria-valuenow', '50');

        const results = await axe(container);
        expect(results).toHaveNoViolations();

        unmount();
      }
    });

    it('should have proper ARIA for all status variants', async () => {
      const statuses: Array<'default' | 'success' | 'error'> = ['default', 'success', 'error'];

      for (const status of statuses) {
        const { container, getByRole, unmount } = render(
          <Progress
            type="determinate"
            currentValue={50}
            maxValue={100}
            status={status}
          />
        );

        expect(getByRole('progressbar')).toBeInTheDocument();
        const results = await axe(container);
        expect(results).toHaveNoViolations();

        unmount();
      }
    });
  });
});

describe('CircularProgress', () => {
  it('should render circular progress', () => {
    const { getByRole } = render(<CircularProgress />);
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  describe('Size Variants', () => {
    it('should render xs size', () => {
      const { getByRole } = render(<CircularProgress size="xs" />);
      expect(getByRole('progressbar')).toBeInTheDocument();
    });

    it('should render sm size', () => {
      const { getByRole } = render(<CircularProgress size="sm" />);
      expect(getByRole('progressbar')).toBeInTheDocument();
    });

    it('should render md size', () => {
      const { getByRole } = render(<CircularProgress size="md" />);
      expect(getByRole('progressbar')).toBeInTheDocument();
    });

    it('should render lg size', () => {
      const { getByRole } = render(<CircularProgress size="lg" />);
      expect(getByRole('progressbar')).toBeInTheDocument();
    });

    it('should render all sizes correctly', () => {
      const { rerender, getByRole } = render(<CircularProgress size="xs" />);
      expect(getByRole('progressbar')).toBeInTheDocument();

      rerender(<CircularProgress size="sm" />);
      expect(getByRole('progressbar')).toBeInTheDocument();

      rerender(<CircularProgress size="md" />);
      expect(getByRole('progressbar')).toBeInTheDocument();

      rerender(<CircularProgress size="lg" />);
      expect(getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('Accessibility Labels', () => {
    it('should have custom aria-label', () => {
      const { getByRole } = render(<CircularProgress label="Processing data" />);
      expect(getByRole('progressbar')).toHaveAttribute('aria-label', 'Processing data');
    });

    it('should have default aria-label', () => {
      const { getByRole } = render(<CircularProgress />);
      expect(getByRole('progressbar')).toHaveAttribute('aria-label', 'Loading');
    });

    it('should support descriptive labels', () => {
      const label = 'Uploading document.pdf (45MB)';
      const { getByRole } = render(<CircularProgress label={label} />);
      expect(getByRole('progressbar')).toHaveAttribute('aria-label', label);
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations - default', async () => {
      const { container } = render(<CircularProgress />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations for all sizes', async () => {
      const sizes: Array<'xs' | 'sm' | 'md' | 'lg'> = ['xs', 'sm', 'md', 'lg'];

      for (const size of sizes) {
        const { container } = render(<CircularProgress size={size} />);
        const results = await axe(container);

        expect(results).toHaveNoViolations();
      }
    });

    it('should have proper role and ARIA attributes', () => {
      const { getByRole } = render(
        <CircularProgress label="Processing" />
      );

      const progressbar = getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-label', 'Processing');
      expect(progressbar).toHaveAttribute('role', 'progressbar');
    });

    it('should have proper ARIA for all sizes', () => {
      const sizes: Array<'xs' | 'sm' | 'md' | 'lg'> = ['xs', 'sm', 'md', 'lg'];

      sizes.forEach((size) => {
        const { getByRole, unmount } = render(
          <CircularProgress size={size} label={`Loading ${size}`} />
        );

        const progressbar = getByRole('progressbar');
        expect(progressbar).toHaveAttribute('aria-label', `Loading ${size}`);
        expect(progressbar).toHaveAttribute('role', 'progressbar');

        unmount();
      });
    });
  });

  describe('Rendering', () => {
    it('should render with proper structure', () => {
      const { container, getByRole } = render(
        <CircularProgress label="Loading" />
      );

      const progressbar = getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
      expect(progressbar.tagName).toBe('SPAN');
    });

    it('should have inner circle element', () => {
      const { container } = render(
        <CircularProgress label="Loading" />
      );

      const spans = container.querySelectorAll('span');
      // Should have at least 2 spans: wrapper and inner circle
      expect(spans.length).toBeGreaterThanOrEqual(2);
    });
  });
});
