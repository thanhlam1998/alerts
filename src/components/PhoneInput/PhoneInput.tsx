import React, { useState } from "react";
import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./PhoneInput.scss";

const PhoneInput = ({ containerClass = "", ...rest }) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <PhoneInput2
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      prefix={""}
      country={"vn"}
      containerClass={`bri-phone-input-container w-full flex bg-[#f9fafb] border !rounded-[4px] ${
        isFocus ? "bri-phone-input-container__focus" : ""
      } ${containerClass}`}
      inputClass={` !min-h-[32px] !h-[32px] !w-full`}
      {...rest}
    />
  );
};

export default PhoneInput;
