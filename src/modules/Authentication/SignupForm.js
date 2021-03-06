import React from "react";
import { signup } from "./../service";
import { useHistory } from "react-router-dom";

import { Form, Input, InputNumber, Button } from "antd";
import { Row, Col } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};



const Signupform = (props) => {
    const history = useHistory();
    const onFinish = async (values) => {
        console.log(values);
        try {
          const token = await signup(values);
          await localStorage.setItem("JWT", token);
          history.push('/home');
        } catch (error) {
          alert(error.message);
        }
      };
  return (
    <>
      <Row>
        <Col span={24}>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
            style={{ margin: "auto", maxWidth: "600px", textAlign: "left" }}
          >
            <Form.Item
              name={["userName"]}
              label="Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["email"]}
              label="Email"
              rules={[{ type: "email", required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[{ required: true }]}
              name={["contactNumber"]}
              label="Contact Number"
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[{ required: true }]}
              name={["password"]}
              label="password"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["confirmPassword"]}
              label="Confirm Password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Signupform;
