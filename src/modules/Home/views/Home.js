import { Propertycard } from "./../components/PropertyCard";
import React, { Component, useEffect, useState } from "react";
import { getProperty } from "./../../service";
import { Row, Col } from "antd";
import { Typography } from "antd";

const { Title } = Typography;

export function Home() {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setProperties(await getProperty());
  };
  return (
    <>
      <Row>
        <Col style={{ display: "flex" }} span={24}>
          <div style={{ margin: "auto"}}>
            <Title>Welcome to MangoHolidays booking system.</Title>
          </div>
          <img src="./favicon.ico" />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Row>
            {properties &&
              properties.map((property) => (
                <Col span={8} key={property.id}>
                  <Propertycard property={property} />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </>
  );
}
