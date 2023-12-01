import commentAPI, { createComment } from "apis/comments";
import participantAPI from "apis/participants";
import SwitchButton from "components/SwitchButton";
import i18next from "i18next";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { getRedux } from "scripts/helpers";
import CommentsView from "./CommentsView";
import ParticipantsViews from "./ParticipantsView";
import variables from "scripts/variables";
import { io as SocketClient } from "socket.io-client";
import { SOCKET_EVENT_TYPES } from "scripts/constants";
import "./RightContent.scss";

export const COMMENTS_TABS = () => [
  {
    value: "COMMENTS",
    label: i18next.t("Comments"),
  },
  {
    value: "PARTICIPANTS",
    label: i18next.t("Participants"),
  },
];

const CommentsContainer = ({ caseId }: { caseId: string }) => {
  const [tabActive, setTabActive] = useState(COMMENTS_TABS()[1]?.value);
  const [value, setValue] = useState("");
  const [comments, setComments] = useState<any[] | null>(null);
  const userId = getRedux(`auth.currentUser.id`, "");
  const [participantUsers, setParticipantUsers] = useState([]);

  const { t } = useTranslation();
  const ws = useRef<any>();
  const [isConnectionOpen, setConnectionOpen] = useState(false);


  const { isLoading: isCreatingComment, mutate: _onCreateComment } = useMutation(createComment, {
    onSuccess: () => {
      setValue("");

    },
  });

  let { isLoading: isGettingCommentList, refetch: refetchCommentList }: any = useQuery(
    ["getComments", caseId],
    async () => {
      const result = await commentAPI.getComments({ caseId });
      if (result && result.data) {
        const groups = result.data.reduce((groups: any, comment: any) => {
          const date = moment.utc(Number(comment.createdOn * 1000)).format("MMM.DD.YYYY");
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(comment);
          return groups;
        }, {});

        const groupArrays = Object.keys(groups).map((date) => {
          return {
            date,
            comments: groups[date],
          };
        });
        setComments(groupArrays);
      }
    },
    { enabled: !!caseId },
  );

  let { isLoading: isGettingParticipantUsers, refetch: refetchParticipantUsers }: any = useQuery(
    ["getParticipantUsers", caseId],
    async () => {
      const result = await participantAPI.getParticipantUsers({ caseId });
      if (result && result.data) {
        setParticipantUsers(result.data);
      }
    },
    { enabled: !!caseId },
  );

  const { isLoading: isCreatingParticipant, mutate: _onCreateParticipant } = useMutation(
    participantAPI.createParticipant,
    {
      onSuccess: () => {
        refetchParticipantUsers();
        refetchParticipantList();
      },
    },
  );

  let {
    isLoading: isGettingParticipantList,
    data: participantList,
    refetch: refetchParticipantList,
  }: any = useQuery(
    ["getParticipantList", caseId],
    async () => {
      const result = await participantAPI.getParticipantList({ caseId });
      return result.data;
    },
    { enabled: !!caseId },
  );

  const { isLoading: isDeletingParticipant, mutate: _onDeleteParticipant } = useMutation(
    participantAPI.deleteParticipant,
    {
      onSuccess: () => {
        refetchParticipantUsers();
        refetchParticipantList();
      },
    },
  );

  useEffect(() => {
    if (!caseId) {
      return;
    }

    ws.current = SocketClient(variables.webSocketUrl);
    const socket = ws.current;
    socket.on(SOCKET_EVENT_TYPES.CONNECT, () => {
      socket.emit(SOCKET_EVENT_TYPES.JOIN, { caseId, userId });
    })

    socket.on(SOCKET_EVENT_TYPES.NEW_COMMENT, () => {
      refetchCommentList();
    })

    return () => {
      console.log("Cleaning up...");
      socket.close();
    };
  }, [caseId]);

  return (
    <div className="comments-container">
      <SwitchButton
        tabClassName="flex flex-1"
        items={COMMENTS_TABS()}
        active={tabActive}
        onChange={(tab: any) => setTabActive(tab?.value)}
      />
      <div className="pt-[14px]"></div>
      {tabActive === "COMMENTS" && (
        <CommentsView
          userId={userId}
          loading={isGettingCommentList && isConnectionOpen}
          caseId={caseId}
          submitting={isCreatingComment}
          value={value}
          setValue={setValue}
          comments={comments}
          onAddComment={({ caseId, text }: { caseId: string; text: string }) => {
            _onCreateComment({ caseId, text });
          }}
        />
      )}
      {tabActive === "PARTICIPANTS" && (
        <ParticipantsViews
          userId={userId}
          caseId={caseId}
          users={participantUsers}
          loadingUser={isGettingParticipantUsers}
          loading={isGettingParticipantList}
          isCreating={isCreatingParticipant}
          isDeleting={isDeletingParticipant}
          participants={participantList}
          onAddParticipant={({ caseId, userId }: { caseId: string; userId: string }) => {
            _onCreateParticipant({ caseId, userId });
          }}
          onDeleteParticipant={({ participantId }: { participantId: number }) => {
            _onDeleteParticipant({ participantId });
          }}
        />
      )}
    </div>
  );
};

export default CommentsContainer;
