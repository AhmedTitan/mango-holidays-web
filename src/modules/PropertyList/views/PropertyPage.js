import { Researveroomcard } from "./components/ResearveRoomCard";
import React, { Component, useEffect, useState } from "react";
import { Roomcard } from "./components/RoomCard";
import { getRoomsByProperty } from "./../../service";
import { Card, Col, Row } from "antd";

export function PropertyPage(props) {
  const { propertyId } = props.match.params;
  const [rooms, setRooms] = useState();
  const [selectedRoom, setselectedRoom] = useState();
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setRooms(await getRoomsByProperty(propertyId));
  };
  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {rooms &&
            rooms.map((room) => (
              <Roomcard setselectedRoom={setselectedRoom} room={room} />
            ))}
        </Row>

        {selectedRoom && <Researveroomcard selectedRoom={selectedRoom} />}
      </div>
      ,
    </>
  );
}
