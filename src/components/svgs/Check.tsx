import * as React from "react";

function CheckIC(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...props}>
      <path
        d="M4.396 9.582l-3.25-3.25a.5.5 0 010-.707l.708-.707a.5.5 0 01.707 0l2.189 2.19 4.69-4.69a.5.5 0 01.707 0l.707.707a.5.5 0 010 .707l-5.75 5.75a.5.5 0 01-.708 0z"
        fill="#10B981"
      />
    </svg>
  );
}

const Check = React.memo(CheckIC);
export default Check;
