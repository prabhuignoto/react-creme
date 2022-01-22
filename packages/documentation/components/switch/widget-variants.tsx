import React from 'react';
import { Switch } from '../../../lib/components/switch/switch';

export const Default = () => (
  <Switch label="Settings" checked onChange={(val) => console.log(val)} />
);

export const LabelOutside = () => (
  <Switch label="Settings" labelOutside focusable />
);

export const CheckIcon = () => (
  <Switch label="Enable Setting" showCheckIcon checked />
);

export const Disabled = () => <Switch label="setting" disabled />;

export const Large = () => <Switch label="Are you authorized" size="md" />;

export const ExtraLarge = (
  <Switch label="Show settings" size="lg" labelOutside />
);
