import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";

const ShippingPage = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [province, setProvince] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const addShipping = () => {};

  return (
    <FormContainer>
      <h1>Shipping Details</h1>
      <Form onSubit={addShipping}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Address"
            value={address ? address : ""}
            onChange={(event) => setAddress(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter City"
            value={city ? city : ""}
            onChange={(event) => setCity(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode ? postalCode : ""}
            onChange={(event) => setPostalCode(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group
          controlId="
        province"
        >
          <Form.Label>Province</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Province"
            value={province ? province : ""}
            onChange={(event) => setProvince(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter Phone Number"
            value={phoneNumber ? phoneNumber : ""}
            onChange={(event) => setPhoneNumber(event.target.value)}
          ></Form.Control>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
