import queryString from "query-string";
import { useSearchParams } from "react-router-dom";
import { SEPARATE_ARR_CHARACTER } from "scripts/constants";

export const useOnChangeFilter = (options = {}) => {
  const [_searchParams, setSearchParams] = useSearchParams();

  return (currentQuery?: any) => {
    setSearchParams(
      queryString?.stringify(currentQuery, {
        arrayFormat: "bracket",
        arrayFormatSeparator: SEPARATE_ARR_CHARACTER,
      }),
      options
    );
  };
};

export default useOnChangeFilter;
