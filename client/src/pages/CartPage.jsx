import { useEffect } from "react";
import { Link } from "react-bootstrap";
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

const CartPage = () => {
  const { id } = useParams();

  const location = useLocation().search.split("=")[1];
  const quantity = location ? Number(location) : 1;
  const cart = useSelector((state) => state.cart.cartItems);
  console.log("this is cart", cart);

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, quantity));
    }
  }, [dispatch, id, quantity]);
};

export default CartPage;
