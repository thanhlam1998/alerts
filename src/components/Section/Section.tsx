import React from "react";

const Section = ({ className = "", title, children, titleClassName, contentClassName }: any) => {
  return (
    <div className={`bri-section p-2 rounded-lg bg-gray100 flex-1 mb-3 ${className}`}>
      <div className={`bri-section-title sm_body_b1_semi text-gray800 mb-2 ${titleClassName}`}>
        {title}
      </div>
      <div className={`bri-section-content ${contentClassName}`}>{children}</div>
    </div>
  );
};

export default Section;
