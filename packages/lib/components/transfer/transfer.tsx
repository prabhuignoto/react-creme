import { nanoid } from 'nanoid';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useFirstRender } from '../common/effects/useFirstRender';
import { ListOption } from '../list/list-model';
import { TransferControlColumn } from './transfer-control-column';
import { TransferList } from './transfer-list';
import { TransferListInternalModel, TransferProps } from './transfer-model';
import styles from './transfer.module.scss';

/**
 * Maps an array of strings to internal transfer list items with unique IDs.
 * Each item is initialized with selection and visibility states.
 */
const initMapper = (list: string[]): TransferListInternalModel[] =>
  list.map(item => ({
    id: nanoid(),
    name: item,
    selected: false,
    visible: true,
  }));

/**
 * Transfer Component - A two-list transfer component for moving items between lists.
 * Provides full keyboard navigation, ARIA accessibility, and customizable options.
 *
 * **Keyboard Shortcuts:**
 * - Tab/Shift+Tab: Navigate between lists and control buttons
 * - Ctrl/Cmd+Right Arrow: Transfer selected items to the right list
 * - Ctrl/Cmd+Left Arrow: Transfer selected items to the left list
 * - Arrow keys: Navigate within each list
 * - Click buttons: Transfer selected items with mouse
 *
 * **Accessibility:**
 * - WCAG 2.1 Level AA compliant
 * - Full keyboard support with proper ARIA labels
 * - Screen reader announcements for transfers
 * - Semantic HTML with proper roles and relationships
 *
 * @param {string[]} list1 - Initial items in the left (source) list
 * @param {string[]} list2 - Initial items in the right (target) list
 * @param {function} onChange - Callback when lists change: (list1: string[], list2: string[]) => void
 * @param {boolean} [enableSearch=false] - Enable search/filter in both lists
 * @param {boolean} [virtualize=false] - Enable virtualization for large lists
 * @param {boolean} [focusable=false] - Make lists focusable without explicit tab
 * @param {'sm' | 'md' | 'lg'} [size='sm'] - Size variant of buttons and lists (sm, md, lg)
 * @param {boolean} [RTL=false] - Enable right-to-left layout
 *
 * @example
 * ```tsx
 * import { Transfer } from 'react-creme';
 *
 * export function MyTransfer() {
 *   const [available, setAvailable] = useState(['Item 1', 'Item 2']);
 *   const [selected, setSelected] = useState([]);
 *
 *   return (
 *     <Transfer
 *       list1={available}
 *       list2={selected}
 *       onChange={(l1, l2) => {
 *         setAvailable(l1);
 *         setSelected(l2);
 *       }}
 *       enableSearch
 *       size="md"
 *     />
 *   );
 * }
 * ```
 */
const Transfer: React.FunctionComponent<TransferProps> = ({
  list1,
  list2,
  onChange,
  enableSearch = false,
  virtualize = false,
  focusable = false,
  size = 'sm',
  RTL = false,
  showTransferAll = false,
}) => {
  // Initialize state with memoized derived values from props
  const initialLists = useMemo(
    () => ({
      left: initMapper(list1),
      right: initMapper(list2),
    }),
    [list1, list2]
  );

  const [leftList, setLeftList] = useState<TransferListInternalModel[]>(
    initialLists.left
  );
  const [rightList, setRightList] = useState<TransferListInternalModel[]>(
    initialLists.right
  );

  const [leftSelected, setLeftSelected] = useState<TransferListInternalModel[]>(
    []
  );

  const isFirstRender = useFirstRender();

  const [rightSelected, setRightSelected] = useState<
    TransferListInternalModel[]
  >([]);

  // Store IDs for aria-controls
  const leftListId = useRef(`transfer-list-left-${nanoid()}`);
  const rightListId = useRef(`transfer-list-right-${nanoid()}`);
  const announcementId = useRef(`transfer-announce-${nanoid()}`);

  // Generate announcements for transfers
  const [lastTransferMessage, setLastTransferMessage] = useState('');

  // Reference to wrapper for keyboard event handling
  const wrapperRef = useRef<HTMLDivElement>(null);

  /**
   * Transfer selected items between lists.
   * Fixed dependencies to use actual arrays instead of .length.
   */
  const transfer = useCallback(
    (dir: string) => {
      if (dir === 'right' && leftSelected.length > 0) {
        setRightList(prev => prev.concat(leftSelected));
        const leftSelectedIds = leftSelected.map(item => item.id);
        setLeftList(prev =>
          prev.filter(item => !leftSelectedIds.includes(item.id))
        );
        setRightSelected(prev => prev.concat(leftSelected));
        setLeftSelected([]);
        setLastTransferMessage(
          `${leftSelected.length} item${leftSelected.length !== 1 ? 's' : ''} moved to selected list`
        );
      } else if (dir === 'left' && rightSelected.length > 0) {
        setLeftList(prev => prev.concat(rightSelected));
        const rightSelectedIds = rightSelected.map(item => item.id);
        setRightList(prev =>
          prev.filter(item => !rightSelectedIds.includes(item.id))
        );
        setLeftSelected(prev => prev.concat(rightSelected));
        setRightSelected([]);
        setLastTransferMessage(
          `${rightSelected.length} item${rightSelected.length !== 1 ? 's' : ''} moved to available list`
        );
      }
    },
    [leftSelected, rightSelected] // FIXED: Use actual arrays, not .length
  );

  /**
   * Transfer all items between lists.
   * Moves all items from source list to target list.
   */
  const transferAll = useCallback(
    (dir: string) => {
      if (dir === 'right' && leftList.length > 0) {
        setRightList(prev => prev.concat(leftList));
        setLeftList([]);
        setRightSelected(prev => prev.concat(leftList));
        setLeftSelected([]);
        setLastTransferMessage(
          `All ${leftList.length} item${leftList.length !== 1 ? 's' : ''} moved to selected list`
        );
      } else if (dir === 'left' && rightList.length > 0) {
        setLeftList(prev => prev.concat(rightList));
        setRightList([]);
        setLeftSelected(prev => prev.concat(rightList));
        setRightSelected([]);
        setLastTransferMessage(
          `All ${rightList.length} item${rightList.length !== 1 ? 's' : ''} moved to available list`
        );
      }
    },
    [leftList, rightList]
  );

  /**
   * Handle keyboard shortcuts for transferring items.
   * Ctrl+Right Arrow: Transfer selected items to the right list
   * Ctrl+Left Arrow: Transfer selected items to the left list
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      // Support Ctrl+Right and Ctrl+Left for transfers
      if (event.ctrlKey || event.metaKey) {
        // Handle Ctrl/Cmd + Right Arrow
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          transfer('right');
        }
        // Handle Ctrl/Cmd + Left Arrow
        else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          transfer('left');
        }
      }
    },
    [transfer]
  );

  /**
   * Handle selection changes in the left list.
   * Updates selection state and marks items as selected in the list.
   */
  const handleListSelectionLeft = useCallback((sel: ListOption[]) => {
    setLeftSelected(
      sel.map(item => ({
        id: item.id || nanoid(), // Ensure id is always defined
        name: item.name,
        selected: true,
        visible: true,
      }))
    );
    const selIds = sel.map(item => item.id);
    setLeftList(prev =>
      prev.map(item => ({
        ...item,
        selected: selIds.includes(item.id),
      }))
    );
  }, []);

  /**
   * Handle selection changes in the right list.
   * Fixed: Removed duplicate setRightSelected call (line 99 in original).
   */
  const handleListSelectionRight = useCallback((sel: ListOption[]) => {
    setRightSelected(
      sel.map(item => ({
        id: item.id || nanoid(), // Ensure id is always defined
        name: item.name,
        selected: true,
        visible: true,
      }))
    );
    const selIds = sel.map(item => item.id);
    setRightList(prev =>
      prev.map(item => ({
        ...item,
        selected: selIds.includes(item.id),
      }))
    );
  }, []);

  /**
   * Sync component state when props change.
   * Handles updates to list1 and list2 props.
   */
  useEffect(() => {
    setLeftList(initialLists.left);
    setRightList(initialLists.right);
    setLeftSelected([]);
    setRightSelected([]);
  }, [initialLists]);

  /**
   * Call onChange callback when lists change (excluding first render).
   */
  useEffect(() => {
    if (onChange && !isFirstRender.current) {
      onChange(
        leftList.map(item => item.name),
        rightList.map(item => item.name)
      );
    }
  }, [leftList, rightList, onChange, isFirstRender]);

  return (
    <div
      className={styles.wrapper}
      ref={wrapperRef}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Transfer widget"
      aria-describedby={announcementId.current}
    >
      <section
        aria-label={`Available items to transfer (${leftList.length} items)`}
        id={leftListId.current}
      >
        <div className={styles.list_header}>
          <span className={styles.list_title}>Available</span>
          <span className={styles.list_count}>{leftList.length}</span>
        </div>
        {leftList.length ? (
          <TransferList
            listId="list1"
            options={leftList as ListOption[]}
            onSelection={handleListSelectionLeft}
            enableSearch={enableSearch}
            virtualize={virtualize}
            focusable={focusable}
            size={size}
            RTL={RTL}
          />
        ) : (
          <div className={styles.empty_state} role="status">
            No items available
          </div>
        )}
      </section>
      <TransferControlColumn
        onTransfer={transfer}
        onTransferAll={showTransferAll ? transferAll : undefined}
        hideTransferAll={!showTransferAll}
        disableTransferLeft={!rightSelected.length}
        disableTransferRight={!leftSelected.length}
        size={size}
        sourceId={leftListId.current}
        targetId={rightListId.current}
      />
      <section
        aria-label={`Selected items (${rightList.length} items)`}
        id={rightListId.current}
      >
        <div className={styles.list_header}>
          <span className={styles.list_title}>Selected</span>
          <span className={styles.list_count}>{rightList.length}</span>
        </div>
        {rightList.length ? (
          <TransferList
            listId="list2"
            options={rightList as ListOption[]}
            onSelection={handleListSelectionRight}
            enableSearch={enableSearch}
            focusable={focusable}
            size={size}
            RTL={RTL}
          />
        ) : (
          <div className={styles.empty_state} role="status">
            No items selected
          </div>
        )}
      </section>
      {/* Live region for announcing transfers - only announces after transfer */}
      <div
        id={announcementId.current}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {lastTransferMessage}
      </div>
    </div>
  );
};

Transfer.displayName = 'Transfer';

export { Transfer };
