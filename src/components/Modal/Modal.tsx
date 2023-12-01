import Button, { ButtonProps } from "../Button/Button";
import MemoClose from "components/svgs/Close";
import React, { Fragment } from "react";
import { Modal as ModalAnt } from "antd";
import { trimSpaces } from "../../scripts/helpers";
import "./Modal.scss";
import { APP_PREFIX } from "scripts/constants";

const componentName = "modal";
const componentClassNamePrefix = `bri-${componentName}`;

export interface ConsoleModalProps {
  children: React.ReactNode;
  /**
   * Custom footer instead of using default modal footer
   */
  customFooter?: React.ReactNode;
  /**
   * Option to fit button footer width to its parent width
   */
  footerPosition?: "center" | "right";
  /**
   * Option to add button props footer for OK button
   */
  buttonOkProps?: ButtonProps;
  /**
   * Option to add button props footer for Cancel button
   */
  buttonCancelProps?: ButtonProps;
  /**
   * Add error to modal
   */
  error?: string;
  /**
   * Whether the modal dialog is visible or not
   */
  visible?: boolean;
  /**
   * Text of the cancel button
   */
  cancelText?: string;
  /**
   * Text of the OK button
   */
  okText?: string;
  /**
   * Specify a function that will be called when user close modal
   */
  onCancel?: () => void;
  /**
   * Specify a function that will be called when user click to OK button
   */
  onOk?: () => void;
  /**
   * The modal's dialog title
   */
  title?: React.ReactNode;
  /**
   * The className of the container
   */
  className?: string;
  /**
   * The customize width of the modal
   */
  width?: number | string;
  /**
   * Whether to unmount child component on onClose
   */
  destroyOnClose?: boolean;
  /**
   * Whether to place modal center or not
   */
  centered?: boolean;
  /**
   * Whether to close the modal dialog when the mask is clicked
   */
  maskClosable?: boolean;
  /**
   * Whether show mask or not
   */
  mask?: boolean;
  /**
   * Specify a function that will be called when modal is closed completely
   */
  afterClose?: Function;
  /**
   * Is enable default footer
   */
  showFooter?: boolean;
  /**
   * Body style for modal body element. Such as height, padding etc
   */
  bodyStyle?: any;

  /**
   * Height for modal body
   */
  height?: any;
}

const Modal = ({
  className = "",
  title = "",
  destroyOnClose = false,
  centered = false,
  visible = false,
  cancelText,
  okText,
  customFooter,
  footerPosition = "right",
  children,
  onCancel,
  buttonCancelProps,
  buttonOkProps,
  onOk,
  error,
  width,
  maskClosable = true,
  showFooter = true,
  bodyStyle = {},
  height = "auto",
}: ConsoleModalProps) => {
  return (
    <ModalAnt
      {...{
        title,
        open: visible,
        onCancel,
        width,
        destroyOnClose,
        centered,
        maskClosable,
        bodyStyle,
      }}
      closeIcon={<MemoClose className="text-gray-800" />}
      className={trimSpaces(
        `bri-modal bri-modal__${!showFooter ? "non-footer" : ""} ${className}`
      )}
      footer={
        customFooter !== undefined ? (
          customFooter
        ) : showFooter ? (
          <div
            className={trimSpaces(
              `ant-modal-footer-content ${
                footerPosition === "right"
                  ? "ant-modal-footer-content__inline"
                  : ""
              }`
            )}
          >
            {error && <div className="ant-modal-footer-error">{error}</div>}
            <div className="ant-modal-footer-buttons">
              <Fragment>
                <Button
                  block={footerPosition === "center"}
                  size={"large"}
                  type="text"
                  theme={"standard"}
                  onClick={onCancel}
                  {...buttonCancelProps}
                >
                  {cancelText ?? "Cancel"}
                </Button>
                <Button
                  onClick={onOk}
                  block={footerPosition === "center"}
                  type={"primary"}
                  size={"large"}
                  {...buttonOkProps}
                >
                  {okText ?? "OK"}
                </Button>
              </Fragment>
            </div>
          </div>
        ) : null
      }
    >
      <div
        className="bri-modal__body max-h-[500px] px-6 overflow-y-auto"
        style={{ height }}
      >
        {children}
      </div>
    </ModalAnt>
  );
};

Modal.defaultProps = {
  visible: false,
  footerBlock: true,
};

export default Modal;
