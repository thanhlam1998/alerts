import React, { useState } from "react";
import Paragraph, { ParagraphProps } from "antd/es/typography/Paragraph";
import { Tooltip } from "antd";

const TooltipParagraph: React.FC<ParagraphProps> = ({
  children,
  ellipsis,
  ...props
}) => {
  const [truncated, setTruncated] = useState(false);

  return (
    <Tooltip title={truncated ? children : undefined}>
      <Paragraph
        {...props}
        ellipsis={{ 
          ...(typeof ellipsis === 'object' ? ellipsis : {}),
          onEllipsis: setTruncated 
        }}
      >
        <>{children}</>
      </Paragraph>
    </Tooltip>
  );
};

export default TooltipParagraph;
