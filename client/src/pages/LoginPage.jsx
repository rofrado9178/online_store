import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { loginUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const loginUser = useSelector((state) => state.userLogin);
  const { error, loading, user } = loginUser;

  const login = (event) => {
    event.preventDefault();
    console.log("user", user);
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user, redirect]);

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={login}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="dark" className="rounded my-4">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            <p>start here</p>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
