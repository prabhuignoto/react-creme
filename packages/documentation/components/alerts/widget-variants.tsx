import { Button } from '@core';
import { Alert } from '@feedback';

export const Information = <Alert message="This is a information text" />;

export const Dismiss = (
  <Alert message="This is a information text2" canDismiss animation="fade" />
);

export const Success = (
  <Alert message="This is a success text" state="success" canDismiss />
);

export const Warning = (
  <Alert message="This is a warning text" state="warning" size="md" />
);

export const Error = (
  <Alert message="This is a error text" state="error" size="md" />
);

export const Custom = (
  <Alert message="This is a information text" canDismiss={false}>
    <Button label="Custom Button" />
  </Alert>
);
