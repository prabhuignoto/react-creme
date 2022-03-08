import { FormHTMLAttributes, ReactNode } from 'react';

export type FormGroupProps = FormHTMLAttributes<HTMLFormElement> & {
  RTL?: boolean;
  children: ReactNode | ReactNode[];
  onCancel?: () => void;
  onSubmit?: () => void;
};

export type FormItemProps = {
  child?: ReactNode;
  id?: string;
};
