import Button from "components/Button";
import BackV2 from "components/svgs/BackV2";
import NotFoundIcon from "components/svgs/Notfound";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="16" height="16" viewBox="0 0 17 17" fill="none" {...props}>
      <path
        d="M2.5 6.65l6-4.667 6 4.667v7.333a1.334 1.334 0 01-1.333 1.333H3.833A1.334 1.334 0 012.5 13.983V6.65z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 15.316V8.65h4v6.666"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  
  return (
    <div className="flex items-center justify-center flex-col h-full">
      <NotFoundIcon />
      <div className="py-[32px]">
        <div className="text-center">
          <span className="sm_heading_h5">{t("Page not found")}</span>
        </div>
        <div className="text-center mt-2">
          <span className="sm_body_b1_reg text-[#6B7280]">
            {t("Sorry, the page you requested could not be found.")}
          </span>
        </div>
      </div>
      <div className="flex flex-row">
        <Button
          type={"primary"}
          onClick={() => navigate(-1)}
          className="mr-4 h-[40px] rounded-xl"
          icon={<BackV2 className="text-white" />}
        >
          {t("Back to Previous page")}
        </Button>
        <Button
          onClick={() => navigate("/")}
          className="h-[40px] bg-[#F2F3F4] rounded-xl"
          icon={<HomeIcon className="text-gray800" />}
        >
          <span className="text-gray800">{t("Home")}</span>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
