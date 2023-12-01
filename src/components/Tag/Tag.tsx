import Close from "components/svgs/Close";
import { ReactNode } from "react";
import { COLORS } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";
import "./Tag.scss";

export interface TagProps {
  /**
   * Label for tag
   */
  label: string | ReactNode;
  /**
   * container class for tag component
   */
  className?: string;
  /**
   * Color build-in for tag component
   */
  color?: ColorProps;
  /**
   * Custom color for tag component [text color , background color,border color]
   */
  customColor?: [string, string, string];
  onClick?: () => void;
  onClose?: () => void;
}
export type ColorProps =
  | "red"
  | "yellow"
  | "blue"
  | "gray"
  | "green"
  | "purple";

export const getTagColor = (color: ColorProps) => {
  let textColor = "";
  let backgroundColor = "";
  let borderColor = null;

  switch (color) {
    case "blue":
      textColor = COLORS.blue[600];
      backgroundColor = COLORS.blue[100];
      break;
    case "green":
      textColor = COLORS.green[600];
      backgroundColor = COLORS.green[100];
      break;
    case "red":
      textColor = COLORS.red[600];
      backgroundColor = COLORS.red[100];
      break;
    case "yellow":
      textColor = COLORS.orange[600];
      backgroundColor = COLORS.yellow[100];
      break;
    case "purple":
      textColor = COLORS.purple[600];
      backgroundColor = COLORS.purple[100];
      break;
    case "gray":
      textColor = COLORS.gray[800];
      backgroundColor = COLORS.gray[50];
      borderColor = COLORS.gray[200];
      break;
    default:
      textColor = COLORS.gray[400];
      backgroundColor = COLORS.gray[100];
      break;
  }
  return { textColor, backgroundColor, borderColor };
};

const Tag = ({
  className = "",
  color = "blue",
  label,
  customColor,
  onClick = emptyFunction,
  onClose,
}: TagProps) => {
  let textColor = "";
  let backgroundColor = "";
  let borderColor = "";

  if (customColor) {
    textColor = customColor?.[0];
    backgroundColor = customColor?.[1];
    borderColor = customColor?.[2];
  } else {
    textColor = getTagColor(color)?.textColor;
    backgroundColor = getTagColor(color)?.backgroundColor;
    borderColor =
      getTagColor(color)?.borderColor ?? getTagColor(color)?.backgroundColor;
  }

  return (
    <div
      onClick={onClick}
      style={{ backgroundColor, border: `1px solid ${borderColor}` }}
      className={`tag-bri-system flex items-center ${className}`}
    >
      <span style={{ color: textColor }}>{label}</span>
      {onClose && (
        <Close
          style={{ color: textColor }}
          className="cursor-pointer ml-2"
          onClick={onClose}
        />
      )}
    </div>
  );
};

Tag.defaultProps = {
  className: "",
  label: "tag",
};

export default Tag;
