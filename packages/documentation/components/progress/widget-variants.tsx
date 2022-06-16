import { CircularProgress, Progress } from '../../../lib/components';

export const Success = (
  <Progress
    type="determinate"
    maxValue={32}
    currentValue={31}
    size="sm"
    status="success"
  />
);

export const Error = (
  <Progress
    type="determinate"
    maxValue={50}
    currentValue={25}
    showProgressValue
    size="lg"
    status="error"
    RTL
  />
);

export const Infinite = (
  <Progress
    type="indeterminate"
    maxValue={50}
    currentValue={40}
    showProgressValue
    size="sm"
  />
);

export const Circular = <CircularProgress size={'md'} />;
