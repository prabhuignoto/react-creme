import React from 'react';
import { InputProps } from './input-model';
export declare type RCInputElementProps =
  | (Partial<HTMLInputElement> & {
      focus: () => void;
      getValue: () => string;
      setValue: (value: string) => void;
    })
  | null;
declare const Input: React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<RCInputElementProps>
>;
export { Input };
