import { Alert } from "react-bootstrap";
const Error = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Error;
