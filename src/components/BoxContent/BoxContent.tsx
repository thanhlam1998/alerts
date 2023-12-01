import "./BoxContent.scss";

const BoxContent = ({
  title = "",
  children,
  theme = "white",
  className = "",
  contentClassName = "",
}: {
  title: string | React.ReactNode;
  children?: React.ReactNode;
  theme?: "white" | "gray";
  className?: string;
  contentClassName?: string;
}) => {
  return (
    <div
      className={`box-content rounded-[12px] p-4 ${
        theme === "white" ? "bg-white" : "bg-gray100"
      } ${className}`}
    >
      <div className="box-content__wrapper flex flex-col gap-2">
        {title && (
          <div className="box-content__header sm_body_b1_semi">{title}</div>
        )}
        <div className={`box-content__content ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default BoxContent;
