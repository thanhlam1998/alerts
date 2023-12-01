import { notification } from "antd";
import Copy from "components/svgs/Copy";
import Button from "./Button";
import { useTranslation } from "react-i18next";
import React from "react";

const CopyButton = ({ className = "", message = "" }: any) => {
  const { t } = useTranslation();

  const onCopyButtonClick = async () => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(message);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = message;

      // Move the textarea outside the viewport to make it invisible
      textarea.style.position = "absolute";
      textarea.style.left = "-99999999px";

      document.body.prepend(textarea);

      // highlight the content of the textarea element
      textarea.select();

      try {
        document.execCommand("copy");
      } catch (err) {
        console.log(err);
      } finally {
        textarea.remove();
      }
    }
    notification?.success({
      message: t("Copied to clipboard"),
    });
  };

  return (
    <Button
      square
      className={`bri-copy-button ${className}`}
      type="default"
      theme="standard"
      size="small"
      onClick={onCopyButtonClick}
    >
      <Copy />
    </Button>
  );
};

export default CopyButton;
