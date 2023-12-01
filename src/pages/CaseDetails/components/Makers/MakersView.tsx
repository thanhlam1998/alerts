import { Avatar } from "antd";
import { IAddMakerToCase, IRemoveMakerFromCase } from "apis/cases";
import Button from "components/Button/Button";
import Input from "components/Input";
import Modal from "components/Modal/Modal";
import WrapperSection from "components/WrapperSection";
import Check from "components/svgs/Check";
import Delete from "components/svgs/Delete";
import Plus from "components/svgs/Plus";
import Search from "components/svgs/Search";
import { CaseDetailActionEnum, CaseDetailActionPrivilegeMap, ICaseDetail, IUserListItem } from "interfaces/case";
import { memo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useDebounce } from "react-use";
import { USER_ROLES, USER_ROLE_OPTIONS } from "scripts/constants";
import { emptyFunction, getRedux, getShortUserName } from "scripts/helpers";
import "./Makers.scss";
import { IMakerList } from "./MakersContainer";

interface IMakersViewProps extends IMakerList {
  loading: boolean;
  caseDetails?: ICaseDetail;

  removeMakerLoading: boolean;
  callRemoveMakerFromCase: (data: IRemoveMakerFromCase) => void;

  addMakerLoading: boolean;
  callAddMakerToCase: (data: IAddMakerToCase) => void;

  privilegeMap: CaseDetailActionPrivilegeMap;
}

const MakersView = ({
  loading,
  caseDetails,

  isGettingMakers,
  makersData,

  removeMakerLoading,
  callRemoveMakerFromCase = emptyFunction,

  addMakerLoading,
  callAddMakerToCase = emptyFunction,

  privilegeMap = {},
}: IMakersViewProps) => {
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState("");
  const [isOpenSearchResult, setIsOpenSearchResult] = useState(false);
  const [searchResults, setSearchResults] = useState<IUserListItem[]>([]);

  const [confirmModalState, setConfirmModalState] = useState<{
    isOpen: boolean;
    type: "add" | "remove";
    makerSelected: IUserListItem | null;
  }>({
    isOpen: false,
    type: "add",
    makerSelected: null,
  });

  const authUserId = getRedux(`auth.currentUser.id`, "");

  useDebounce(
    () => {
      if (searchText?.length > 0 && searchText?.length < 3) return;
      if (searchText?.length === 0 && searchResults.length > 0) {
        setSearchResults([]);
        return;
      }

      const makers: IUserListItem[] = makersData?.filter(
        (marker: IUserListItem) =>
          `${marker?.firstName} ${marker?.lastName}`
            .toLowerCase()
            .includes(searchText.toLowerCase())
      );
      setSearchResults(makers);
    },
    500,
    [searchText]
  );

  const renderHighlight = (text: string) => {
    const index = text
      ?.toLocaleLowerCase()
      .indexOf(searchText?.toLocaleLowerCase());
    if (index === -1) return text;

    const first = text?.substring(0, index);
    const highlight = text?.substring(index, index + searchText.length);
    const last = text?.substring(index + searchText.length);

    return (
      <div>
        {first}
        <span className="text-blue500">{highlight}</span>
        {last}
      </div>
    );
  };

  const MarkerItem = ({
    maker,
    className,
    actionButton,
  }: {
    maker: IUserListItem;
    className?: string;
    actionButton?: any;
  }) => {
    const fullName = `${maker?.firstName} ${maker?.lastName}`;

    return (
      <div
        className={`marker-item border border-solid border-gray200 p-2 rounded-[8px] bg-gray100 mb-4 last:mb-0 ${className}`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Avatar
              size={32}
              style={{
                backgroundColor: "#6085FF",
                color: "#ffffff",
                fontSize: "9px",
              }}
              src={maker?.profilePictureUrl}
            >
              {getShortUserName(maker?.firstName, maker?.lastName)}
            </Avatar>
            <div className="flex flex-col">
              <div className="text-gray800 sm_body_b2_semi break-words">
                {searchText?.length > 0 ? renderHighlight(fullName) : fullName}
              </div>
              {maker.role && (
                <span className="sm_body_b3_reg text-gray500">
                  {USER_ROLE_OPTIONS?.[maker.role as USER_ROLES]?.label ??
                    maker.role}
                </span>
              )}
            </div>
          </div>
          <div>{actionButton}</div>
        </div>
      </div>
    );
  };

  const isAddConfirm = confirmModalState?.type === "add";

  return (
    <WrapperSection
      title={
        <Trans
          defaults="Makers {{number}}"
          values={{
            number: !loading ? `(${caseDetails?.makers?.length ?? 0})` : "",
          }}
        />
      }
      className="case-details__markers p-0 h-full overflow-hidden"
      headerClassName="p-4 pb-0"
      {...{ loading }}
    >
      {privilegeMap[CaseDetailActionEnum.SEARCH_MAKER] ? (
        <div className="case-details__markers-search mb-2 px-4">
          <Input
            placeholder={t("Search a person to add")}
            suffix={<Search className="!w-3 !h-3" />}
            disabled={isGettingMakers || removeMakerLoading}
            id="search-input"
            value={searchText}
            onChange={({ target }: any) => {
              if (!isOpenSearchResult && target?.value?.length > 0) {
                setIsOpenSearchResult(true);
              }
              setSearchText(target?.value);
            }}
            allowClear
          />
      </div>
      ) : null}
      
      <div className="case-details__markers-list relative">
        {!isOpenSearchResult ? (
          <div className="case-details__markers-list-wrapper p-4 pt-0 h-full overflow-y-auto">
            {(caseDetails?.makers ?? [])?.map((maker: IUserListItem) => {
              return (
                <MarkerItem
                  {...{ maker }}
                  key={maker?.id}
                  actionButton={
                    (caseDetails?.makers ?? [])?.length > 1 && maker.id !== authUserId && privilegeMap[CaseDetailActionEnum.REMOVE_MAKER] ? (
                      <Button
                        theme="red"
                        type="default"
                        size="small"
                        square
                        className="!w-6 !p-0"
                        onClick={() => {
                          if (caseDetails?.caseId && maker?.email)
                            setConfirmModalState({
                              isOpen: true,
                              type: "remove",
                              makerSelected: maker,
                            });
                        }}
                        loading={
                          maker?.email ===
                            confirmModalState?.makerSelected?.email &&
                          removeMakerLoading
                        }
                        disabled={
                          maker?.email ===
                            confirmModalState?.makerSelected?.email &&
                          removeMakerLoading
                        }
                      >
                        <Delete />
                      </Button>
                    ) : null
                  }
                />
              );
            })}
          </div>
        ) : (
          <div className="case-details__markers-search absolute z-[99] top-0 right-0 bottom-0 w-full h-full bg-white rounded-b-[12px]">
            <div className="case-details__markers-search-wrapper h-full flex flex-col justify-between">
              <div className="case-details__markers-search-header mb-3 sm_body_b3_reg px-4">
                <Trans
                  defaults="Results {{number}}"
                  values={{
                    number: `(${searchResults?.length ?? 0})`,
                  }}
                />
              </div>
              <div className="case-details__markers-search-items px-4 flex-grow-[1] overflow-y-auto">
                {searchResults?.map((maker: IUserListItem) => {
                  const markerMapping: IUserListItem[] =
                    caseDetails?.makers?.filter(
                      (m: IUserListItem) => m.id === maker.id
                    ) ?? [];
                  const isExisting = markerMapping?.length > 0;

                  return (
                    <MarkerItem
                      {...{ maker }}
                      key={maker?.id}
                      className="!mb-3 !last:mb-4"
                      actionButton={
                        isExisting ? (
                          <span className="inline-flex w-6 h-6 items-center justify-center">
                            <Check />
                          </span>
                        ) : (
                          <Button
                            theme="standard"
                            type="primary"
                            size="small"
                            square
                            className="!w-6 !p-0"
                            disabled={
                              maker?.email ===
                                confirmModalState?.makerSelected?.email &&
                              addMakerLoading
                            }
                            loading={
                              maker?.email ===
                                confirmModalState?.makerSelected?.email &&
                              addMakerLoading
                            }
                            onClick={() => {
                              if (caseDetails?.caseId && maker?.email)
                                setConfirmModalState({
                                  isOpen: true,
                                  type: "add",
                                  makerSelected: maker,
                                });
                            }}
                          >
                            <Plus />
                          </Button>
                        )
                      }
                    />
                  );
                })}
              </div>
              <div className="case-details__markers-search-action flex items-center justify-end p-2 border-0 border-t border-solid border-[rgba(0,0,0,0.05)]">
                <Button
                  theme="red"
                  type="default"
                  size="small"
                  onClick={() => {
                    setIsOpenSearchResult(false);
                    setSearchText("");
                  }}
                >
                  {t("Close")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirm modal */}
      <Modal
        className="confirm-modal"
        centered
        destroyOnClose
        bodyStyle={{ padding: 0 }}
        visible={confirmModalState.isOpen}
        title={t("Confirm")}
        onCancel={() => {
          setConfirmModalState({
            isOpen: false,
            type: "add",
            makerSelected: null,
          });
        }}
        width={640}
        okText={isAddConfirm ? t("Add") : t("Remove")}
        buttonOkProps={{
          disabled: addMakerLoading,
          theme: isAddConfirm ? "standard" : "red",
        }}
        onOk={() => {
          if (caseDetails?.caseId && confirmModalState?.makerSelected?.id) {
            if (isAddConfirm) {
              callAddMakerToCase({
                caseId: caseDetails?.caseId,
                makerId: confirmModalState?.makerSelected?.id,
              });
            } else {
              callRemoveMakerFromCase({
                caseId: caseDetails?.caseId,
                makerId: confirmModalState?.makerSelected?.id,
              });
            }

            setConfirmModalState({
              isOpen: false,
              type: "add",
              makerSelected: null,
            });
          }
        }}
      >
        <div className="confirm-modal__wrapper pb-6">
          <div className="flex items-center sm_body_b1_reg text-gray800">
            {isAddConfirm ? (
              <Trans
                defaults="Are you sure you want to add the maker <spanTag>'{{makerFullName}}'</spanTag> to this case?"
                components={{
                  spanTag: <span className="sm_body_b1_semi mx-1" />,
                }}
                values={{
                  makerFullName: `${confirmModalState?.makerSelected?.firstName} ${confirmModalState?.makerSelected?.lastName}`,
                }}
              />
            ) : (
              <Trans
                defaults="Are you sure you want to remove the maker <spanTag>'{{makerFullName}}'</spanTag> from this case?"
                components={{
                  spanTag: <span className="sm_body_b1_semi mx-1" />,
                }}
                values={{
                  makerFullName: `${confirmModalState?.makerSelected?.firstName} ${confirmModalState?.makerSelected?.lastName}`,
                }}
              />
            )}
          </div>
        </div>
      </Modal>
    </WrapperSection>
  );
};

export default memo(MakersView);
