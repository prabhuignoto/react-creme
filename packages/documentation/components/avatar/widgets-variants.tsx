import { RateIcon } from '@icons';
import { Avatar } from '@lib';

export const Default = <Avatar />;

export const MediumSized = <Avatar size="md" />;

export const LargeSized = <Avatar size="lg" />;

export const CustomIcon = (
  <Avatar size="lg">
    <RateIcon />
  </Avatar>
);

export const Letter = <Avatar size="lg" letter="A" />;
