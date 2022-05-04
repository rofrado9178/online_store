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
  Container,
} from "react-bootstrap";
import { addToCart } from "../actions/cartActions";
import { useLocation, useParams } from "react-router-dom";
import Message from "../components/Message";

const CartPage = () => {
  const { id } = useParams();

  const location = useLocation().search.split("=")[1];
  const quantity = location ? Number(location) : 1;
  const cart = useSelector((state) => state.cart.cartItems);

  const deleteFromCart = (id) => {
    return cart.filter((item) => item.id !== id);
  };

  const cartItems = cart.map((item) => (
    <ListGroup.Item key={item.product}>
      <Row className="cart-item">
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
          <Form.Control
            as="select"
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
          </Form.Control>
        </Col>
        <Col md={1}>
          <Button
            type="button"
            variant="light"
            onClick={() => deleteFromCart(item.product)}
          >
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
      <h1>Shoping Cart</h1>
      <Col md={8}>
        {cart.length === 0 ? (
          <Message variant="dark">
            <p>Your cart is empty!</p>
            <Link to="/">
              <p>Back to home</p>
            </Link>
          </Message>
        ) : (
          <ListGroup>{cartItems}</ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup.Item>
            <h2 className="total-items">
              Total Items({cart.reduce((acc, item) => acc + item.quantity, 0)})
            </h2>
            <Row>
              <Col>Subtotal</Col>
              <Col>
                $
                {cart
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <style type="text/css">
              {`
                        .btn-custom {
                        background-color: #ffa41c;
                        color: white;
                        width: 100%;
                        }
                        .btn-custom:hover{
                          background-color:white;
                          color:black;
                          border: 1px solid black;
                        }
                        `}
            </style>
            <Button
              className="rounded-pill btn-sm"
              type="button"
              variant="custom"
            >
              Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
