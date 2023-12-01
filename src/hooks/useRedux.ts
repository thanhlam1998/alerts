import { get } from "lodash";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

export const useRedux = (path: string, defaultValue: any) => {
  const getValueRedux = (path: string) => (object: any) => get(object, path);
  const selectValueRedux = (path: string) =>
    createSelector(getValueRedux(path), (data) => data);
  const getSelector = (path: string) => useSelector(selectValueRedux(path));

  return getSelector(path) || defaultValue;
};

export default useRedux;
