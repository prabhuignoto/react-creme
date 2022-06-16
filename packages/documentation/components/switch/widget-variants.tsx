import { Switch } from '../../../lib/components/switch/switch';

export const Default = (
  <Switch
    label="Settings"
    checked
    onChange={val => console.log(val)}
    size="sm"
  />
);

export const LabelOutside = (
  <Switch label="Settings" labelOutside focusable checked />
);

export const CheckIcon = (
  <Switch label="Enable Setting" showCheckIcon checked />
);

export const Disabled = <Switch label="setting" disabled />;

export const Medium = <Switch label="Are you authorized" size="md" checked />;

export const Large = (
  <Switch label="Show settings" size="lg" labelOutside checked />
);
