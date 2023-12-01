import * as React from "react";

function AlertsIC(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M13.75 1.75c-.06 0-.12.01-.181.036L4.562 5.405H2a.255.255 0 00-.25.26v4.67c0 .145.113.26.25.26h1.587a1.873 1.873 0 001.788 2.436c.866 0 1.595-.587 1.81-1.381l6.385 2.566c.061.023.122.036.182.036a.51.51 0 00.5-.52V2.27a.512.512 0 00-.502-.519zM5.375 11.91a.748.748 0 01-.578-1.22l1.326.532a.752.752 0 01-.748.689z"
        fill="currentColor"
      />
    </svg>
  );
}

const Alerts = React.memo(AlertsIC);
export default Alerts;
