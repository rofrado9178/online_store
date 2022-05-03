import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart } from "../actions/cartActions";
import { useLocation, useParams } from "react-router-dom";
import Message from "../components/Message";

const CartPage = () => {
  const { id } = useParams();

  const location = useLocation().search.split("=")[1];
  const quantity = location ? Number(location) : 1;
  const cart = useSelector((state) => state.cart.cartItems);

  const cartItems = cart.map((item) => (
    <ListGroup.Item key={item.product}>
      <Row>
        <Col md={2}>
          <Image
            src={item.image}
            alt={item.name}
            rounded
            className="cart-img"
          />
        </Col>
        <Col md={4}>
          <Link to={`/product/${item.product}`}>{item.name}</Link>
        </Col>
        <Col md={2}>${item.price}</Col>
        <Col xs="auto" className="my-1">
          <Form.Select
            size="sm"
            value={item.quantity}
            onChange={(event) =>
              dispatch(addToCart(item.product, Number(event.target.value)))
            }
          >
            {[...Array(item.stock).keys()].map((qty) => (
              <option key={qty + 1} value={qty + 1}>
                {qty + 1}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>${item.price * item.quantity}</Col>
        <Col md={1}>
          <Button type="button" variant="light">
            <i className="fas fa-trash"></i>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  ));

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, quantity));
    }
  }, [dispatch, id, quantity]);

  return (
    <Row>
      <Col md={8}>
        <h1>Shoping Cart</h1>
        {cart.length === 0 ? (
          <Message variant="dark">
            <p>Your cart is empty!</p>
            <Link to="/">
              <p>Back to home</p>
            </Link>
          </Message>
        ) : (
          <ListGroup variant="flush">{cartItems}</ListGroup>
        )}
      </Col>
    </Row>
  );
};

export default CartPage;
