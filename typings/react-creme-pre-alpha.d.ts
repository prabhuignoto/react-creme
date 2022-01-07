/// <reference types="react" />

import { AnchorHTMLAttributes } from 'react';
import { CSSProperties } from 'react';
import { FunctionComponent } from 'react';
import { default as React_2 } from 'react';
import { ReactNode } from 'react';
import { RefObject } from 'react';

export declare const Accordion: React_2.FunctionComponent<AccordionModel>;

declare interface AccordionCommon {
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

declare interface AccordionGroupProps extends AccordionCommon {
    children: ReactNode[];
    titles?: string[];
    autoClose?: boolean;
    expanded?: boolean;
    border?: boolean;
    iconType?: "chevron" | "plus";
}

declare interface AccordionModel extends AccordionCommon {
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

declare interface AlertProps {
    message?: string;
    height?: number;
    state?: "success" | "error" | "warning" | "info";
    canDismiss?: boolean;
    onDismiss?: () => void;
    children?: ReactNode;
}

export declare const AutoComplete: React_2.FunctionComponent<AutoCompleteProps>;

declare interface AutoCompleteProps {
    onChange?: (value: string) => void;
    suggestions: string[];
    suggestionsWidth?: number;
    placeholder?: string;
    onKeyUp?: (ev: React_2.KeyboardEvent) => void;
    onSelection?: (value: string) => void;
    value?: string;
}

export declare const BlockQuote: React_2.FC<BlockQuoteProps>;

declare interface BlockQuoteProps {
    children: React_2.ReactNode;
}

export declare const BreadCrumb: React_2.FunctionComponent<BreadCrumbModel>;

declare interface BreadCrumbCommonModel {
    icon?: "chevron" | "arrow" | "slash";
    size?: "sm" | "md" | "lg";
}

declare interface BreadCrumbModel extends BreadCrumbCommonModel {
    children: React_2.ReactNode;
    onClick?: () => void;
}

export declare const Button: React_2.FunctionComponent<ButtonModel>;

declare interface ButtonModel {
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

declare interface CardModel {
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

declare interface CarouselModel {
    children: React_2.ReactNode | React_2.ReactNode;
    direction?: "horizontal" | "vertical";
    height?: number;
    autoPlay?: number;
    transition?: string;
    enableSwipe?: boolean;
    focusable?: boolean;
}

export declare const CheckBox: React_2.FunctionComponent<CheckboxModel>;

export declare const CheckBoxGroup: React_2.FunctionComponent<CheckboxGroupProps>;

declare interface CheckboxGroupProps {
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
}

declare interface CheckboxModel {
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
}

export declare const CircularProgress: React_2.FunctionComponent<CircularProgressProps>;

declare interface CircularProgressProps {
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

declare interface DataGridColumn {
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

declare interface DataGridCommon {
    layoutStyle?: "compact" | "comfortable";
    border?: boolean;
    fixedHeight?: boolean;
    zebra?: boolean;
    rowHeight?: number;
}

declare interface DataGridProps extends DataGridCommon {
    columns?: DataGridColumn[];
    data: {
        [key: string]: string | number;
    }[];
    gridWidth?: number;
}

export declare const Dialog: React_2.FunctionComponent<DialogModel>;

declare interface DialogModel extends OverlayModel {
    children?: React_2.ReactNode;
    height?: number;
    onClose?: () => void;
    onSuccess?: () => void;
    title?: string;
    width?: number;
}

export declare const Drawer: React_2.FunctionComponent<DrawerModel>;

declare interface DrawerModel extends OverlayModel {
    children?: React_2.ReactNode | React_2.ReactNode[];
    height?: number | string;
    position?: "left" | "right" | "top" | "bottom";
    width?: number | string;
    transition?: string;
}

export declare const Dropdown: React_2.FunctionComponent<DropdownModel>;

declare interface DropdownModel {
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

declare interface GlobalNotificationProps {
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
export { Image_2 as Image }

export declare const ImageComparer: React_2.FunctionComponent<ImageComparerModel>;

declare interface ImageComparerModel {
    sourceOne?: string;
    sourceTwo: string;
    direction?: "horizontal" | "vertical";
}

declare interface ImageProps extends React_2.ImgHTMLAttributes<HTMLImageElement> {
    expandImageOnClick?: boolean;
    isOverlay?: boolean;
    fitImage?: boolean;
    showLoader?: boolean;
    loaderSize?: "xs" | "sm" | "md" | "lg";
    onLoad?: (evt: React_2.SyntheticEvent) => void;
    alt?: string;
}

export declare const Input: React_2.FunctionComponent<InputModel>;

declare interface InputModel {
    children?: React_2.ReactNode;
    enableClear?: boolean;
    onChange?: (val: string) => void;
    onKeyUp?: (ev: React_2.KeyboardEvent) => void;
    placeholder?: string;
    state?: "default" | "error" | "success";
    type?: "text" | "password";
    value?: string;
    style?: CSSProperties;
    disabled?: boolean;
    controlled?: boolean;
    noUniqueId?: boolean;
    id?: string;
    isAutoComplete?: boolean;
    border?: boolean;
    focus?: boolean;
}

export declare const Link: React_2.FunctionComponent<AnchorHTMLAttributes<LinkModel>>;

declare interface LinkModel {
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

declare interface ListModel extends ListCommonProps {
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

declare interface ListOption extends Option_2 {
    group?: string;
    top?: number;
    visible?: boolean;
}

export declare const Menu: React_2.FunctionComponent<MenuModel>;

declare interface MenuItemModel {
    disabled?: boolean;
    id?: string;
    isDivider?: boolean;
    name?: string;
}

declare interface MenuModel {
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

declare const Notification_2: React_2.FunctionComponent<NotificationModel>;
export { Notification_2 as Notification }

declare interface NotificationModel extends OverlayModel {
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

declare interface OverlayModel extends OverlayCommon {
    isClosing?: boolean;
    showClose?: boolean;
    placement?: "top" | "bottom";
    align?: "left" | "right";
    containedToParent?: RefObject<HTMLElement>;
    overlayAnimation?: boolean;
}

export declare const PageHeader: React_2.FunctionComponent<PageHeaderProps>;

declare interface PageHeaderProps {
    title: string;
    children?: React_2.ReactNode;
    RTL?: boolean;
    size?: "sm" | "md" | "lg";
}

export declare const Progress: React_2.FunctionComponent<ProgressModel>;

declare interface ProgressModel {
    currentValue?: number;
    infiniteStyle?: "disappear" | "bob";
    maxValue?: number;
    showProgressValue?: boolean;
    size?: "lg" | "md" | "sm";
    type: "infinite" | "progressive";
    width?: number;
    status?: "success" | "error" | "default";
}

export declare const Radio: React_2.FunctionComponent<RadioModel>;

export declare const RadioGroup: React_2.FunctionComponent<RadioGroupModel>;

declare interface RadioGroupItemModel {
    disabled?: boolean;
    id?: string;
    label: string;
    checked?: boolean | null;
    value?: string;
}

declare interface RadioGroupModel {
    items: RadioGroupItemModel[];
    onSelected?: (selected: string) => void;
    disabled?: boolean;
    style?: CSSProperties;
    layout?: "row" | "column";
}

declare interface RadioModel {
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
}

export declare const Rate: React_2.FunctionComponent<RateProps>;

declare interface RateProps extends CommonProps {
    iconCount?: number;
    onChange?: (value: number | string) => void;
    ratingValues?: string[];
    value?: 1 | 2 | 3 | 4 | 5;
    disabled?: boolean;
}

export declare const Reveal: React_2.FunctionComponent<RevealProps>;

declare interface RevealProps {
    children: React_2.ReactNode | React_2.ReactNode[];
    parent: React_2.RefObject<HTMLElement>;
}

export declare const ScrollSpy: React_2.FC<ScrollSpyProps>;

declare interface ScrollSpyProps {
    links: string[];
    children: React_2.ReactNode[] | React_2.ReactNode;
    linksPosition?: "left" | "right";
    showSectionTitle?: boolean;
}

export declare const Section: React_2.FC<SectionModel>;

declare interface SectionModel {
    children: React_2.ReactNode | React_2.ReactNode[];
    title?: string;
    height?: number;
    layout?: "row" | "column";
    RTL?: boolean;
    size?: "sm" | "md" | "lg";
}

export declare const Sidebar: React_2.FunctionComponent<SidebarModel>;

declare interface SidebarCommonProps {
    groupIconColor?: string;
    focusable?: boolean;
    groupTitleColor?: string;
    listMaxHeight?: number;
    sectionsCollapsible?: boolean;
    iconsColor?: string;
}

declare interface SidebarGroupModel {
    id?: string;
    items: ListOption[];
    title: string;
    visible?: boolean;
}

declare interface SidebarItemModel {
    id?: string;
    name: string;
    selected?: boolean;
    visible?: boolean;
}

declare interface SidebarModel extends SidebarCommonProps {
    backGroundColor?: string;
    border?: boolean;
    enableSearch?: boolean;
    groups: SidebarGroupModel[];
    height?: number;
    onSelect?: (group: SidebarGroupModel, item: SidebarItemModel) => void;
    searchPlaceholder?: string;
}

export declare const Skeleton: FunctionComponent<SkeletonModel>;

declare interface SkeletonModel {
    rows?: number;
    width?: number;
    rowHeight?: number;
    blocks?: number;
    showCircle?: boolean;
    animate?: boolean;
    style?: CSSProperties;
}

export declare const Slider: React_2.FunctionComponent<SliderModel>;

declare interface SliderModel {
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

export declare const Splitter: React_2.FunctionComponent<SplitterModel>;

declare interface SplitterModel {
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

declare interface SwitchModel {
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

export declare const Tabs: React_2.FunctionComponent<TabsModel>;

declare interface TabsCommonModel {
    tabStyle?: "flat" | "rounded";
    border?: boolean;
    focusable?: boolean;
}

declare interface TabsModel extends TabsCommonModel {
    children: ReactNode[];
    labels: string[];
    width?: number | string;
    style?: CSSProperties;
    disabledTabs?: string[];
    iconsColor?: string;
}

declare interface TagItemModel {
    name: string;
    disabled?: boolean;
    readonly?: boolean;
}

export declare const Tags: React_2.FunctionComponent<TagsModel>;

declare interface TagsModel {
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

declare interface TooltipModel {
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

declare type ToolTipPosition = "top left" | "top right" | "top center" | "bottom center" | "bottom left" | "bottom right" | "left center" | "left top" | "left bottom" | "right center";

export declare const Transfer: React_2.FunctionComponent<TransferModel>;

declare interface TransferCommonModel {
    virtualize?: boolean;
}

declare interface TransferModel extends TransferCommonModel {
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

declare interface TreeItemModel extends TreeCommonModel {
    child?: TreeItemModel[];
    disabled?: boolean;
    expanded?: boolean;
    id?: string;
    name?: string;
    onToggle?: (id?: string) => void;
    selected?: boolean;
}

declare interface TreeModel extends TreeCommonModel {
    childrenSelected?: boolean;
    height?: number;
    isChildTree?: boolean;
    items: TreeItemModel[];
}

export { }
