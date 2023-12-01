import * as React from "react";

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 17 17" fill="none" {...props}>
      <path
        d="M2.5 6.65l6-4.667 6 4.667v7.333a1.334 1.334 0 01-1.333 1.333H3.833A1.334 1.334 0 012.5 13.983V6.65z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 15.316V8.65h4v6.666"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export default HomeIcon;
