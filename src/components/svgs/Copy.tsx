import * as React from "react";

function CopyIC(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 5a.5.5 0 00-.5.5V10a.5.5 0 00.5.5H10a.5.5 0 00.5-.5V5.5A.5.5 0 0010 5H5.5zM4 5.5A1.5 1.5 0 015.5 4H10a1.5 1.5 0 011.5 1.5V10a1.5 1.5 0 01-1.5 1.5H5.5A1.5 1.5 0 014 10V5.5z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 1.5a.5.5 0 00-.5.5v4.5A.5.5 0 002 7h.5a.5.5 0 010 1H2A1.5 1.5 0 01.5 6.5V2A1.5 1.5 0 012 .5h4.5A1.5 1.5 0 018 2v.5a.5.5 0 01-1 0V2a.5.5 0 00-.5-.5H2z"
        fill="currentColor"
      />
    </svg>
  );
}

const Copy = React.memo(CopyIC);
export default Copy;
