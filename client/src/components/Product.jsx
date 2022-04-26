import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { id, name, image, price, rating, totalReview } = props;
  return (
    <Card className="my-card my-3 p-3 rounded">
      <Link to={`/product/${id}`}>
        <Card.Img className="product-img" src={image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${id}`} className="card-title">
          <Card.Title>
            <strong>{name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h3">${price}</Card.Text>
        <Card.Text>
          <aside className="my-3">
            <Rating rating={rating} totalReview={totalReview} />
          </aside>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
