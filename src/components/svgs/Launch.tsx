import * as React from "react";

function LaunchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 12" fill="none" {...props}>
      <path
        d="M9.5 9.5h-7v-7H6v-1H2.5a1 1 0 00-1 1v7a1 1 0 001 1h7c.55 0 1-.45 1-1V6h-1v3.5zM7 1.5v1h1.795L3.88 7.415l.705.705L9.5 3.205V5h1V1.5H7z"
        fill="currentColor"
      />
    </svg>
  );
}

const Launch = React.memo(LaunchIcon);
export default Launch;
