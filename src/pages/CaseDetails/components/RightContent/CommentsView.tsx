import { Avatar, Button, Divider, Input, List } from "antd";
import SpinLoading from "components/Loading";
import React, { useEffect, useRef } from "react";
import "./CommentsView.scss";

const Editor = ({
  onChange,
  onSubmit,
  submitting,
  value,
}: {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}) => {
  const handleKeyDown = (event: any) => {
    // Enter
    if (event.keyCode === 13) {
      onSubmit();
    }
  };

  return (
    <>
      <Input.TextArea
        rows={3}
        style={{ resize: "none" }}
        onChange={onChange}
        value={value}
        onKeyDown={handleKeyDown}
      />
      <div className="flex w-full justify-between items-center mt-1">
        <span className="descriptor">Press Enter to send</span>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          disabled={!value}
          type="primary"
        >
          Send
        </Button>
      </div>
    </>
  );
};

const CommentList = ({ comments, userId }: { comments: any[]; userId: string }) => {
  const bottomRef = useRef<any>(null);
  return (
    <List
      dataSource={comments}
      itemLayout="horizontal"
      renderItem={(props, index: number) => {
        if (!props.comments?.length) {
          return null;
        }

        const componentList = [];
        if (props.date) {
          componentList.push(<Divider className="divider-date">{props.date}</Divider>);
        }

        props.comments.forEach((commentItem: any, itemIndex: any) => {
          const isLastItem =
            index === comments.length - 1 && itemIndex === props.comments.length - 1;
          let otherAttributes = {};
          if (isLastItem) {
            otherAttributes = {
              ref: bottomRef,
            };
          }
          const isSelfComment = commentItem.createdBy === userId;
          if (isSelfComment) {
            componentList.push(
              <List.Item
                className="comments-view__comment-list-item comments-view__comment-list-item--is-self"
                {...otherAttributes}
              >
                <List.Item.Meta
                  className="comments-view__comment-list-item"
                  description={commentItem.text}
                />
              </List.Item>,
            );
          } else {
            const author = commentItem.author;
            componentList.push(
              <List.Item
                className="comments-view__comment-list-item comments-view__comment-list-item--include-avatar"
                {...otherAttributes}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      shape="circle"
                      className="w-[24px] h-[24px]"
                      src={author?.profilePictureUrl ?? ""}
                    />
                  }
                  title={`${author?.firstName} ${author?.lastName ? author?.lastName : ""}`}
                  description={commentItem?.text ?? ""}
                />
              </List.Item>,
            );
          }
        });

        return componentList;
      }}
    />
  );
};

const CommentsView = ({
  userId,
  caseId,
  submitting,
  onAddComment,
  value,
  setValue,
  loading,
  comments,
}: {
  userId: string;
  caseId: string;
  submitting: boolean;
  onAddComment: (values: any) => void;
  value: string;
  setValue: (data: any) => void;
  loading: boolean;
  comments: any[] | null;
}) => {
  const handleSubmit = () => {
    if (!value) return;
    onAddComment({ caseId, text: value });
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const listRef = useRef<any>(null);

  useEffect(() => {
    if (!loading && comments && comments.length > 0) {
      if (listRef.current) {
        let listContainer = listRef.current.getElementsByClassName("ant-list-items")[0];

        if (listContainer) {
          listContainer.scrollTo({
            top: listContainer.scrollHeight,
            behavior: "smooth",
          });
        }
      }
    }
  }, [comments, loading]);

  return (
    <div className="comments-view">
      <div className="comments-view__comment-list" ref={listRef}>
        {comments === null || loading ? (
          <div className="absolute w-full h-full">
            <SpinLoading />
          </div>
        ) : (
          <CommentList comments={comments} userId={userId} />
        )}
      </div>
      <div className="comments-view__text">
        <Editor
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitting={submitting}
          value={value}
        />
      </div>
    </div>
  );
};

export default CommentsView;
