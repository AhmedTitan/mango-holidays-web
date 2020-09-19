import React from "react";
import { Form, Checkbox } from "antd";

const FormCheckBox = ({
  name,
  label,
  rules,
  onChange,
  isDisabled = false,
}) => {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Checkbox onChange={onChange}></Checkbox>
    </Form.Item>
  );
};

export default FormCheckBox;