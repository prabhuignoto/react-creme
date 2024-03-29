import { Input } from '../../../lib/components';
import { ChevronRightIcon } from '../../../lib/icons';

export const Default = <Input enableClear maxLength={10}></Input>;
export const WithIcon = (
  <Input focusable>
    <ChevronRightIcon />
  </Input>
);
export const WithBorder = (
  <Input border>
    <ChevronRightIcon />
  </Input>
);
export const Error = <Input state="error" focusable></Input>;
export const Success = <Input state="success"></Input>;
export const RTL = (
  <Input focusable RTL>
    <ChevronRightIcon />
  </Input>
);

export const Accent = (
  <Input focusable accent="rounded">
    <ChevronRightIcon />
  </Input>
);

export const MaxLength = <Input maxLength={5}></Input>;
