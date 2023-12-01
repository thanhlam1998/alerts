import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import ColumInfo from "components/ColumInfo/ColumInfo";
import Input from "components/Input/Input";
import Search from "components/svgs/Search";
import useOnClickOutside from "hooks/useClickOutside";
import useOnChangeFilter from "hooks/useOnChangeFilter";
import useSearchParams from "hooks/useSearchParams";
import { ISearchItem, ISearchObjectResult } from "interfaces/graph";
import { isEmpty } from "lodash";
import { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { convertToDisplay } from "scripts/helpers";

const SearchNode = ({
  dataSearch,
  onSelectNode,
  onSearching = false,
}: {
  dataSearch: ISearchObjectResult;
  onSelectNode: (it: ISearchItem) => void;
  onSearching: boolean;
}) => {
  const wrapperRef = useRef(null);
  const QUERY_DATA = useSearchParams();
  const onChangeFilter = useOnChangeFilter();

  const [isShowSearchResult, setIsShowSearchResult] = useState(false);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    if (!!searchText && dataSearch?.total) {
      setIsShowSearchResult(true);
    }
  }, [searchText, dataSearch?.searchItems]);

  useOnClickOutside(wrapperRef, () => {
    setIsShowSearchResult(false);
  });

  const { t } = useTranslation();

  const renderHighlight = (text: string) => {
    const index = text
      ?.toLocaleLowerCase()
      .indexOf(searchText?.toLocaleLowerCase());
    if (index === -1) return text;

    const first = text?.substring(0, index);
    const highlight = text?.substring(index, index + searchText.length);
    const last = text?.substring(index + searchText.length);

    return (
      <div>
        {first}
        <span className="text-blue500">{highlight}</span>
        {last}
      </div>
    );
  };

  const renderSearchResult = (searchData: ISearchObjectResult) => {
    if (isEmpty(searchData)) return <></>;
    const { total, searchItems } = searchData ?? {};

    return (
      <div
        ref={wrapperRef}
        style={{
          boxShadow:
            "0px 2px 8px rgba(40, 41, 61, 0.08), 0px 12px 32px rgba(96, 97, 112, 0.24)",
        }}
        className="absolute left-0 w-[640px] z-[100] bg-white rounded"
      >
        <div className="p-4 sm_body_b1_reg">
          {!total ? (
            t("No result found")
          ) : total > 1 ? (
            <Trans
              defaults="{{number}} results found"
              values={{ number: total }}
            />
          ) : (
            <Trans
              defaults="{{number}} result found"
              values={{ number: total }}
            />
          )}
        </div>
        <div className="max-h-[350px] overflow-auto">
          {searchItems?.map((it: ISearchItem, index: number) => (
            <div
              key={index}
              onClick={() => {
                onSelectNode(it);
                setIsShowSearchResult(false);
              }}
              className="grid grid-cols-4 py-2 border-0 border-t-[1px] border-t-gray200 border-solid p-4 cursor-pointer gap-4 text-ellipsis"
            >
              <ColumInfo label={t("CIF")} value={renderHighlight(it?.cif)} />
              <ColumInfo
                label={t("Account #")}
                value={renderHighlight(it?.accountNumber)}
              />
              <ColumInfo
                label={t("Account Name")}
                value={renderHighlight(it?.accountName)}
              />
              <ColumInfo
                label={t("# of Connections")}
                value={convertToDisplay(it?.numOfConnections)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const onSearchEnterPress = () => {
    onChangeFilter({
      ...QUERY_DATA,
      searchText,
    });
  };

  return (
    <div className="relative search-node">
      <Input
        onFocus={() => setIsShowSearchResult(true)}
        value={searchText}
        onChange={(e) => setSearchText(e?.target?.value)}
        className="mr-2 w-[280px]"
        placeholder={t("Search object to add to the graph")}
        suffix={
          onSearching ? (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 12 }} spin />}
            />
          ) : (
            <Search />
          )
        }
        onPressEnter={onSearchEnterPress}
      />
      {isShowSearchResult && renderSearchResult(dataSearch)}
    </div>
  );
};

export default SearchNode;
