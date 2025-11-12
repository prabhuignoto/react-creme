import { describe, it, expect } from 'vitest';
import {
  flattenGroupedSuggestions,
  filterGroupedSuggestions,
  findGroupByItemValue,
  flatGroupsToOptions,
  getAllGroupedItems,
} from '../groupedSuggestionsUtils';
import { AutoSuggestGroup } from '../auto-suggest.model';

describe('groupedSuggestionsUtils', () => {
  const mockGroups: AutoSuggestGroup[] = [
    {
      items: [
        { name: 'Apple', value: 'apple' },
        { name: 'Banana', value: 'banana' },
      ],
      label: 'Fruits',
    },
    {
      items: [
        { name: 'Carrot', value: 'carrot' },
        { name: 'Broccoli', value: 'broccoli' },
      ],
      label: 'Vegetables',
    },
  ];

  describe('flattenGroupedSuggestions', () => {
    it('should flatten groups with headers and items', () => {
      const flat = flattenGroupedSuggestions(mockGroups);

      expect(flat).toHaveLength(6); // 2 headers + 4 items
      expect(flat[0].isGroupHeader).toBe(true);
      expect(flat[0].name).toBe('Fruits');
      expect(flat[1].name).toBe('Apple');
      expect(flat[1].groupLabel).toBe('Fruits');
    });

    it('should preserve group labels on items', () => {
      const flat = flattenGroupedSuggestions(mockGroups);
      const fruitItems = flat.filter(
        item => item.groupLabel === 'Fruits' && !item.isGroupHeader
      );

      expect(fruitItems).toHaveLength(2);
      expect(fruitItems[0].name).toBe('Apple');
      expect(fruitItems[1].name).toBe('Banana');
    });

    it('should create proper group header IDs', () => {
      const flat = flattenGroupedSuggestions(mockGroups);
      const headers = flat.filter(item => item.isGroupHeader);

      expect(headers[0].id).toBe('group-fruits');
      expect(headers[1].id).toBe('group-vegetables');
    });

    it('should handle empty groups', () => {
      const emptyGroups: AutoSuggestGroup[] = [
        { items: [], label: 'Empty' },
      ];

      const flat = flattenGroupedSuggestions(emptyGroups);

      // Should still have the header
      expect(flat).toHaveLength(1);
      expect(flat[0].isGroupHeader).toBe(true);
    });
  });

  describe('filterGroupedSuggestions', () => {
    it('should filter items within groups by prefix match', () => {
      const filtered = filterGroupedSuggestions(mockGroups, 'app');

      expect(filtered).toHaveLength(1);
      expect(filtered[0].label).toBe('Fruits');
      expect(filtered[0].items).toHaveLength(1);
      expect(filtered[0].items[0].name).toBe('Apple');
    });

    it('should be case-insensitive', () => {
      const filtered = filterGroupedSuggestions(mockGroups, 'CARR');

      expect(filtered).toHaveLength(1);
      expect(filtered[0].label).toBe('Vegetables');
      expect(filtered[0].items[0].name).toBe('Carrot');
    });

    it('should remove groups with no matching items', () => {
      const filtered = filterGroupedSuggestions(mockGroups, 'xyz');

      expect(filtered).toHaveLength(0);
    });

    it('should return all groups when search term is empty', () => {
      const filtered = filterGroupedSuggestions(mockGroups, '');

      expect(filtered).toEqual(mockGroups);
    });

    it('should match multiple items within a group', () => {
      const filtered = filterGroupedSuggestions(mockGroups, 'b');

      expect(filtered).toHaveLength(2); // Fruits (Banana) and Vegetables (Broccoli)
      expect(filtered[0].items[0].name).toBe('Banana');
      expect(filtered[1].items[0].name).toBe('Broccoli');
    });
  });

  describe('findGroupByItemValue', () => {
    it('should find group containing item by value', () => {
      const group = findGroupByItemValue(mockGroups, 'apple');

      expect(group).toBeDefined();
      expect(group?.label).toBe('Fruits');
    });

    it('should return undefined for non-existent value', () => {
      const group = findGroupByItemValue(mockGroups, 'xyz');

      expect(group).toBeUndefined();
    });

    it('should find correct group for vegetables', () => {
      const group = findGroupByItemValue(mockGroups, 'carrot');

      expect(group?.label).toBe('Vegetables');
    });
  });

  describe('flatGroupsToOptions', () => {
    it('should flatten groups to options array', () => {
      const options = flatGroupsToOptions(mockGroups);

      expect(options).toHaveLength(4);
      expect(options[0]).toEqual({ name: 'Apple', value: 'apple' });
      expect(options[1]).toEqual({ name: 'Banana', value: 'banana' });
      expect(options[2]).toEqual({ name: 'Carrot', value: 'carrot' });
      expect(options[3]).toEqual({ name: 'Broccoli', value: 'broccoli' });
    });

    it('should return empty array for empty groups', () => {
      const options = flatGroupsToOptions([]);

      expect(options).toHaveLength(0);
    });
  });

  describe('getAllGroupedItems', () => {
    it('should return all items with group labels', () => {
      const items = getAllGroupedItems(mockGroups);

      expect(items).toHaveLength(4);
      expect(items[0]).toEqual({
        groupLabel: 'Fruits',
        name: 'Apple',
        value: 'apple',
      });
      expect(items[2]).toEqual({
        groupLabel: 'Vegetables',
        name: 'Carrot',
        value: 'carrot',
      });
    });

    it('should preserve group context for all items', () => {
      const items = getAllGroupedItems(mockGroups);
      const fruitsItems = items.filter(item => item.groupLabel === 'Fruits');

      expect(fruitsItems).toHaveLength(2);
      expect(fruitsItems.every(item => item.groupLabel === 'Fruits')).toBe(
        true
      );
    });
  });

  describe('integration', () => {
    it('should work together for filtering and flattening workflow', () => {
      // User types to search
      const filtered = filterGroupedSuggestions(mockGroups, 'br');

      // System flattens for rendering
      const flat = flattenGroupedSuggestions(filtered);

      // Should have group header + 1 item
      expect(flat).toHaveLength(2);
      expect(flat[0].isGroupHeader).toBe(true);
      expect(flat[0].name).toBe('Vegetables');
      expect(flat[1].name).toBe('Broccoli');
    });
  });
});
