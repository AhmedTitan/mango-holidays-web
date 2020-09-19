import React, { useState, useEffect } from "react";
import { Skeleton, Typography, Card, Avatar, Row, Col } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { cancelBooking } from "../../service";
const { Text } = Typography;

const { Meta } = Card;
export function Bookingcard({
  bookingData,
  cancelSelectedBookingBooking,
  setDeleteId,
}) {
  return (
    <>
      <Card
        style={{ width: "auto", marginTop: 16, textAlign: "left" }}
        actions={bookingData.bookingStatus === "active" ? [
          <CloseCircleOutlined
            key="cancel"
            onClick={() => {
              cancelSelectedBookingBooking();
              setDeleteId(bookingData.id);
            }}
          />,
        ]: null}
      >
        <Row>
          <Col span={12}>
            <Meta
              avatar={<Avatar src={bookingData.room.property.imageUrl} />}
              title={bookingData.room.property.propertyName}
              description={`Room Name: ${bookingData.room.roomName}`}
            />
            <h3>{bookingData.room.amenities}</h3>
          </Col>
          <Col span={12}>
            <h4>{`Parking Slot: ${
              bookingData.parkingSlot ? "Requestd" : "Not requested"
            }`}</h4>
            <h4>{`Pricing Option: ${bookingData.pricingOption}`}</h4>
            <p>
              Booking Status:{" "}
              <Text
                type={
                  bookingData.bookingStatus === "active" ? "success" : "danger"
                }
              >
                {bookingData.bookingStatus}
              </Text>
            </p>
          </Col>
        </Row>
      </Card>
    </>
  );
}
