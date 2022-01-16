import React, { CSSProperties, RefObject, useEffect, useState } from "react";

type Position =
  | "top left"
  | "top right"
  | "top center"
  | "bottom center"
  | "bottom left"
  | "bottom right"
  | "left center"
  | "left top"
  | "left bottom"
  | "right top"
  | "right bottom"
  | "right center";

interface Settings {
  alignToEdge?: boolean;
  spacing: number;
}

type FunctionType = (
  ele: RefObject<HTMLDivElement>,
  toolTip: RefObject<HTMLElement>,
  pos: Position,
  settings?: Settings
) => CSSProperties | undefined;

const usePosition: FunctionType = function (
  element,
  tooltip,
  position,
  settings = { spacing: 15 }
) {
  const [_position, setPosition] = useState<React.CSSProperties>();
  const { spacing, alignToEdge } = settings;

  useEffect(() => {
    if (!element.current && !tooltip.current) {
      return;
    }

    const positionX = position.split(" ")[0];
    const positionY = position.split(" ")[1];

    const isPositionX = (match: string) => positionX === match;

    const isPositionY = (match: string) => positionY === match;

    const eleHeight = element.current?.clientHeight || 0;
    const eleWidth = element.current?.clientWidth || 0;

    const tooltipWidth = tooltip.current?.clientWidth || 0;
    const tooltipHalfWidth = Math.round(tooltipWidth / 2);

    const horizontalCenter: React.CSSProperties = {
      left: "50%",
      transform: "translateX(-50%)",
    };
    const verticalCenter: React.CSSProperties = {
      top: "50%",
      transform: "translateY(-50%)",
    };
    const heightWithSpace = eleHeight + spacing;
    let cssPosition: React.CSSProperties = {};

    switch (position) {
      case "top center":
      case "bottom center": {
        const prop = isPositionX("top") ? "bottom" : "top";
        cssPosition = {
          ...horizontalCenter,
          [prop]: `${heightWithSpace}px`,
        };
        break;
      }
      case "top left":
      case "top right": {
        const prop = alignToEdge
          ? positionY
          : isPositionY("left")
          ? "right"
          : "left";
        const value = alignToEdge ? 0 : `${eleWidth - tooltipHalfWidth}px`;
        cssPosition = {
          bottom: `${heightWithSpace}px`,
          [prop]: value,
        };
        break;
      }
      case "bottom left":
      case "bottom right": {
        const prop = alignToEdge
          ? positionY
          : isPositionY("left")
          ? "right"
          : "left";
        const value = alignToEdge ? 0 : `${eleWidth - tooltipHalfWidth}px`;
        cssPosition = {
          [prop]: value,
          top: `${heightWithSpace}px`,
        };
        break;
      }
      case "left center":
      case "right center": {
        const prop = isPositionX("left") ? "right" : "left";
        cssPosition = {
          ...verticalCenter,
          [prop]: eleWidth + spacing,
        };
        break;
      }
      case "left top":
      case "right top": {
        const prop = isPositionX("left") ? "right" : "left";
        cssPosition = {
          [prop]: eleWidth + spacing,
          top: 0,
        };
        break;
      }
      case "right bottom":
      case "left bottom": {
        const prop = isPositionX("left") ? "right" : "left";
        cssPosition = {
          bottom: 0,
          [prop]: eleWidth + spacing,
        };
        break;
      }
      default:
        break;
    }

    setPosition(cssPosition);
  }, [element, tooltip, position]);

  return _position;
};

export { usePosition };
