import React, { Component } from "react";
import { Card } from "antd";

const { Meta } = Card;
const gridStyle = {
    textAlign: 'center',
    width: 400, height:300,
    margin: 'auto'
  };

export function Propertycard({ property }) {
  return (
      <Card
        // onClick={}
        hoverable
        style={gridStyle}
        cover={
          <img
            alt="Hotel pic"
            style={{ height: "200px" }}
            src={property.imageUrl}
          />
        }
      >
        <Meta title={property.propertyName} description={property.place} />
      </Card>
  );
}
