import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { userProfile } from "../actions/userActions";

const ProfilePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProfile = useSelector((state) => state.userProfile);
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, profile } = getProfile;
  const { user } = userLogin;
  const name = profile.name.split(" ");

  const updateProfile = () => {};

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!profile || !profile.name) {
      dispatch(userProfile("profile"));
      return;
    }
    setFirstName(name[0]);
    setLastName(name[1]);
    setEmail(profile.email);
  }, [user]);

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {/* {error && <Message variant="danger">{error.message}</Message>} */}
        {loading && <Loading />}
        <Form onSubmit={updateProfile}>
          <Form.Label>Email</Form.Label>
          <p>{email}</p>
          <Form.Group controlId="firs_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="first_name"
              placeholder="First Name"
              value={first_name}
              onChange={(event) => setFirstName(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="last_name"
              placeholder="Last Name"
              value={last_name}
              onChange={(event) => setLastName(event.target.value)}
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
          <Form.Group controlId="password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="dark" className="rounded my-4">
            Update Profile
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfilePage;
