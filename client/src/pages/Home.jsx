import mockData from "../mockData";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
// import axios from "axios";
// import { useEffect, useState } from "react";

const Home = () => {
  const products = mockData.map((product) => {
    return (
      <Col sm={12} md={6} lg={4} xl={3} key={product.id}>
        <Product {...product} />
      </Col>
    );
  });

  return (
    <article>
      <Row>{products}</Row>
    </article>
  );
};

export default Home;
