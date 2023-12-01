import { Checkbox } from "antd";
import Image from "components/Image";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { randomUniqueKey, trimSpaces } from "scripts/helpers";

export const STATUSES_DROPDOWN = {
  unchecked: "unchecked",
  indeterminate: "indeterminate",
  checked: "checked",
};

const DropdownOption = ({ item, changeStatus, status }: any) => {
  const [childrenCheckList, setChildrenCheckList] = useState(
    item?.children as any
  );

  const onChangeChildStatus = (
    childItem: any,
    children: any,
    childStatus: any
  ) => {
    const child = childrenCheckList.find((it: any) => it?.value === childItem);
    if (!isEmpty(child)) {
      child.status = childStatus;
      child.children = children;
      setChildrenCheckList(childrenCheckList);
    }
    let count = 0;
    childrenCheckList?.forEach((it: any) => {
      if (
        it?.status === STATUSES_DROPDOWN.checked ||
        it?.status === STATUSES_DROPDOWN.indeterminate
      )
        count++;
    });

    if (changeStatus) {
      changeStatus(
        item?.value,
        childrenCheckList,
        count === 0
          ? STATUSES_DROPDOWN.unchecked
          : count === childrenCheckList?.length &&
            childrenCheckList?.every(
              (ele: any) => ele?.status === STATUSES_DROPDOWN.checked
            )
          ? STATUSES_DROPDOWN.checked
          : STATUSES_DROPDOWN.indeterminate
      );
    }
  };

  const onChangeCheck = (e: any) => {
    const checked = e?.target?.checked;
    const listChildTransformed = childrenCheckList?.map((it: any) => {
      return {
        ...it,
        status: checked ? STATUSES_DROPDOWN.checked : it?.status,
      };
    });
    setChildrenCheckList(listChildTransformed);
    changeStatus(
      item?.value,
      listChildTransformed,
      checked ? STATUSES_DROPDOWN.checked : STATUSES_DROPDOWN.unchecked
    );
  };

  useEffect(() => {
    const listChild = item?.children;
    listChild?.forEach((it: any) => {
      it.status =
        status === STATUSES_DROPDOWN.checked
          ? STATUSES_DROPDOWN.checked
          : status === STATUSES_DROPDOWN.unchecked
          ? STATUSES_DROPDOWN.unchecked
          : it?.status;
    });
    if (status !== STATUSES_DROPDOWN.indeterminate && listChild) {
      setChildrenCheckList([...listChild]);
    }
  }, [status, item]);

  return (
    <div>
      <Checkbox
        key={item?.id}
        onChange={onChangeCheck}
        indeterminate={status === STATUSES_DROPDOWN.indeterminate}
        checked={status === STATUSES_DROPDOWN.checked}
        className="mb-3"
      >
        <span className="sm_body_b2_reg">
          {item?.imageUrl && (
            <Image
              src={item?.imageUrl ?? ``}
              className={trimSpaces(`relative top-[-1px] mr-[5px] w-[20px]`)}
              type="favicon"
            />
          )}{" "}
          {item?.label}
        </span>
      </Checkbox>
      {!isEmpty(childrenCheckList) && (
        <div className="ml-4">
          {childrenCheckList?.map((el: any) => {
            return (
              <DropdownOption
                item={el}
                key={randomUniqueKey()}
                changeStatus={(item: any, listChild: any, status: any) =>
                  onChangeChildStatus(item, listChild, status)
                }
                status={el?.status}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownOption;
