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

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <Progress type="determinate" currentValue={50} maxValue={100} />
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
  });
});

describe('CircularProgress', () => {
  it('should render circular progress', () => {
    const { getByRole } = render(<CircularProgress />);
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render all sizes', () => {
    const { rerender, getByRole } = render(<CircularProgress size="xs" />);
    expect(getByRole('progressbar')).toBeInTheDocument();

    rerender(<CircularProgress size="sm" />);
    expect(getByRole('progressbar')).toBeInTheDocument();

    rerender(<CircularProgress size="md" />);
    expect(getByRole('progressbar')).toBeInTheDocument();

    rerender(<CircularProgress size="lg" />);
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('should have custom aria-label', () => {
    const { getByRole } = render(<CircularProgress label="Processing data" />);
    expect(getByRole('progressbar')).toHaveAttribute('aria-label', 'Processing data');
  });

  it('should have default aria-label', () => {
    const { getByRole } = render(<CircularProgress />);
    expect(getByRole('progressbar')).toHaveAttribute('aria-label', 'Loading');
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<CircularProgress />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
