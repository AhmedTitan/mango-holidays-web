import React from "react";
import { Form, Row, Col, Button, Modal } from "antd";

const FormSubmit = ({
  wrapperCol,
  title,
  visible,
  onOk,
  onCancel,
  totalAmount,
}) => {
  return (
    <Form.Item wrapperCol={wrapperCol}>
      <Row>
        <Col span={12}>
          <>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Modal
              title={title}
              visible={visible}
              onOk={onOk}
              onCancel={onCancel}
            >
              <p>Total reservation amount is {totalAmount}. </p>
              <p>Select ok to proceed. </p>
            </Modal>
          </>
        </Col>
        <Col span={12}>
          <h3>Total amount: {totalAmount}</h3>
        </Col>
      </Row>
    </Form.Item>
  );
};

export default FormSubmit;
