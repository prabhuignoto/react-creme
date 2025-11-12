import { AutoSuggestGroup, AutoSuggestOption } from './auto-suggest.model';
import { Option } from '../dropdown/dropdown-model';

/**
 * Represents a suggestion item with optional group information
 */
export interface GroupedSuggestionItem extends Option {
  groupLabel?: string;
  isGroupHeader?: boolean;
}

/**
 * Flattens grouped suggestions into a flat array suitable for rendering
 * while preserving group information through custom properties
 *
 * @param groups - Array of suggestion groups
 * @returns Flattened array with group headers and items
 *
 * @example
 * const groups = [
 *   { label: 'Fruits', items: [{ name: 'Apple', value: 'apple' }] },
 *   { label: 'Vegetables', items: [{ name: 'Carrot', value: 'carrot' }] }
 * ];
 * const flat = flattenGroupedSuggestions(groups);
 * // Result: [
 * //   { id: 'group-fruits', name: 'Fruits', isGroupHeader: true, groupLabel: 'Fruits' },
 * //   { id: 'apple', name: 'Apple', value: 'apple', groupLabel: 'Fruits' },
 * //   { id: 'group-vegetables', name: 'Vegetables', isGroupHeader: true, groupLabel: 'Vegetables' },
 * //   { id: 'carrot', name: 'Carrot', value: 'carrot', groupLabel: 'Vegetables' }
 * // ]
 */
export function flattenGroupedSuggestions(
  groups: AutoSuggestGroup[]
): GroupedSuggestionItem[] {
  const result: GroupedSuggestionItem[] = [];

  for (const group of groups) {
    // Add group header
    result.push({
      groupLabel: group.label,
      id: `group-${group.label.toLowerCase().replace(/\s+/g, '-')}`,
      isGroupHeader: true,
      name: group.label,
      value: '',
    });

    // Add group items
    for (const item of group.items) {
      result.push({
        groupLabel: group.label,
        id: `${item.value}`,
        name: item.name,
        value: item.value,
      });
    }
  }

  return result;
}

/**
 * Filters grouped suggestions based on search input
 * Groups without matching items are removed
 *
 * @param groups - Array of suggestion groups
 * @param searchTerm - Search term to filter by (case-insensitive prefix match)
 * @returns Filtered groups with matching items
 *
 * @example
 * const groups = [
 *   { label: 'Fruits', items: [{ name: 'Apple', value: 'apple' }] },
 *   { label: 'Vegetables', items: [{ name: 'Carrot', value: 'carrot' }] }
 * ];
 * const filtered = filterGroupedSuggestions(groups, 'app');
 * // Result: [{ label: 'Fruits', items: [{ name: 'Apple', value: 'apple' }] }]
 */
export function filterGroupedSuggestions(
  groups: AutoSuggestGroup[],
  searchTerm: string
): AutoSuggestGroup[] {
  if (!searchTerm) return groups;

  const lowerSearchTerm = searchTerm.toLowerCase();

  return groups
    .map(group => ({
      ...group,
      items: group.items.filter(item =>
        item.name.toLowerCase().startsWith(lowerSearchTerm)
      ),
    }))
    .filter(group => group.items.length > 0);
}

/**
 * Finds the group that contains a specific suggestion by value
 *
 * @param groups - Array of suggestion groups
 * @param value - The value to search for
 * @returns The group containing the suggestion, or undefined
 */
export function findGroupByItemValue(
  groups: AutoSuggestGroup[],
  value: string
): AutoSuggestGroup | undefined {
  return groups.find(group =>
    group.items.some(item => item.value === value)
  );
}

/**
 * Converts grouped suggestions back to flat array of options
 *
 * @param groups - Array of suggestion groups
 * @returns Flat array of options
 */
export function flatGroupsToOptions(groups: AutoSuggestGroup[]): AutoSuggestOption[] {
  return groups.flatMap(group => group.items);
}

/**
 * Gets all items from grouped suggestions with their group labels
 * Useful for rendering with proper group context
 *
 * @param groups - Array of suggestion groups
 * @returns Array of items with group information
 */
export function getAllGroupedItems(
  groups: AutoSuggestGroup[]
): Array<AutoSuggestOption & { groupLabel: string }> {
  return groups.flatMap(group =>
    group.items.map(item => ({
      ...item,
      groupLabel: group.label,
    }))
  );
}
