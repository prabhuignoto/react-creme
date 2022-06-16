import { Pin } from '../../../lib/components';

export const Default = <Pin />;
export const CustomLength = (
  <Pin length={5} onChange={val => console.log(val)} />
);
export const RTL = <Pin length={6} RTL />;

export const MediumSized = <Pin size="md" />;
export const LargeSized = <Pin size="lg" />;
export const SmallSized = <Pin size="sm" />;
