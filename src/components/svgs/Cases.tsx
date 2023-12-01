import * as React from "react";

function CasesIC(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M9.667 10.083c0 .23-.187.417-.417.417h-2.5a.417.417 0 01-.417-.417v-1.25h-5v3.75c0 .667.584 1.25 1.25 1.25h10.834c.666 0 1.25-.583 1.25-1.25v-3.75h-5v1.25zm3.75-5.416h-2.084v-1.25c0-.667-.583-1.25-1.25-1.25H5.917c-.667 0-1.25.583-1.25 1.25v1.25H2.583c-.666 0-1.25.583-1.25 1.25V8h13.334V5.917c0-.667-.584-1.25-1.25-1.25zm-3.75 0H6.333v-.834h3.334v.834z"
        fill="currentColor"
      />
    </svg>
  );
}

const Cases = React.memo(CasesIC);
export default Cases;
