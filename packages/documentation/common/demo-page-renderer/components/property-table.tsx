import { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Section } from '../../../../lib/components';
import { DataGrid } from '../../../../lib/components/data-grid/data-grid';
import { DataGridColumn } from '../../../../lib/components/data-grid/data-grid-model';
import type { PropertyMeta, CallbackMeta } from '../types';
import './property-table.scss';

export interface PropertyTableProps {
  /** Component properties */
  properties?: PropertyMeta[];

  /** Component callbacks/events */
  callbacks?: CallbackMeta[];

  /** DataGrid columns configuration */
  columns: DataGridColumn[];

  /** Enable search/filter */
  searchable?: boolean;

  /** Optional CSS class name */
  className?: string;
}

/**
 * PropertyTable - Display component properties and callbacks
 *
 * Features:
 * - Reusable across all component pages
 * - DataGrid integration
 * - Separate sections for properties and callbacks
 * - Responsive columns
 * - Clean, modern design
 *
 * @example
 * ```tsx
 * <PropertyTable
 *   properties={[
 *     { name: 'variant', type: 'string', description: '...' }
 *   ]}
 *   callbacks={[
 *     { name: 'onChange', signature: '(value) => void', description: '...' }
 *   ]}
 *   columns={columns}
 * />
 * ```
 */
const PropertyTable: FunctionComponent<PropertyTableProps> = ({
  properties,
  callbacks,
  columns,
  searchable = false,
  className,
}) => {
  const hasProperties = properties && properties.length > 0;
  const hasCallbacks = callbacks && callbacks.length > 0;

  if (!hasProperties && !hasCallbacks) {
    return null;
  }

  return (
    <div className={classNames('property-table', className)}>
      {/* Properties Section */}
      {hasProperties && (
        <Section title="Properties" size="md" className="property-table__section">
          <DataGrid
            layoutStyle="comfortable"
            columns={columns}
            data={properties}
            rowHeight={68}
            size="sm"
            className="property-table__grid"
          />
        </Section>
      )}

      {/* Callbacks Section */}
      {hasCallbacks && (
        <Section title="Callbacks" size="md" className="property-table__section">
          <DataGrid
            layoutStyle="comfortable"
            columns={columns}
            data={callbacks}
            rowHeight={68}
            size="sm"
            className="property-table__grid"
          />
        </Section>
      )}
    </div>
  );
};

PropertyTable.displayName = 'PropertyTable';

export { PropertyTable };
export default PropertyTable;
