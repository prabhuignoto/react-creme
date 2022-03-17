import { ReactNode } from 'react';

export type WizardProps = {
  children: ReactNode[];
};

export type WizardHeadsProps = {
  items: { id: string; name: string }[];
};
