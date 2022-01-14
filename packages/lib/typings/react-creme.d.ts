/// <reference types="react" />

import { AnchorHTMLAttributes, CSSProperties, default as React_2, FunctionComponent, ReactNode, RefObject } from 'react';

export declare const Accordion: React_2.FunctionComponent<AccordionModel>;

export declare interface AccordionCommon {
    alignIconRight?: boolean;
    disableCollapse?: boolean;
    customIcon?: ReactNode;
    disableIcon?: boolean;
    iconType?: "chevron" | "plus";
    focusable?: boolean;
    iconColor?: string;
    isTitleBold?: boolean;
    title?: string;
    titleColor?: string;
}

export declare const AccordionGroup: {
    ({ alignIconRight, autoClose, border, children, expanded, iconColor, iconType, titleColor, titles, isTitleBold, disableCollapse, focusable, }: AccordionGroupProps): JSX.Element;
    displayName: string;
};

export declare interface AccordionGroupProps extends AccordionCommon {
    children: ReactNode[];
    titles?: string[];
    autoClose?: boolean;
    expanded?: boolean;
    border?: boolean;
    iconType?: "chevron" | "plus";
}

export declare interface AccordionHeaderProps extends AccordionCommon {
    accordionBodyId?: string;
    accordionId?: string;
    onToggle?: () => void;
    open?: boolean | null;
}

export declare interface AccordionItemProps {
    id?: string;
    expanded?: boolean;
    focusable?: boolean;
}

export declare interface AccordionModel extends AccordionCommon {
    alignIconRight?: boolean;
    children?: ReactNode;
    expanded?: boolean | null;
    id?: string;
    border?: boolean;
    onCollapsed?: (id: string) => void;
    onExpanded?: (id: string) => void;
    transition?: string;
}

export declare const Alert: React_2.FunctionComponent<AlertProps>;

export declare interface AlertProps {
    message?: string;
    height?: number;
    state?: "success" | "error" | "warning" | "info";
    canDismiss?: boolean;
    onDismiss?: () => void;
    children?: ReactNode;
    RTL?: boolean;
}

export declare const AutoComplete: React_2.FunctionComponent<AutoCompleteProps>;

export declare interface AutoCompleteProps {
    onChange?: (value: string) => void;
    suggestions: string[];
    suggestionsWidth?: number;
    placeholder?: string;
    onKeyUp?: (ev: React_2.KeyboardEvent) => void;
    onSelection?: (value: string) => void;
    value?: string;
}

export declare const BlockQuote: React_2.FC<BlockQuoteProps>;

export declare interface BlockQuoteProps {
    children: React_2.ReactNode;
}

export declare const BreadCrumb: React_2.FunctionComponent<BreadCrumbModel>;

declare interface BreadCrumbCommonModel {
    icon?: "chevron" | "arrow" | "slash";
    size?: "sm" | "md" | "lg";
}

export declare interface BreadCrumbItemModel extends BreadCrumbCommonModel {
    id: string;
    onClick?: () => void;
    child: ReactNode;
    showChevron?: boolean;
}

export declare interface BreadCrumbModel extends BreadCrumbCommonModel {
    children: React_2.ReactNode;
    onClick?: () => void;
}

export declare const Button: React_2.FunctionComponent<ButtonModel>;

export declare interface ButtonModel {
    label?: string;
    onClick?: () => void;
    children?: React_2.ReactNode;
    disabled?: boolean;
    primary?: boolean;
    type?: "primary" | "default" | "danger" | "icon" | "progress";
    size?: "sm" | "md" | "lg";
    style?: CSSProperties;
    border?: boolean;
    focusable?: boolean;
}

export declare const Card: React_2.FunctionComponent<CardModel>;

export declare interface CardModel {
    header?: ReactNode;
    footer?: ReactNode;
    minHeight?: number;
    border?: boolean;
    alignHeader?: "left" | "center" | "right";
    alignFooter?: "left" | "center" | "right";
    children?: ReactNode | ReactNode[];
    shadow?: boolean;
}

export declare const Carousel: React_2.FunctionComponent<CarouselModel>;

export declare interface CarouselButtonModel {
    onClick: () => void;
    position: "left" | "right";
    direction: "horizontal" | "vertical";
    hide?: boolean;
    focusable?: boolean;
    label: string;
}

export declare interface CarouselItemModel {
    height: number;
    id: string;
    left?: string;
    top?: string;
    visible?: boolean;
    width: number;
}

export declare interface CarouselItemsModel {
    activePage: number;
    carouselItems: CarouselItemModel[];
    children: React_2.ReactNode[] | React_2.ReactNode;
    direction: "horizontal" | "vertical";
    height: number;
    totalItems: number;
    width: number;
}

export declare interface CarouselModel {
    children: React_2.ReactNode | React_2.ReactNode;
    direction?: "horizontal" | "vertical";
    height?: number;
    autoPlay?: number;
    transition?: string;
    enableSwipe?: boolean;
    focusable?: boolean;
}

export declare interface CarouselTrackModel {
    activeIndex: number;
    direction: "horizontal" | "vertical";
    handleSelection: (index: number) => void;
    length: number;
    onNext: () => void;
    onPrevious: () => void;
    hideNext?: boolean;
    focusable?: boolean;
    hidePrevious?: boolean;
}

export declare const CheckBox: React_2.FunctionComponent<CheckboxModel>;

export declare const CheckBoxGroup: React_2.FunctionComponent<CheckboxGroupProps>;

export declare interface CheckboxGroupProps {
    options: CheckboxModel[];
    border?: boolean;
    disabled?: boolean;
    layout?: "horizontal" | "vertical";
    checkboxStyle?: "square" | "round";
    onChange?: (selected: {
        id?: string;
        name?: string;
        isChecked: boolean;
    }[]) => void;
    noUniqueIds?: boolean;
    RTL?: boolean;
}

export declare interface CheckboxModel {
    autoHeight?: boolean;
    border?: boolean;
    checkBoxStyle?: "square" | "round";
    disabled?: boolean;
    focusIcon?: boolean;
    focusable?: boolean;
    height?: number;
    id?: string;
    isChecked?: boolean;
    label: string;
    noHoverStyle?: boolean;
    noUniqueId?: boolean;
    onChange?: (id: string, name: string, selected: boolean) => void;
    size?: "sm" | "md" | "lg";
    style?: CSSProperties;
    RTL?: boolean;
}

export declare const CircularProgress: React_2.FunctionComponent<CircularProgressProps>;

export declare interface CircularProgressProps {
    size?: "xs" | "sm" | "md" | "lg";
    style?: "double-ring" | "default";
    type?: "infinite" | "progressive";
}

declare interface CommonProps {
    focusable?: boolean;
    icon?: ReactNode;
    size?: "sm" | "md" | "lg";
}

export declare const DataGrid: React_2.FunctionComponent<DataGridProps>;

export declare interface DataGridCell {
    name: string;
    value: string;
    border?: boolean;
    fixedHeight?: boolean;
    formatter?: (value: any) => any;
}

export declare interface DataGridColumn {
    align?: string;
    format?: string;
    id?: string;
    name: string;
    sortOrder?: string;
    sortable?: boolean;
    type?: "string" | "number";
    width?: number;
    formatter?: (value: any) => any;
}

export declare interface DataGridCommon {
    layoutStyle?: "compact" | "comfortable";
    border?: boolean;
    fixedHeight?: boolean;
    zebra?: boolean;
    rowHeight?: number;
}

export declare interface DataGridHeaderProps extends DataGridCommon {
    columnWidth?: number;
    columns: DataGridColumn[];
    onSort?: (column: string, dir: SortDirection) => void;
    style?: CSSProperties;
    border?: boolean;
}

export declare interface DataGridModel {
    rows: DataRow[];
}

export declare interface DataGridProps extends DataGridCommon {
    columns?: DataGridColumn[];
    data: {
        [key: string]: string | number;
    }[];
    gridWidth?: number;
}

export declare interface DataRow extends DataGridCommon {
    columnConfigs?: DataGridColumn[];
    columnWidth?: number;
    data: any;
    id?: string;
    style?: CSSProperties;
}

export declare const Dialog: React_2.FunctionComponent<DialogModel>;

export declare interface DialogModel extends OverlayModel {
    children?: React_2.ReactNode;
    height?: number;
    onClose?: () => void;
    onSuccess?: () => void;
    title?: string;
    width?: number;
}

export declare const Drawer: React_2.FunctionComponent<DrawerModel>;

export declare interface DrawerModel extends OverlayModel {
    children?: React_2.ReactNode | React_2.ReactNode[];
    height?: number | string;
    position?: "left" | "right" | "top" | "bottom";
    width?: number | string;
    transition?: string;
}

export declare const Dropdown: React_2.FunctionComponent<DropdownProps>;

export declare interface DropdownMenuModel extends OverlayModel {
    allowMultiSelection?: boolean;
    enableSearch?: boolean;
    handleSelection: (selected: Option_2[]) => void;
    open: boolean;
    options: MenuOption[];
    style: DropdownMenuStyleModel;
    virtualize?: boolean;
    RTL?: boolean;
}

declare interface DropdownMenuStyleModel {
    maxMenuHeight?: number;
    top?: number;
    width?: number;
}

export declare interface DropdownProps {
    allowMultiSelection?: boolean;
    disabled?: boolean;
    enableSearch?: boolean;
    maxMenuHeight?: number;
    onSelected?: (value: string | string[]) => void;
    options: Option_2[];
    placeholder?: string;
    virtualize?: boolean;
    focusable?: boolean;
    RTL?: boolean;
    chevronIconColor?: string;
}

export declare const GlobalNotification: React_2.FunctionComponent<GlobalNotificationProps>;

export declare interface GlobalNotificationProps {
    closeAfter?: number;
    delay?: number;
    height?: number;
    message: string;
    onClose?: () => void;
    state?: GlobalNotificationState;
    hideAnimationStyle?: "hide" | "shrink";
}

declare type GlobalNotificationState = "success" | "error" | "warning" | "info";

declare const Image_2: React_2.FunctionComponent<ImageProps>;
export { Image_2 as Image };
export { Notification_2 as Notification };
export { Option_2 as Option };
export { };

export declare const ImageComparer: React_2.FunctionComponent<ImageComparerModel>;

export declare interface ImageComparerModel {
    sourceOne?: string;
    sourceTwo: string;
    direction?: "horizontal" | "vertical";
}

export declare interface ImageProps extends React_2.ImgHTMLAttributes<HTMLImageElement> {
    expandImageOnClick?: boolean;
    isOverlay?: boolean;
    fitImage?: boolean;
    showLoader?: boolean;
    loaderSize?: "xs" | "sm" | "md" | "lg";
    onLoad?: (evt: React_2.SyntheticEvent) => void;
    alt?: string;
}

export declare const Input: React_2.FunctionComponent<InputModel>;

export declare interface InputModel {
    border?: boolean;
    children?: React_2.ReactNode;
    controlled?: boolean;
    disabled?: boolean;
    enableClear?: boolean;
    focusable?: boolean;
    id?: string;
    isAutoComplete?: boolean;
    noUniqueId?: boolean;
    onChange?: (val: string) => void;
    onKeyUp?: (ev: React_2.KeyboardEvent) => void;
    placeholder?: string;
    state?: "default" | "error" | "success";
    style?: CSSProperties;
    type?: "text" | "password";
    value?: string;
    RTL?: boolean;
}

export declare const Link: React_2.FunctionComponent<AnchorHTMLAttributes<LinkModel>>;

export declare interface LinkModel {
    children: React_2.ReactNode;
}

export declare const List: React_2.FunctionComponent<ListModel>;

declare interface ListCommonProps {
    allowMultiSelection?: boolean;
    focusable?: boolean;
    highlightSelection?: boolean;
    showCheckIcon?: boolean;
    textColor?: string;
    textColorSelected?: string;
    RTL?: boolean;
}

export declare interface ListItemModel extends ListCommonProps {
    disabled?: boolean;
    id?: string;
    name: string;
    onSelection?: (opt: ListOption) => void;
    selected?: boolean;
    style?: CSSProperties;
    value: string;
}

export declare interface ListItemOptionProps extends ListCommonProps {
    name: string;
    selected?: boolean;
    tabIndex: number;
    showCheck?: boolean;
    focusable?: boolean;
}

export declare interface ListModel extends ListCommonProps {
    border?: boolean;
    enableSearch?: boolean;
    group?: boolean;
    itemHeight?: number;
    maxHeight?: number;
    minHeight?: number;
    noUniqueIds?: boolean;
    onSelection?: (selected: ListOption[]) => void;
    options: ListOption[];
    rowGap?: number;
    virtualized?: boolean;
    backGroundColor?: string;
    id?: string;
    label?: string;
}

export declare interface ListOption extends Option_2 {
    group?: string;
    top?: number;
    visible?: boolean;
}

export declare const Menu: React_2.FunctionComponent<MenuModel>;

export declare interface MenuItemModel {
    disabled?: boolean;
    id?: string;
    isDivider?: boolean;
    name?: string;
}

export declare interface MenuModel {
    children: React_2.ReactNode;
    focusable?: boolean;
    id?: string;
    items: MenuItemModel[];
    onClose?: (id?: string) => void;
    onOpen?: (id?: string) => void;
    onSelected?: (val: string) => void;
    position?: "left" | "right";
    style?: CSSProperties;
    isClosing?: boolean;
}

export declare type MenuOption = Option_2 & {
    visible: boolean;
};

declare const Notification_2: React_2.FunctionComponent<NotificationModel>;

export declare interface NotificationModel extends OverlayModel {
    title?: string;
    position?: NotificationPosition;
    children: React_2.ReactNode[] | React_2.ReactNode;
    width?: number | string;
    height?: number | string;
    autoClose?: number;
    swipeToClose?: boolean;
    disableHeader?: boolean;
}

declare type NotificationPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "bottom-center" | "top-center";

declare interface Option_2 {
    disabled?: boolean;
    id?: string;
    name: string;
    selected?: boolean;
    value?: string;
}

declare interface OverlayCommon {
    onClose?: () => void;
    onClosing?: () => void;
    placement?: "top" | "bottom";
    align?: "left" | "right";
    placementReference?: RefObject<HTMLElement>;
}

export declare interface OverlayModel extends OverlayCommon {
    isClosing?: boolean;
    showClose?: boolean;
    placement?: "top" | "bottom";
    align?: "left" | "right";
    containedToParent?: RefObject<HTMLElement>;
    overlayAnimation?: boolean;
}

export declare const PageHeader: React_2.FunctionComponent<PageHeaderProps>;

export declare interface PageHeaderProps {
    title: string;
    children?: React_2.ReactNode;
    RTL?: boolean;
    size?: "sm" | "md" | "lg";
}

export declare const Progress: React_2.FunctionComponent<ProgressModel>;

export declare interface ProgressModel {
    currentValue?: number;
    infiniteStyle?: "disappear" | "bob";
    maxValue?: number;
    showProgressValue?: boolean;
    size?: "lg" | "md" | "sm";
    type: "infinite" | "progressive";
    width?: number;
    status?: "success" | "error" | "default";
    RTL?: boolean;
}

export declare const Radio: React_2.FunctionComponent<RadioModel>;

export declare const RadioGroup: React_2.FunctionComponent<RadioGroupModel>;

export declare interface RadioGroupItemModel {
    disabled?: boolean;
    id?: string;
    label: string;
    checked?: boolean | null;
    value?: string;
}

export declare interface RadioGroupModel {
    items: RadioGroupItemModel[];
    onSelected?: (selected: string) => void;
    disabled?: boolean;
    style?: CSSProperties;
    layout?: "row" | "column";
    RTL?: boolean;
    focusable?: boolean;
}

export declare interface RadioModel {
    disabled?: boolean;
    id?: string;
    isChecked?: boolean | null;
    isControlled?: boolean;
    label?: string;
    onChange?: (state: {
        id?: string;
        selected?: boolean;
        value?: string;
    }) => void;
    size?: "sm" | "md" | "lg";
    style?: CSSProperties;
    value?: string;
    focusable?: boolean;
    withGroup?: boolean;
    fullWidth?: boolean;
    RTL?: boolean;
}

export declare const Rate: React_2.FunctionComponent<RateProps>;

export declare interface RateItemModel {
    active: boolean;
    hovered: boolean;
    id: string;
}

export declare interface RateItemViewModel extends CommonProps, RateItemModel {
    index: number;
    onMouseOver: (idx: number) => void;
    onSelect: (idx: number) => void;
    disabled?: boolean;
}

export declare interface RateProps extends CommonProps {
    iconCount?: number;
    onChange?: (value: number | string) => void;
    ratingValues?: string[];
    value?: 1 | 2 | 3 | 4 | 5;
    disabled?: boolean;
}

export declare const Reveal: React_2.FunctionComponent<RevealProps>;

export declare interface RevealProps {
    children: React_2.ReactNode | React_2.ReactNode[];
    parent: React_2.RefObject<HTMLElement>;
}

export declare const ScrollSpy: React_2.FC<ScrollSpyProps>;

export declare interface ScrollSpyProps {
    links: string[];
    children: React_2.ReactNode[] | React_2.ReactNode;
    linksPosition?: "left" | "right";
    showSectionTitle?: boolean;
}

export declare const Section: React_2.FC<SectionModel>;

export declare interface SectionModel {
    children: React_2.ReactNode | React_2.ReactNode[];
    title?: string;
    height?: number;
    layout?: "row" | "column";
    RTL?: boolean;
    size?: "sm" | "md" | "lg";
}

export declare const Sidebar: React_2.FunctionComponent<SidebarModel>;

export declare interface SidebarCommonProps {
    groupIconColor?: string;
    focusable?: boolean;
    groupTitleColor?: string;
    listMaxHeight?: number;
    sectionsCollapsible?: boolean;
    iconsColor?: string;
}

export declare interface SidebarGroupModel {
    id?: string;
    items: ListOption[];
    title: string;
    visible?: boolean;
}

export declare interface SidebarGroupsModel extends SidebarCommonProps {
    groups: SidebarGroupModel[];
    onSelection: (option: ListOption[], id?: string) => void;
    sideBarHeight?: number;
}

export declare interface SidebarItemModel {
    id?: string;
    name: string;
    selected?: boolean;
    visible?: boolean;
}

export declare interface SidebarModel extends SidebarCommonProps {
    backGroundColor?: string;
    border?: boolean;
    enableSearch?: boolean;
    groups: SidebarGroupModel[];
    height?: number;
    onSelect?: (group: SidebarGroupModel, item: SidebarItemModel) => void;
    searchPlaceholder?: string;
}

export declare const Skeleton: FunctionComponent<SkeletonModel>;

export declare interface SkeletonBlockModel {
    id: string;
    rows: SkeletonRowModel[];
}

export declare interface SkeletonModel {
    rows?: number;
    width?: number;
    rowHeight?: number;
    blocks?: number;
    showCircle?: boolean;
    animate?: boolean;
    style?: CSSProperties;
    RTL?: boolean;
}

export declare interface SkeletonRowModel {
    id: string;
    visible?: boolean;
    width?: number;
    disableAnimation?: boolean;
}

export declare const Slider: React_2.FunctionComponent<SliderModel>;

export declare interface SliderModel {
    start?: number;
    end?: number;
    onChange?: (value: number) => void;
    disabled?: boolean;
    disableTooltip?: boolean;
    position?: "top" | "bottom";
    sliderValue?: number;
    knobShape?: "circle" | "square";
    showTooltipOnHover?: boolean;
    knobSize?: number;
    tooltipWidth?: number;
    focusable?: boolean;
    formatter?: (value: number) => string;
}

export declare type SortDirection = "asc" | "desc" | "none";

export declare const Splitter: React_2.FunctionComponent<SplitterModel>;

export declare interface SplitterModel {
    dir: "horizontal" | "vertical";
    children: React_2.ReactNode[];
    minSplitWidth?: number;
    maxSplitWidth?: number;
    minSplitHeight?: number;
    maxSplitHeight?: number;
    border?: boolean;
    handleBarWidth?: number;
}

export declare const Switch: React_2.FunctionComponent<SwitchModel>;

export declare interface SwitchModel {
    checked?: boolean;
    disabled?: boolean;
    focusable?: boolean;
    label?: string;
    labelOutside?: boolean;
    onChange?: (val: boolean) => void;
    size?: "sm" | "md" | "lg";
    style?: CSSProperties;
    width?: number;
    showCheckIcon?: boolean;
}

export declare interface TabHeadersModel extends TabsCommonModel {
    items: TabItemModel[];
    handleTabSelection: (id: string) => void;
}

export declare interface TabHeadProps extends TabsCommonModel {
    id: string;
    name?: string;
    selected?: boolean;
    disabled?: boolean;
    handleTabSelection: (id: string) => void;
}

export declare interface TabItemModel {
    name: string;
    id: string;
    selected?: boolean;
    disabled?: boolean;
    content?: ReactNode;
}

export declare const Tabs: React_2.FunctionComponent<TabsModel>;

declare interface TabsCommonModel {
    tabStyle?: "flat" | "rounded";
    border?: boolean;
    focusable?: boolean;
}

export declare interface TabsModel extends TabsCommonModel {
    children: ReactNode[];
    labels: string[];
    width?: number | string;
    style?: CSSProperties;
    disabledTabs?: string[];
    iconsColor?: string;
}

export declare interface TagItemModel {
    name: string;
    disabled?: boolean;
    readonly?: boolean;
}

export declare const Tags: React_2.FunctionComponent<TagsModel>;

export declare interface TagsModel {
    items: TagItemModel[];
    onChange?: (selected: string[]) => void;
    maxTags?: number;
    readonly?: boolean;
    tagWidth?: number;
    tagStyle?: "default" | "fill";
    tagSize?: "small" | "large";
    disabled?: boolean;
    style?: CSSProperties;
    autoComplete?: boolean;
    suggestions?: string[];
    RTL?: boolean;
    placeholder?: string;
}

export declare const Tooltip: React_2.FunctionComponent<TooltipModel>;

export declare interface TooltipModel {
    children: React_2.ReactNode[] | React_2.ReactNode;
    isStatic?: boolean;
    message: string;
    onTooltipRendered?: () => void;
    position?: ToolTipPosition;
    ref?: RefObject<HTMLElement>;
    show?: boolean;
    minWidth?: number;
    maxWidth?: number;
    fixedAtCenter?: boolean;
    bgColor?: string;
    foreColor?: string;
}

export declare type ToolTipPosition = "top left" | "top right" | "top center" | "bottom center" | "bottom left" | "bottom right" | "left center" | "left top" | "left bottom" | "right center";

export declare const Transfer: React_2.FunctionComponent<TransferModel>;

export declare interface TransferCommonModel {
    virtualize?: boolean;
}

export declare type TransferList = "list1" | "list2";

export declare interface TransferListItemModel extends TransferCommonModel {
    selected?: boolean;
    id: string;
    name: string;
    handleSelection: (l: TransferList, id: string) => void;
    list: TransferList;
}

export declare interface TransferListProps extends TransferCommonModel {
    listId: TransferList;
    options: ListOption[];
    onSelection: (selected: ListOption[]) => void;
    enableSearch?: boolean;
}

export declare interface TransferModel extends TransferCommonModel {
    list1: string[];
    list2: string[];
    onChange?: (list1: string[], list2: string[]) => void;
    enableSearch?: boolean;
}

export declare const Tree: React_2.FunctionComponent<TreeModel>;

declare interface TreeCommonModel {
    onChange?: (name?: string) => void;
    allowSelection?: boolean;
    onChildToggle?: (expanded: boolean, childrenCount: number) => void;
    width?: number;
    iconType?: "plus" | "chevron";
}

export declare interface TreeItemModel extends TreeCommonModel {
    child?: TreeItemModel[];
    disabled?: boolean;
    expanded?: boolean;
    id?: string;
    name?: string;
    onToggle?: (id?: string) => void;
    selected?: boolean;
}

export declare interface TreeModel extends TreeCommonModel {
    childrenSelected?: boolean;
    height?: number;
    isChildTree?: boolean;
    items: TreeItemModel[];
}


