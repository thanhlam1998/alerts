import * as React from "react";

function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M8 3.813a4.984 4.984 0 014.984 4.984v3.64a.5.5 0 01-.5.5H3.516a.5.5 0 01-.5-.5v-3.64A4.984 4.984 0 018 3.812zm-.438-2.75h.875a.125.125 0 01.125.125v1.5a.125.125 0 01-.125.124h-.875a.125.125 0 01-.125-.124v-1.5a.125.125 0 01.125-.125zM2.77 2.994a.125.125 0 01.177 0l1.06 1.06a.125.125 0 010 .177l-.618.619a.125.125 0 01-.177 0l-1.06-1.06a.125.125 0 010-.178l.619-.618zm10.463 0l.619.618a.125.125 0 010 .177l-1.06 1.06a.125.125 0 01-.178 0l-.619-.618a.125.125 0 010-.177l1.061-1.06a.125.125 0 01.177 0zM3 13.937h10a.5.5 0 01.5.5v.376a.125.125 0 01-.125.124H2.625a.125.125 0 01-.125-.124v-.376a.5.5 0 01.5-.5zm2.312-4.953v3.954h1V8.983h-1z"
        fill="currentColor"
      />
    </svg>
  );
}

const Alert = React.memo(AlertIcon);
export default Alert;
