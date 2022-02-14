import React from 'react';
import { Alert, Button } from '../../../lib/components';

export const Information = <Alert message="This is a information text" />;

export const Dismiss = (
  <Alert message="This is a information text" canDismiss={false} />
);

export const Success = (
  <Alert message="This is a success text" state="success" />
);

export const Warning = (
  <Alert message="This is a warning text" state="warning" />
);

export const Error = (
  <Alert message="This is a error text" state="error" size="lg" />
);

export const Custom = (
  <Alert message="This is a information text" canDismiss={false}>
    <Button label="Custom Button" />
  </Alert>
);
