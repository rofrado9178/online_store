import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import Rating from "../components/Rating";
import { useParams } from "react-router-dom";

const ProductPage = (props) => {
  const { id } = useParams();
  const product = props.products.find((product) => id === product.id);
  const { image, name, description, totalReview, rating, price, stock, brand } =
    product;
  console.log(product);
  return (
    <article>
      <Link to="/" className="card-title">
        Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={image} alt={name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{name}</h3>
              <p className="brand">Brand: {brand}</p>
              <Rating rating={rating} />
              <p>{totalReview} reviews</p>
            </ListGroup.Item>
            <ListGroup.Item className="product-price">
              Price: ${price}
            </ListGroup.Item>
            <ListGroup.Item>
              <p>Description:</p>
              <p>{description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price: <strong>${price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    {stock > 0 ? (
                      <strong className="in-stock">In Stock</strong>
                    ) : (
                      <strong className="out-of-stock">Out of Stock</strong>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <style type="text/css">
                    {`
                        .btn-custom {
                        background-color: #ffa41c;
                        color: white;
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
                    disabled={stock === 0}
                    variant="custom"
                  >
                    Add to Cart
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </article>
  );
};

export default ProductPage;
