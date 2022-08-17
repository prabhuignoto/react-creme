import * as React from 'react';
import { ListProps } from './list-model';
declare const List: React.ForwardRefExoticComponent<
  ListProps & React.RefAttributes<Partial<HTMLUListElement>>
>;
export { List };
