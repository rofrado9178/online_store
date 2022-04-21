import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = (props) => {
  console.log(props);
  const {
    id,
    name,
    image,
    description,
    brand,
    category,
    price,
    rating,
    stock,
    totalReview,
  } = props;
  return (
    <Card className="my-card my-3 p-3 rounded">
      <a href={`/product/${id}`}>
        <Card.Img className="product-img" src={image} />
      </a>
      <Card.Body>
        <a href={`/product/${id}`}>
          <Card.Title>
            <strong>{name}</strong>
          </Card.Title>
        </a>
        <Card.Text>{description}</Card.Text>
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
