import React, { ReactElement, ReactNode, isValidElement, cloneElement } from 'react';

/**
 * List of component names that support RTL prop
 * This is based on the components found in the codebase that have RTL?: boolean in their props
 */
const RTL_SUPPORTED_COMPONENTS = new Set([
  'Switch',
  'Input',
  'Password',
  'InputNumber',
  'FormField',
  'FormGroup',
  'Checkbox',
  'CheckboxGroup',
  'Radio',
  'RadioGroup',
  'Dropdown',
  'Menu',
  'MenuButton',
  'MenuBar',
  'BreadCrumb',
  'Section',
  'PageHeader',
  'Text',
  'Alert',
  'Skeleton',
  'Rate',
  'Progress',
  'Transfer',
  'FileUpload',
  'Pin',
  'ReadMore',
  'List',
  'Tags',
  'Slider',
  'AutoSuggest',
  'LoadingIndicator',
  'Accordion',
  'AccordionGroup',
]);

/**
 * Gets the component name from a React element type
 */
function getComponentName(componentType: any): string | null {
  if (!componentType) {
    return null;
  }

  // Direct function component
  if (typeof componentType === 'function') {
    return componentType.displayName || componentType.name || null;
  }

  // For forwardRef and memo components, check the inner component
  if (typeof componentType === 'object') {
    // React.memo
    if (componentType.type) {
      const innerName = getComponentName(componentType.type);
      if (innerName) return innerName;
    }
    // React.forwardRef
    if (componentType.render) {
      const innerName = getComponentName(componentType.render);
      if (innerName) return innerName;
    }
    // Check displayName directly on the object
    if (componentType.displayName) {
      return componentType.displayName;
    }
  }

  return null;
}

/**
 * Checks if a component supports RTL by checking its displayName or type name
 */
function componentSupportsRTL(element: ReactElement): boolean {
  if (!isValidElement(element)) {
    return false;
  }

  const componentType = element.type;
  
  // Check if it's a string component (e.g., 'div', 'span') - these don't support RTL
  if (typeof componentType === 'string') {
    return false;
  }

  // Get component name
  const componentName = getComponentName(componentType);
  
  if (componentName && RTL_SUPPORTED_COMPONENTS.has(componentName)) {
    return true;
  }

  return false;
}

/**
 * Recursively adds RTL prop to all React elements that support it
 * 
 * @param node - React node to process
 * @returns React node with RTL prop added where applicable
 */
export function addRTLToElement(node: ReactNode): ReactNode {
  // Handle null, undefined, or non-elements
  if (!node || !isValidElement(node)) {
    return node;
  }

  const element = node as ReactElement;

  // Check if this element supports RTL and doesn't already have RTL set
  const supportsRTL = componentSupportsRTL(element);
  const hasRTL = element.props && 'RTL' in element.props;
  const rtlValue = element.props?.RTL;

  // Process children first (before cloning)
  let processedChildren = element.props?.children;
  if (processedChildren) {
    // Handle array of children
    if (Array.isArray(processedChildren)) {
      processedChildren = processedChildren.map(child => addRTLToElement(child));
    } 
    // Handle single child
    else if (processedChildren !== null && processedChildren !== undefined) {
      processedChildren = addRTLToElement(processedChildren);
    }
  }

  // Clone element with RTL prop if it supports it and doesn't have it (or has it as false)
  let clonedElement = element;
  if (supportsRTL) {
    if (!hasRTL || rtlValue === false) {
      // Clone with RTL=true, preserving all other props and processed children
      clonedElement = cloneElement(
        element,
        {
          ...element.props,
          RTL: true,
          children: processedChildren,
        } as any
      );
    } else if (processedChildren !== element.props?.children) {
      // Children were processed, need to update them even if RTL is already true
      clonedElement = cloneElement(
        element,
        {
          ...element.props,
          children: processedChildren,
        } as any
      );
    }
  } else if (processedChildren !== element.props?.children) {
    // Component doesn't support RTL but children were processed
    clonedElement = cloneElement(
      element,
      {
        ...element.props,
        children: processedChildren,
      } as any
    );
  }

  return clonedElement;
}

/**
 * Wrapper component that adds RTL to all children
 */
export const RTLWrapper: React.FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return <>{addRTLToElement(children)}</>;
};
