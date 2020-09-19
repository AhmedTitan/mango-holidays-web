import React from "react";
import { Form, Input } from "antd";

const InputField = ({
  name,
  label,
  rules,
  onChange,
  isDisabled = false,
}) => {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Input disabled={isDisabled} onChange={onChange} />
    </Form.Item>
  );
};

export default InputField;
