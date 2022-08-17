import * as React from 'react';
import { RCInputElementProps } from '../../inputs/input/input';
import { AutoSuggestProps } from './auto-suggest.model';
declare const AutoSuggest: React.ForwardRefExoticComponent<
  AutoSuggestProps & React.RefAttributes<RCInputElementProps>
>;
export { AutoSuggest };
