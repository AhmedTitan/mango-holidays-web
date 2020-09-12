import React, { Component } from "react";
import { Card } from "antd";
import { useHistory } from "react-router-dom";

const { Meta } = Card;
const gridStyle = {
  textAlign: "center",
  width: 400,
  height: 300,
  margin: "auto",
};

export function Propertycard({ property }) {
  const history = useHistory();
  const redirectPage = (id) => {
    history.push(`/property/${id}`);
  };

  return (
    <Card
      onClick={() => redirectPage(property.id)}
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
