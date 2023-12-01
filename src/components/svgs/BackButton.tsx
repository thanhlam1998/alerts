import * as React from "react";

function BackButton(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="4" fill="#F2F3F4" />
      <path
        d="M9.12675 11.6113L13.5773 7.16093C13.7919 6.94636 14.14 6.94636 14.3545 7.16093L14.8737 7.68007C15.088 7.89441 15.0883 8.24157 14.8746 8.45637L11.3473 11.9999L14.8744 15.5436C15.0883 15.7584 15.0878 16.1056 14.8735 16.3199L14.3543 16.8391C14.1397 17.0536 13.7917 17.0536 13.5771 16.8391L9.12675 12.3885C8.91218 12.1739 8.91218 11.8258 9.12675 11.6113V11.6113Z"
        fill="#1F2937"
      />
    </svg>
  );
}

export default BackButton;
