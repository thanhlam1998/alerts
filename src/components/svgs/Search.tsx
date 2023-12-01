import * as React from "react";

function SearchIC(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M13.13 11.88h-.66l-.233-.226a5.393 5.393 0 001.309-3.525 5.417 5.417 0 10-5.417 5.417 5.393 5.393 0 003.525-1.308l.225.233v.658l4.167 4.159 1.241-1.242-4.158-4.167zm-5 0a3.745 3.745 0 01-3.75-3.75 3.745 3.745 0 013.75-3.75 3.745 3.745 0 013.75 3.75 3.745 3.745 0 01-3.75 3.75z"
        fill="#6B7280"
      />
    </svg>
  );
}

const Search = React.memo(SearchIC);
export default Search;
