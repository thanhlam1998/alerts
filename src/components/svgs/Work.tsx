import * as React from "react";

function WorkIC(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" {...props}>
      <path
        d="M17.022 5.417h-3.333V3.75a1.66 1.66 0 00-1.667-1.667H8.689A1.66 1.66 0 007.022 3.75v1.667H3.689c-.925 0-1.659.741-1.659 1.666l-.008 9.167a1.66 1.66 0 001.667 1.667h13.333a1.66 1.66 0 001.667-1.667V7.083a1.66 1.66 0 00-1.667-1.666zm-5 0H8.689V3.75h3.333v1.667z"
        fill="currentColor"
      />
    </svg>
  );
}

const Work = React.memo(WorkIC);
export default Work;
