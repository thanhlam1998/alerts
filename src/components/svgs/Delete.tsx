import * as React from "react";

function DeleteIC(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M4 12.667C4 13.4 4.6 14 5.333 14h5.334C11.4 14 12 13.4 12 12.667v-8H4v8zM5.333 6h5.334v6.667H5.333V6zm5-3.333L9.667 2H6.333l-.666.667H3.333V4h9.334V2.667h-2.334z"
        fill="currentColor"
      />
    </svg>
  );
}

const Delete = React.memo(DeleteIC);
export default Delete;
