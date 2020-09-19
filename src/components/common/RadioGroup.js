import React from "react";
import { Form, Radio } from "antd";

const RadioGroup = ({
  name,
  label,
  rules,
  defaultValue,
  onChange,
  fields,
  isDisabled = false,
}) => {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Radio.Group
        defaultValue={defaultValue}
        buttonStyle="solid"
        onChange={onChange}
      >
        {fields?.map((field, index) => {
          return index === 0 ? (
            <Radio.Button defaultValue value={field}>
              {field}
            </Radio.Button>
          ) : (
            <Radio.Button value={field}>{field}</Radio.Button>
          );
        })}
      </Radio.Group>
    </Form.Item>
  );
};

export default RadioGroup;
