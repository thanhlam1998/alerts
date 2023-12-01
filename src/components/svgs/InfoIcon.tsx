import { randomUniqueKey } from "scripts/helpers";

const InfoIcon = (props: any) => {
  const uniqueKey = randomUniqueKey();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12" height="12" viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <g clipPath={`url(#a-${uniqueKey})`}>
        <path
          fill="#9CA3AF"
          stroke="#9CA3AF"
          strokeWidth={1.5}
          d="m5.074 3.019.536.525-.536-.525a1.313 1.313 0 0 0-.025 1.811.84.84 0 0 0-.174.514V8.53c0 .466.378.844.844.844h.562a.844.844 0 0 0 .844-.844V5.344a.84.84 0 0 0-.174-.514 1.313 1.313 0 0 0-.025-1.811l-.536.525.536-.525a1.313 1.313 0 0 0-.91-.394h-.031c-.344.007-.67.149-.911.394ZM1.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z"
        />
      </g>
      <defs>
        <clipPath id={`a-${uniqueKey}`}>
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default InfoIcon;
