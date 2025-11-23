import { useMemo } from 'react';
import { DataGridColumn } from '../../../lib/components/data-grid/data-grid-model';
import { MediaState } from '../../atoms/home';

interface ColumnWidths {
  name: number;
  description: number;
  default: number;
}

/**
 * Custom hook for generating responsive DataGrid columns based on media breakpoints
 * Centralizes column configuration logic for demo pages
 */
export function useResponsiveColumns(
  media: MediaState | null,
  customWidths?: Partial<ColumnWidths>
): DataGridColumn[] {
  return useMemo(() => {
    // Default columns for initial render (before media is available)
    if (!media) {
      return [
        {
          formatter: val => (val ? `<em>${val}</em>` : ''),
          name: 'name',
          searchable: true,
          sortable: true,
          type: 'string',
          width: 150,
          parseHtml: true,
        },
        { name: 'description', searchable: true, type: 'string' },
        {
          formatter: val => (val ? `<em>${val}</em>` : ''),
          name: 'default',
          type: 'string',
          width: 150,
          parseHtml: true,
        },
        { name: 'optional', type: 'string' },
        { name: 'type', type: 'string' },
      ];
    }

    // Mobile: Minimal columns, no widths
    if (media.isMobile) {
      return [
        {
          formatter: val => (val ? `<em>${val}</em>` : ''),
          name: 'name',
          sortable: true,
          type: 'string',
          parseHtml: true,
        },
        { name: 'description', type: 'string' },
      ];
    }

    // Extra Large Screen: All columns with custom widths
    if (media.isExtraLargeScreen) {
      const widths: ColumnWidths = {
        name: customWidths?.name ?? 200,
        description: customWidths?.description ?? 450,
        default: customWidths?.default ?? 200,
      };

      return [
        {
          formatter: val => (val ? `<em>${val}</em>` : ''),
          name: 'name',
          searchable: true,
          sortable: true,
          type: 'string',
          width: widths.name,
          parseHtml: true,
        },
        {
          name: 'description',
          searchable: true,
          type: 'string',
          width: widths.description,
        },
        {
          formatter: val => (val ? `<em>${val}</em>` : ''),
          name: 'default',
          type: 'string',
          width: widths.default,
          parseHtml: true,
        },
        { name: 'optional', type: 'string' },
        { name: 'type', type: 'string' },
      ];
    }

    // Default: Standard 3-column layout
    return [
      {
        formatter: val => (val ? `<em>${val}</em>` : ''),
        name: 'name',
        searchable: true,
        sortable: true,
        type: 'string',
        width: 150,
        parseHtml: true,
      },
      { name: 'description', searchable: true, type: 'string' },
      {
        formatter: val => (val ? `<em>${val}</em>` : ''),
        name: 'default',
        type: 'string',
        width: 150,
        parseHtml: true,
      },
    ];
  }, [media, customWidths?.name, customWidths?.description, customWidths?.default]);
}
