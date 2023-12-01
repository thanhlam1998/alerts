import * as React from "react";

function ChevronDownIC(props: React.SVGProps<SVGSVGElement>) {
  const color = props?.color ?? "currentColor";
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.529 5.529c.26-.26.682-.26.943 0L8 9.057 11.53 5.53a.667.667 0 11.943.942l-4 4a.667.667 0 01-.943 0l-4-4a.667.667 0 010-.942z"
        fill={color}
      />
    </svg>
  );
}

const ChevronDown = React.memo(ChevronDownIC);
export default ChevronDown;
