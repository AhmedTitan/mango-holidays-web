import React from "react";
import { Form, TimePicker } from "antd";
import moment from "moment";

const FormTimePicker = ({
  name,
  label,
  rules,
  onChange,
  format,
  isDisabled = false,
}) => {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <TimePicker
          onChange={onChange}
          defaultValue={moment("13:00", format)}
          format={format}
        />
    </Form.Item>
  );
};

export default FormTimePicker;