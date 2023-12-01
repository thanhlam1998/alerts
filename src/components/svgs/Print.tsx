import * as React from "react";

function PrintIC(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="17" height="17" viewBox="0 0 16 16" fill="none" {...props}>
      <g clipPath="url(#prefix__clip0_1231_23243)">
        <path
          d="M13.5 6.645h-.714a.143.143 0 00-.143.143v.714c0 .079.064.143.143.143h.714a.143.143 0 00.143-.143v-.714a.143.143 0 00-.143-.143zm.571-1.857H11.93V1.002a.143.143 0 00-.143-.143H4.214a.143.143 0 00-.143.143v3.786H1.93c-.79 0-1.429.64-1.429 1.428v5.858a.57.57 0 00.571.571h3v2.357c0 .079.065.143.143.143h7.572a.143.143 0 00.143-.143v-2.357h3a.57.57 0 00.571-.571V6.216c0-.789-.64-1.428-1.429-1.428zM5.286 2.074h5.428v2.714H5.286V2.074zm5.428 11.857H5.286V9.002h5.428v4.929zm3.572-2.5h-2.357V7.788H4.07v3.643H1.714V6.216c0-.117.097-.214.215-.214H14.07c.118 0 .215.097.215.214v5.215z"
          fill="#000"
          fillOpacity={0.85}
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_1231_23243">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

const Print = React.memo(PrintIC);
export default Print;
