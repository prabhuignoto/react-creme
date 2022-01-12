import * as React from "react";

function SvgComponent() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10H3M21 6H3M21 14H3M21 18H3" />
    </svg>
  );
}

export default SvgComponent;
