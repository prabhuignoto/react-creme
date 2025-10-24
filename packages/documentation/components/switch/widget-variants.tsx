import { Switch } from '../../../lib/components/switch/switch';

export const Default = (
  <Switch
    label="Dark Mode"
    checked
    onChange={val => console.log('Dark mode:', val)}
    size="sm"
  />
);

export const LabelOutside = (
  <Switch
    label="Enable Notifications"
    labelOutside
    focusable
    checked
    width={200}
    onChange={val => console.log('Notifications:', val)}
  />
);

export const CheckIcon = (
  <Switch
    label="Premium Features"
    showCheckIcon
    checked
    onChange={val => console.log('Premium:', val)}
  />
);

export const Disabled = (
  <Switch label="Unavailable Setting" disabled checked />
);

export const ReadOnly = (
  <Switch label="Read-only Setting" readOnly checked />
);

export const Loading = (
  <Switch label="Saving preferences..." loading checked />
);

export const AriaLabel = (
  <Switch
    aria-label="Toggle compact mode"
    checked
    onChange={val => console.log('Compact mode:', val)}
  />
);

export const WithDescription = (
  <div>
    <Switch
      label="Auto-save"
      checked
      aria-describedby="autosave-desc"
      onChange={val => console.log('Auto-save:', val)}
    />
    <p id="autosave-desc" style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
      Automatically save your work every 5 minutes
    </p>
  </div>
);

export const Medium = (
  <Switch
    label="Email Notifications"
    size="md"
    checked
    onChange={val => console.log('Email:', val)}
  />
);

export const Large = (
  <Switch
    label="Marketing Communications"
    size="lg"
    labelOutside
    checked
    onChange={val => console.log('Marketing:', val)}
  />
);
