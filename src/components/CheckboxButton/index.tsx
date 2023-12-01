import "./CheckBox.scss";

interface CheckBoxProps {
  onChange?: (value: boolean) => void;
  checked?: boolean;
  disabled?: boolean;
  value?: boolean;
  size: "sm" | "base";
  name?: string;
  label?: any;
  separateLabel?: boolean;
  className?: string;
  children?: any;
}

const CheckBox = ({
  onChange = () => {},
  checked = false,
  disabled = false,
  value = false,
  size = "base",
  name = "",
  label = "",
  separateLabel = false,
  className = "",
}: CheckBoxProps) => {
  const onChangeValue = (data: boolean) => {
    onChange(data);
  };

  return (
    <div className={`checkbox-control flex relative ${className}`}>
      <div
        className={`absolute z-100 w-full h-full ${
          !disabled && !separateLabel ? "cursor-pointer" : ""
        } ${separateLabel && "hidden"} ${disabled ? "disabled" : "pointer"}`}
        onClick={() => !disabled && !separateLabel && onChangeValue(!checked)}
      ></div>
      <label className={`checkbox-button-container checkbox-button-container-${size}`}>
        <input
          onClick={() => !separateLabel && onChangeValue(!checked)}
          {...{ name, value: value as any, checked }}
          type="checkbox"
          className={`checkbox-button ${disabled ? "disabled" : ""}`}
          readOnly
        />
        <span className="checkmark"></span>
      </label>
      {label && (
        <span className={`checkbox-control__label checkbox-control__label-${size} ml-2`}>
          {label}
        </span>
      )}
    </div>
  );
};

export default CheckBox;
