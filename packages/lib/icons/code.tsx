interface CodeIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const SvgComponent = ({ width = 24, height = 24, className }: CodeIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
  </svg>
);

export default SvgComponent;
