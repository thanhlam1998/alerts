import { Avatar, Input } from "antd";
import Button from "components/Button";
import SpinLoading from "components/Loading";
import Delete from "components/svgs/Delete";
import Search from "components/svgs/Search";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getUserRolLabel } from "scripts/constants";
import { getShortUserName } from "scripts/helpers";
import "./ParticipantsView.scss";

const ParticipantsViews = ({
  caseId,
  loading,
  loadingUser,
  users,
  onAddParticipant,
  isCreating,
  participants,
  onDeleteParticipant,
}: {
  userId: string;
  caseId: string;
  loading: boolean;
  loadingUser: boolean;
  users: any[];
  onAddParticipant: (values: any) => void;
  isCreating: boolean;
  participants: any[];
  isDeleting: boolean;
  onDeleteParticipant: (values: any) => void;
}) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [deletingId, setDeletingId] = useState(null);

  const handleOnChangeSearch = (e: any) => {
    e.preventDefault();
    setSearchText(e?.target?.value);
  };

  useEffect(() => {
    const nextFilteredUsers = searchText
      ? users?.filter((user: any) =>
          `${user?.firstName?.toLowerCase()} ${user?.lastName?.toLowerCase()}`?.includes(
            searchText?.toLowerCase(),
          ),
        )
      : users;
    setFilteredUsers(nextFilteredUsers);
  }, [searchText]);

  return (
    <div className="participants-view">
      <Input
        disabled={loading || loadingUser || isCreating}
        value={searchText}
        onChange={handleOnChangeSearch}
        placeholder={t("Search a person to add")}
        suffix={<Search />}
      />
      {searchText && (
        <div className="participants-view__search-view">
          <div className="participants-view__search-view-list">
            <div className="mt-[16px] mb-[12px]">
              {t("Results")} ({filteredUsers?.length ?? 0})
            </div>
            {filteredUsers?.map((user: any, index: number) => {
              return (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    onAddParticipant({ caseId: caseId, userId: user.id });
                    setSearchText("");
                  }}
                  key={index}
                  className="flex items-center cursor-pointer px-2 py-[10px] bg-gray100 rounded-lg border-solid border border-gray200 mb-3 last:mb-0"
                >
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
              );
            })}
          </div>
        </div>
      )}
      {!searchText && (
        <div className="participants-view__list-view mt-[16px]">
          {participants === null || loading ? (
            <div className="absolute w-full h-full">
              <SpinLoading />
            </div>
          ) : (
            <div className="participants-view__list-view-list">
              {participants?.map((participant: any, index: number) => {
                const user = participant.user ?? {};
                return (
                  <div
                    key={index}
                    className="flex items-center cursor-pointer px-2 py-[10px] bg-gray100 rounded-lg border-solid border border-gray200 mb-3 last:mb-0"
                  >
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
                    <div className="flex flex-col ml-auto">
                      <Button
                        loading={deletingId === participant.id}
                        onClick={(e) => {
                          e.preventDefault();
                          setDeletingId(participant.id);
                          onDeleteParticipant({
                            participantId: participant.id,
                          });
                        }}
                        className="p-[6px]"
                        theme="red"
                        type="text"
                      >
                        <Delete />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ParticipantsViews;
