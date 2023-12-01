import { Dropdown, Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import "./LanguageDropdown.scss";
import moment from "moment";
import React from "react";
import { getRedux } from "scripts/helpers";
import { IS_LANGUAGE_CHANGED } from "scripts/constants";
import USAFlag from "components/svgs/UsaFlag";
import VietNamFlag from "components/svgs/VietNamFlag";
import { changeLanguage } from "store/reducers/app";

const LanguageDropdown = () => {
  const DropdownData = [
    {
      name: "English",
      icon: <USAFlag />,
      code: "en",
    },
    {
      name: "Tiếng Việt",
      icon: <VietNamFlag />,
      code: "vi",
    },
  ];

  const { currentLanguage: language = "en" }: any = getRedux(`app`, {});
  const dispatch = useDispatch();
  const [languageSelected, setLanguageSelected]: any = useState(DropdownData[0]);

  useEffect(() => {
    const selected = DropdownData.find((it: any) => it.code === language);
    setLanguageSelected(selected);
    moment.locale(language);
  }, [language]);

  const { t } = useTranslation();

  const isDisabled = process?.env?.ENVIRONMENT == "production";

  const items: MenuProps["items"] = [
    {
      label: "English",
      key: "en",
      icon: <USAFlag />,
    },
    {
      label: "Tiếng Việt",
      key: "vi",
      icon: <VietNamFlag />,
    },
  ];

  const handleMenuClick = (evt: any) => {
    dispatch(changeLanguage(evt.key));
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="language-dropdown-wrapper">
      <Dropdown
        overlayClassName="rounded sm-language-dropdown"
        className={isDisabled ? "" : "hover:cursor-pointer"}
        trigger={["click"]}
        disabled={isDisabled}
        placement="bottomRight"
        menu={menuProps}
      >
        <div
          className={`rounded border-gray200 border-[1px] border-solid flex flex-row 
          h-[32px] items-center ${
            isDisabled ? "" : "hover:border-blue200 hover:text-blue500 hover:bg-blue50"
          }`}
        >
          <div className="py-[6px] px-[16px] sm_body_b2_reg">{languageSelected?.name}</div>
          <div className="bg-gray200 w-[1px] h-[30px]" />
          <div className=" px-[8px] flex">{languageSelected?.icon}</div>
        </div>
      </Dropdown>
    </div>
  );
};

export default LanguageDropdown;
