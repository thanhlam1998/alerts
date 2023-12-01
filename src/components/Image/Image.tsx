import * as React from "react";

const Image = ({ src = "", title = "", alt = "", className = "inline-block", ...rest }) => (
  <img {...{ src, title, alt, className }} {...rest} />
);

export default Image;
