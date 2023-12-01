import { Radio, Tooltip } from "antd";
import InfoIcon from "components/svgs/InfoIcon";
import { USER_ROLE_OPTIONS } from "scripts/constants";
import { emptyFunction } from "scripts/helpers";

const UserRole = ({ value, onChange = emptyFunction }: any) => {
  const userRoleOptions = Object.values(USER_ROLE_OPTIONS);

  return (
    <div className="flex flex-row">
      {userRoleOptions?.map(
        (
          item: { label: string; value: string; description?: string },
          index: number
        ) => {
          return (
            <Radio
              key={index}
              onChange={() => onChange(item.value)}
              checked={value === item.value}
            >
              <div className="inline-flex items-center gap-1">
                <span className="sm_body_b2_reg">{item.label}</span>
                <Tooltip title={item?.description}>
                  <InfoIcon />
                </Tooltip>
              </div>
            </Radio>
          );
        }
      )}
    </div>
  );
};

export default UserRole;
