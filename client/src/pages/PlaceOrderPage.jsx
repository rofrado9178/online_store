import { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import CustomButton from "../components/CustomButton";

const PlaceOrderPage = () => {
  const cart = useSelector((state) => state.cart);
  const province = cart.shippingAddress.province.toLowerCase();

  const whatProvince = (price, name) => {
    let taxByProvince;
    switch (name) {
      case "alberta":
        return (taxByProvince = 0.05 * price);

      case "british columbia":
      case "manitoba":
        return (taxByProvince = 0.12 * price);

      case "new brunswick":
      case "newfoundland and labrador":
      case "nova scotia":
      case "prince edward island":
      case "quebec":
        return (taxByProvince = 0.15 * price);

      case "nortwest territories":
      case "nunavut":
      case "yukon":
        return (taxByProvince = 0.05 * price);

      case "saskatchewan":
        return (taxByProvince = 0.11 * price);

      default:
        return (taxByProvince = 0);
    }
  };

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;

  cart.taxPrice = whatProvince(cart.itemsPrice, province);

  cart.totalPrice = Number(cart.itemsPrice) + Number(cart.taxPrice);

  const placeOrder = () => {
    console.log("placeOrder");
  };

  return (
    <section>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Items</h2>
              {!cart.cartItems.length ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col sm={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            rounded
                            className="cart-img"
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} X ${item.price} = $
                          {(item.quantity * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Item: </Col>
                  <Col>$ {cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>$ {cart.shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col>$ {cart.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total: </Col>
                  <Col>$ {cart.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <CustomButton
                  onClick={() => placeOrder()}
                  disabled={!cart.cartItems}
                >
                  Place Order
                </CustomButton>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default PlaceOrderPage;
