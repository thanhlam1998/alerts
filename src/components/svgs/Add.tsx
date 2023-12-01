import * as React from "react";

const Add = (props: any) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.2857 4C14.7335 4 14.2857 4.44772 14.2857 5V14.2857H5C4.44772 14.2857 4 14.7335 4 15.2857V16.7143C4 17.2666 4.44772 17.7143 5 17.7143H14.2857V27C14.2857 27.5523 14.7335 28 15.2857 28H16.7143C17.2666 28 17.7143 27.5523 17.7143 27V17.7143H27C27.5523 17.7143 28 17.2666 28 16.7143V15.2857C28 14.7335 27.5523 14.2857 27 14.2857H17.7143V5C17.7143 4.44772 17.2666 4 16.7143 4H15.2857Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Add;
