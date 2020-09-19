import React from "react";
import moment from "moment";
import { Form, DatePicker } from "antd";

const { RangePicker } = DatePicker;

const CommonRangePicker = ({
  name,
  label,
  rules,
  onChange,
  disabledDateArray,
  isDisabled = false,
}) => {
  const disabledDate = (current) => {
    const dates =
      (current && current < moment().startOf("day")) ||
      disabledDateArray.some(
        (date) =>
          moment(date).format("YYYY-MM-DD") ===
          moment(current).format("YYYY-MM-DD")
      );
    return dates;
  };
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <RangePicker
        disabledDate={disabledDate}
        isDisabled={isDisabled}
        onChange={onChange}
      />
    </Form.Item>
  );
};

export default CommonRangePicker;
