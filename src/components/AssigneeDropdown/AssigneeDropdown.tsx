import { Avatar } from "antd";
import Input from "components/Input";
import LoadingIcon from "components/Select/LoadingIcon";
import Check from "components/svgs/Check";
import ChevronDown from "components/svgs/ChevronDown";
import useOnClickOutside from "hooks/useClickOutside";
import { UserProps } from "interface/User";
import { isEmpty } from "lodash";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getUserRolLabel } from "scripts/constants";
import { getShortUserName } from "scripts/helpers";
import "./AssigneeDropdown.scss";

const AssigneeDropdown = ({
  users,
  onSelectUser,
  loading = false,
  activeUser,
}: {
  users: UserProps[];
  activeUser: UserProps;
  onSelectUser: (userId: string) => void;
  loading: boolean;
}) => {
  const { t } = useTranslation();
  const { firstName = "", lastName = "" } = activeUser ?? {};
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const wrapperRef = useRef(null);
  const [searchText, setSearchText] = useState("");

  const assigneeName = !isEmpty(activeUser) ? `${firstName} ${lastName}` : t("Unassigned");

  useOnClickOutside(wrapperRef, () => {
    setDropdownVisible(false);
  });

  const filteredUsers = searchText
    ? users?.filter((user: UserProps) =>
        `${user?.firstName?.toLowerCase()} ${user?.lastName?.toLowerCase()}`?.includes(
          searchText?.toLowerCase(),
        ),
      )
    : users;

  return (
    <div ref={wrapperRef} className="sm_body_b1_reg relative assignee-dropdown">
      <div
        className={`bg-[#fafafd] rounded border-[1px] border-solid border-gray200 ${
          !loading ? "cursor-pointer" : "cursor-not-allowed"
        } px-2 py-[4px] flex justify-center items-center`}
        onClick={() => !loading && setDropdownVisible(!dropdownVisible)}
      >
        {loading && <LoadingIcon className="animate-spin mr-2 h-[10px] w-[10px]" />}
        <span className="text-gray600">{t("Assignee")}</span>
        <span className="text-blue600 mx-2">{assigneeName}</span>
        <ChevronDown className="text-gray500" />
      </div>
      {dropdownVisible && (
        <div className=" assignee-dropdown-options !min-w-[250px] right-0 absolute flex rounded-lg flex-col p-2 bg-white z-20 w-full max-h-[500px] overflow-hidden">
          <Input
            onChange={(e: any) => setSearchText(e?.target?.value)}
            placeholder={t("Search")}
            wrapperClassName="mb-2"
          />
          <div className="overflow-auto ">
            {filteredUsers?.map((user: UserProps, index: number) => {
              const isSelected = user.id === activeUser?.id;

              return (
                <div
                  onClick={() => {
                    if (!isSelected) {
                      setDropdownVisible(false);
                      onSelectUser(user?.id);
                    }
                  }}
                  key={index}
                  className={`flex items-center ${
                    !isSelected
                      ? "cursor-pointer bg-gray100 hover:bg-blue100 border-gray200 hover:border-blue200"
                      : "cursor-default bg-blue100 border-blue200"
                  } px-2 py-[10px] rounded-lg border-solid border mb-3 last:mb-0 gap-2 justify-between transition-all`}
                >
                  <div className="flex items-center">
                    <Avatar
                      className="mr-2"
                      size={32}
                      style={{ backgroundColor: "#6085FF", color: "#ffffff", fontSize: "9px" }}
                      src={user?.img}
                    >
                      {getShortUserName(user?.firstName, user?.lastName)}
                    </Avatar>
                    <div className="flex flex-col ">
                      <span className="text-gray800 sm_body_b2_semi">{`${user?.firstName} ${
                        user?.lastName ? user?.lastName : ""
                      }`}</span>
                      <span className="text-gray500 sm_body_b3_reg">
                        {getUserRolLabel(user?.role, t)}
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <span>
                      <Check />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssigneeDropdown;
