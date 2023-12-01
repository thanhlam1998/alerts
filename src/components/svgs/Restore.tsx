import * as React from "react";

function RestoreIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M10.333 8c0-.733-.6-1.333-1.333-1.333S7.667 7.267 7.667 8 8.267 9.333 9 9.333s1.333-.6 1.333-1.333zM9 2a6 6 0 00-6 6H1l2.667 2.667L6.333 8h-2A4.663 4.663 0 019 3.333 4.663 4.663 0 0113.667 8a4.663 4.663 0 01-7.374 3.8l-.946.96A6 6 0 109 2z"
        fill="currentColor"
      />
    </svg>
  );
}

const Restore = React.memo(RestoreIcon);
export default Restore;
