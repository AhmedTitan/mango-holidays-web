import React, { Component, useState } from "react";
import moment from "moment";

import { Form, Input, TimePicker, Button } from "antd";
import { Row, Col, Card, Radio, DatePicker, Space, Checkbox } from "antd";
import { createReservation } from "./../../../service";

const { RangePicker } = DatePicker;

const validateMessages = {
  required: "required!",
  types: {
    email: "${label} is not validate email!",
    number: "number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const format = "HH:mm";

export function Researveroomcard({ selectedRoom }) {
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [pricingOption, setPricingOption] = useState("Bed & Breakfast");
  const [parkingSlot, setParkingSlot] = useState(false);
  const [checkInTime, setCheckInTime] = useState(moment().format("HH:mm"));
  const [specialNote, setspecialNote] = useState();
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [cardName, setCardName] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [cvc, setCvc] = useState();
  const [totalAmount, settotalAmount] = useState(22);

  const handleDateChange = (e) => {
    setStartDate(moment(e[0]).format("YYYY-MM-DD"));
    setEndDate(moment(e[1]).format("YYYY-MM-DD"));
  };

  const onFinish = async (values) => {
    const token = localStorage.getItem("JWT");
    if (token) {
      const payload = {
        reservationDetails: {
          roomId: selectedRoom.id,
          startDate: startDate,
          endDate: endDate,
          parkingSlot: parkingSlot,
          checkInTime: checkInTime,
          specialNote: specialNote,
          pricingOption: pricingOption,
        },
        paymentDetails: {
          paymentMethod: paymentMethod,
          cardName: cardName,
          cardNumber: cardNumber,
          month: month,
          year: year,
          cvc: cvc,
          totalAmount
        },
      };
      try {
        console.log(payload);
        const responseMessage = await createReservation(payload, token);
        alert(responseMessage);
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Please sign in before making a booking");
    }
    try {
    } catch (error) {}
  };

  const handlePricingOption = (e) => {
    switch (e.target.value) {
      case "Half-Board":
        settotalAmount(selectedRoom.HB);
        break;
      case "Full-Board":
        settotalAmount(selectedRoom.FB);
        break;
      case "Bed & Breakfast":
        settotalAmount(selectedRoom.BB);
        break;

      default:
        settotalAmount(selectedRoom.BB);
        break;
    }
    setPricingOption(e.target.value);
  };

  const reservationSection = (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      style={{
        maxWidth: "600px",
        textAlign: "left",
        paddingRight: "100px",
      }}
    >
      <Form.Item name={["Date"]} label="Name" rules={[{ required: true }]}>
        <RangePicker onChange={handleDateChange} />
      </Form.Item>
      <Form.Item name={["pricingOption"]} label="Email">
        <Radio.Group
          defaultValue="Bed & Breakfast"
          buttonStyle="solid"
          onChange={handlePricingOption}
        >
          <Radio.Button
            selected
            value="Bed & Breakfast"
          >{`Bed & Breakfast`}</Radio.Button>
          <Radio.Button value="Half-Board">Half-Board</Radio.Button>
          <Radio.Button value="Full-Board">Full-Board</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item name={["parkingSlot"]} label="Parking slot needed">
        <Checkbox onChange={(e) => setParkingSlot(e.target.checked)}></Checkbox>
      </Form.Item>
      <Form.Item
        name={["specialNote"]}
        label="Special Note"
        onChange={(e) => setspecialNote(e.target.value)}
      >
        <Input />
      </Form.Item>
      <Form.Item name={["checkInTime"]} label="Check-in time">
        <TimePicker
          onChange={(e) => setCheckInTime(moment(e).format("HH:mm"))}
          defaultValue={moment("13:00", format)}
          format={format}
        />
      </Form.Item>
      <Form.Item name={["confirmPassword"]} label="Payment method">
        <Radio.Group
          onChange={(e) => setPaymentMethod(e.target.value)}
          defaultValue="online"
          buttonStyle="solid"
        >
          <Radio.Button selected value="online">
            online
          </Radio.Button>
          <Radio.Button value="via credit card">via credit card</Radio.Button>
          <Radio.Button value="cash payments">cash payments</Radio.Button>
        </Radio.Group>
      </Form.Item>
      {paymentMethod == "online" && (
        <>
          <Form.Item rules={[{ required: true }]} label="Card Name">
            <Input onChange={(e) => setCardName(e.target.value)} />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} label="Card Number">
            <Input onChange={(e) => setCardNumber(e.target.value)} />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} label="Month">
            <Input onChange={(e) => setMonth(e.target.value)} />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} label="Year">
            <Input onChange={(e) => setYear(e.target.value)} />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} label="CVC">
            <Input onChange={(e) => setCvc(e.target.value)} />
          </Form.Item>
        </>
      )}
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <>
      <br />
      <br />
      <Row>
        <Col span={12}>
          <Card
            title="Default size card"
            style={{ width: 300, margin: "auto" }}
          >
            <p>Room Name: {selectedRoom.roomName}</p>
            <p>Number of guest: {selectedRoom.numberOfGuests}</p>
            <p>Amenities: {selectedRoom.amenities}</p>
            <h3>Pricing option</h3>
            <p>
              {"Bed & Breakfast:"} {`$${Number(selectedRoom.BB).toFixed(2)}`}
            </p>
            <p>Half-Board: {`$${Number(selectedRoom.HB).toFixed(2)}`}</p>
            <p>Full-Board: {`$${Number(selectedRoom.FB).toFixed(2)}`}</p>
          </Card>
        </Col>
        <Col span={12}>{reservationSection}</Col>
      </Row>
    </>
  );
}
