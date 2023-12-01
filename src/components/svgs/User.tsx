import * as React from "react";

function UserIC(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" {...props}>
      <path
        d="M10.758 11.042A4.689 4.689 0 106.07 6.354c0 2.588 2.1 4.688 4.688 4.688zm4.166 1.041h-1.793a5.672 5.672 0 01-4.746 0H6.59a4.166 4.166 0 00-4.167 4.167v.52c0 .864.7 1.563 1.563 1.563h13.542c.862 0 1.562-.7 1.562-1.562v-.521a4.166 4.166 0 00-4.167-4.167z"
        fill="currentColor"
      />
    </svg>
  );
}

const User = React.memo(UserIC);
export default User;
