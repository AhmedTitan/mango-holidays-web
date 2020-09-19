import React, { useState, useEffect } from "react";
import moment from "moment";

import { Row, Col, Card, Form } from "antd";
import { createReservation, fetchRoomAvailability } from "./../../../service";
import InputField from "../../../../components/common/InputField";
import CommonRangePicker from "../../../../components/common/CommonRangePicker";
import RadioGroup from "../../../../components/common/RadioGroup";
import FormCheckBox from "../../../../components/common/FormCheckBox";
import FormTimePicker from "../../../../components/common/FormTimePicker";
import FormSubmit from "../../../../components/common/FormSubmit";
import { getDatesBetween } from "../../../../components/functions/functions";

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
  const [visible, setVisible] = useState();
  const [disabledDateArray, setDisabledDateArray] = useState([]);

  const [form] = Form.useForm();

  const handleDateChange = (e) => {
    const allSelectedDates = getDatesBetween(
      moment(e?.[0]).format("YYYY-MM-DD"),
      moment(e?.[1]).format("YYYY-MM-DD")
    );
    let invalidDate = false;
    allSelectedDates.forEach((current) => {
      !invalidDate &&
        (invalidDate = disabledDateArray.some(
          (date) =>
            moment(date).format("YYYY-MM-DD") ===
            moment(current).format("YYYY-MM-DD")
        ));
    });
    if (invalidDate) {
      alert("Selected Date range");
      form.setFieldsValue({
        ...form.getFieldValue(),
        Date: null,
      });
    } else {
      setStartDate(moment(e?.[0]).format("YYYY-MM-DD"));
      setEndDate(moment(e?.[1]).format("YYYY-MM-DD"));
    }
  };

  useEffect(() => {
    fetchRoomDisableDates();
  }, [selectedRoom.id]);

  const fetchRoomDisableDates = async () => {
    setDisabledDateArray(await fetchRoomAvailability(selectedRoom.id));
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
          totalAmount,
        },
      };
      try {
        console.log(payload);
        const responseMessage = await createReservation(payload, token);
        alert(responseMessage);
        clearFelds();
        fetchRoomDisableDates();
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Please sign in before making a booking");
    }
    try {
    } catch (error) {}
  };

  const clearFelds = () => {
    form.resetFields();
    form.setFieldsValue({
      ...form.getFieldValue(),
      pricingOption: "Bed & Breakfast",
      paymentMethod: "online",
    });
    setPaymentMethod("online");
    settotalAmount(selectedRoom.BB);
    setStartDate(null);
    setEndDate(null);
    setParkingSlot(false);
    setspecialNote(null);
    setCardName(null);
    setCardNumber(null);
    setMonth(null);
    setYear(null);
    setCvc(null);
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

  const showModal = () => {
    const token = localStorage.getItem("JWT");
    if (token) {
      setVisible(true);
    } else {
      alert("Please sign in before making a booking");
    }
  };

  const handleOk = (e) => {
    setVisible(false);
    onFinish();
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const reservationSection = (
    <Form
      {...layout}
      form={form}
      name="nest-messages"
      onFinish={showModal}
      validateMessages={validateMessages}
      style={{
        maxWidth: "600px",
        textAlign: "left",
        paddingRight: "100px",
      }}
    >
      <CommonRangePicker
        name={["Date"]}
        label="Name"
        rules={[{ required: true }]}
        onChange={handleDateChange}
        disabledDateArray={disabledDateArray}
      />
      <RadioGroup
        name={["pricingOption"]}
        label="Pricing Option"
        defaultValue={"Bed & Breakfast"}
        onChange={handlePricingOption}
        fields={["Bed & Breakfast", "Half-Board", "Full-Board"]}
      />
      <FormCheckBox
        name={["parkingSlot"]}
        label="Parking slot needed"
        onChange={(e) => setParkingSlot(e.target.checked)}
      />
      <InputField
        name={["specialNote"]}
        rules={[{ required: true }]}
        label="Special Note"
        onChange={(e) => setspecialNote(e.target.value)}
      />
      <FormTimePicker
        name={["checkInTime"]}
        label="Check-in time"
        onChange={(e) => setCheckInTime(moment(e).format("HH:mm"))}
        defaultValue={moment("13:00", format)}
        format={format}
      />
      <RadioGroup
        name={["paymentMethod"]}
        label="Payment method"
        rules={[{ required: true }]}
        onChange={(e) => setPaymentMethod(e.target.value)}
        defaultValue="online"
        fields={["online", "via credit card", "cash payments"]}
      />
      {paymentMethod == "online" && (
        <InputField
          name={["cardName"]}
          visible={paymentMethod == "online"}
          label="Card Name"
          onChange={(e) => setspecialNote(e.target.value)}
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
      )}
      {paymentMethod == "online" && (
        <InputField
          name={["cardNumber"]}
          rules={[{ required: true }]}
          label="Card Number"
          onChange={(e) => setspecialNote(e.target.value)}
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      )}
      {paymentMethod == "online" && (
        <InputField
          name={["month"]}
          rules={[{ required: true }]}
          label="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      )}
      {paymentMethod == "online" && (
        <InputField
          name={["year"]}
          rules={[{ required: true }]}
          label="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      )}
      {paymentMethod == "online" && (
        <InputField
          name={["cvc"]}
          rules={[{ required: true }]}
          label="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
        />
      )}
      <FormSubmit
        wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
        title="Booking confirmation"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        totalAmount={totalAmount}
      />
    </Form>
  );

  return (
    <>
      <br />
      <br />
      <Row>
        <Col span={12}>
          <Card title="Discription" style={{ width: 300, margin: "auto" }}>
            <p>Room Name: {<h2>{selectedRoom.roomName}</h2>}</p>
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
