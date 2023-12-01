import * as React from "react";

function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M5.453 13.094c0 .276.222.5.497.5h4.1a.498.498 0 00.497-.5V10.03H5.453v3.063zm8.299-10.688H2.248a.5.5 0 00-.43.75l3.458 5.875h5.45l3.458-5.875a.502.502 0 00-.432-.75z"
        fill="currentColor"
      />
    </svg>
  );
}

export default React.memo(FilterIcon);
