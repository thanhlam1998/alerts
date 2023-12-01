import queryString from "query-string";
import { SEPARATE_ARR_CHARACTER } from "scripts/constants";

export const useSearchParams = () => {
  return queryString?.parse(location?.search, {
    arrayFormat: "bracket",
    arrayFormatSeparator: SEPARATE_ARR_CHARACTER,
  }) as any | null;
};

export default useSearchParams;
