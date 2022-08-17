import React from 'react';
import { ListOption } from './list-model';
declare const ListItems: React.ForwardRefExoticComponent<
  Omit<
    import('./list-model').ListProps,
    | 'border'
    | 'maxHeight'
    | 'enableSearch'
    | 'noUniqueIds'
    | 'minHeight'
    | 'backGroundColor'
  > & {
    handleSelection: (opt: ListOption<string>) => void;
    id?: string | undefined;
    renderHash?: number | undefined;
    resetState?: number | undefined;
    selectedIndex?: number | undefined;
    visibleRange: [number, number];
  } & React.RefAttributes<Partial<HTMLUListElement>>
>;
export { ListItems };
