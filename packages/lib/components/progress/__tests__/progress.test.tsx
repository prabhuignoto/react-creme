import { render } from '@testing-library/react';
import { Progress } from '../progress';

describe('Progress', () => {
  it.concurrent('should render progressbar in indeterminate mode', async () => {
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

  it.concurrent('should render in determinate mode', () => {
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

  it.concurrent('should have all aria values', () => {
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
});
