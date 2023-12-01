import Button from "components/Button";
import Input from "components/Input";
import Search from "components/svgs/Search";
import Select from "components/Select";
import { DatePicker, Form } from "antd";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface AlertQueueFilterProps {
  data: any;
}
const AlertsQueueFilter: FC<AlertQueueFilterProps> = ({ data }) => {
  const { t } = useTranslation();

  const { fraudTaggingFilter, statusFilter, priorityFilter } = useMemo(() => {
    return data.reduce(
      (acc: any, curr: any) => {
        curr?.fraudTagging && acc.fraudTaggingFilter.add(curr.fraudTagging);
        curr?.status && acc.statusFilter.add(curr.status);
        curr?.priority && acc.priorityFilter.add(curr.priority);
        return acc;
      },
      {
        fraudTaggingFilter: new Set(),
        statusFilter: new Set(),
        priorityFilter: new Set(),
      }
    );
  }, [data]);

  const handleFinish = (values: any) => {};

  return (
    <Form layout="vertical" className="flex justify-between gap-4 items-center" onFinish={handleFinish}>
      <div className="flex gap-4 items-end flex-1 flex-wrap">
        <Form.Item name="search" label={t("Search")} className="!mb-0">
          <Input
            placeholder={t("Search...")}
            suffix={<Search className="w-[14px] h-[14px]" />}
            id="search-input"
            name="search"
            allowClear
          />
        </Form.Item>

        <Form.Item name="status" label={t("Status")} className="!mb-0">
          <Select
            placeholder={t("Select an option")}
            maxTagCount={"responsive"}
            allowClear
            multiple
            options={Array.from(statusFilter).map((item: any) => ({ label: item, value: item }))}
          />
        </Form.Item>

        <Form.Item name="tag" label={t("Tag")} className="!mb-0">
          <Select
            placeholder={t("Select an option")}
            maxTagCount={"responsive"}
            allowClear
            multiple
            options={Array.from(fraudTaggingFilter).map((item: any) => ({ label: item, value: item }))}
          />
        </Form.Item>

        <Form.Item name="priority" label={t("Priority")} className="!mb-0">
          <Select
            placeholder={t("Select an option")}
            maxTagCount={"responsive"}
            allowClear
            multiple
            options={Array.from(priorityFilter).map((item: any) => ({ label: item, value: item }))}
          />
        </Form.Item>

        <Form.Item name="assignedTo" label={t("Assigned to")} className="!mb-0">
          <Select placeholder={t("Select an option")} />
        </Form.Item>

        <Form.Item name="dateRange" label={t("Date Range")} className="!mb-0">
          <DatePicker.RangePicker className="bg-gray50 border-gray200" />
        </Form.Item>
      </div>
      <Button htmlType="submit" type="primary">
        {t("Search")}
      </Button>
    </Form>
  );
};

export default AlertsQueueFilter;
