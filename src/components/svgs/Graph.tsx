import * as React from "react";

function GraphIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <g clipPath="url(#prefix__clip0_774_12959)">
        <path
          d="M10.51 8.646l1.6.318a1.421 1.421 0 10.122-.607l-1.642-.325a2.329 2.329 0 00-.652-1.61l2.125-3.002a1.797 1.797 0 10-.505-.358L9.454 6.035a2.332 2.332 0 00-2.956.464L3.735 4.353a1.424 1.424 0 10-.397.474l2.816 2.187a2.333 2.333 0 00.58 2.799l-1.712 2.42a1.919 1.919 0 10.472.403L7.25 10.15a2.335 2.335 0 001.91.043l2.085 3.08a1.616 1.616 0 10.503-.359L9.694 9.878c.398-.312.684-.744.816-1.232z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_774_12959">
          <path fill="currentColor" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

const Graph = React.memo(GraphIcon);
export default Graph;
