import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { registerUser } from "../actions/userActions";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, user } = userRegister;

  const register = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords does not match!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    dispatch(registerUser(first_name, last_name, email, password));

    if (error) {
      setTimeout(() => {
        setMessage("User Already Exists");
      }, 300);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user, redirect, navigate]);

  return (
    <section>
      <FormContainer>
        <h1>Register</h1>
        {message && <Message variant="danger">{message}</Message>}
        {loading && <Loading />}
        <Form onSubmit={register}>
          <Form.Group controlId="firs_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="first_name"
              placeholder="First Name"
              value={first_name}
              onChange={(event) => setFirstName(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="last_name"
              placeholder="Last Name"
              value={last_name}
              onChange={(event) => setLastName(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="dark" className="rounded my-4">
            Sign Up
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Have an account?
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              <p>Sign In</p>
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </section>
  );
};

export default RegisterPage;
