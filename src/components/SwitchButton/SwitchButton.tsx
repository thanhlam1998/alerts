import "./SwitchButton.scss";

const SwitchButton = ({
  items = [],
  active = ``,
  className = ``,
  onChange,
  tabClassName = "",
  disabled = false,
}: any) => {
  return (
    <div
      className={`flex switch-button-container bg-[#F2F3F4] rounded-[8px] p-[2px] ${className}`}
    >
      {items?.map((btnItem: any, index: number) => {
        const isActive = active === btnItem?.value;
        const icon = isActive ? btnItem?.activeIcon : btnItem?.icon;

        return (
          <button
            key={index}
            onClick={() => onChange(btnItem)}
            className={`switch-button-item py-[4px] px-[8px] 
            flex items-center sm_body_b2_reg text-gray400 border-none rounded-[8px] 
            ${!disabled ? "cursor-pointer" : "cursor-not-allowed"} ${
              btnItem?.className
            } ${tabClassName} ${isActive ? "active" : ""}`}
            disabled={disabled}
          >
            {icon && (
              <span className="mr-1 flex items-center justify-center">
                {icon}
              </span>
            )}
            {btnItem?.label}
          </button>
        );
      })}
    </div>
  );
};

export default SwitchButton;
