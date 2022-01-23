import React from 'react';
import { CircularProgress, Progress } from '../../../lib/components';

export const Success = (
  <Progress
    type="progressive"
    maxValue={32}
    currentValue={31}
    size="sm"
    status="success"
  />
);

export const Error = (
  <Progress
    type="progressive"
    maxValue={50}
    currentValue={25}
    showProgressValue
    size="lg"
    status="error"
  />
);

export const Infinite = (
  <Progress
    type="infinite"
    maxValue={50}
    currentValue={40}
    showProgressValue
    size="sm"
  />
);

export const Circular = <CircularProgress size={'md'} />;
