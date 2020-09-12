import React, { Component } from "react";
import { Card, Col, Row } from "antd";
import { useHistory } from "react-router-dom";

export function Roomcard({ room }) {
  return (
    <>
      <Col span={8}>
        <Card
          headStyle={{ backgroundColor: "#404a46", color: "white" }}
          title={room.roomName}
          bordered={false}
        >
          <h3>Number of Guests: {room.numberOfGuests}</h3>
          <h3>Amenities: {room.amenities}</h3>
        </Card>
      </Col>
    </>
  );
}
