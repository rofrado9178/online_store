import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { detailProduct } from "../actions/productActions";

const ProductPage = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetails;

  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    dispatch(detailProduct(id));
  }, [dispatch, id, product.image]);

  const productImage = (
    <Image key={product.id} src={product.image} alt={product.name} fluid />
  );

  const options = [...Array(product.stock).keys()].map((stock) => {
    return (
      <option key={stock + 1} value={stock + 1}>
        {stock + 1}
      </option>
    );
  });

  const addToCart = () => {
    navigate(`/cart/${id}?/qty=${qty}`);
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <Error>{error}</Error>
  ) : (
    product.id === Number(id) && (
      <article>
        <Link to="/" className="card-title">
          Back
        </Link>
        <Row>
          <Col md={6}>{productImage}</Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
                <p className="brand">Brand: {product.brand}</p>
                <Rating rating={product.rating} />
                <p>{product.totalReview} reviews</p>
              </ListGroup.Item>
              <ListGroup.Item className="product-price">
                Price: ${product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                <p>Description:</p>
                <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Price: <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      {product.stock > 0 ? (
                        <strong className="in-stock">In Stock</strong>
                      ) : (
                        <strong className="out-of-stock">Out of Stock</strong>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.stock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col xs="auto" className="my-1">
                        <Form.Select
                          size="sm"
                          value={qty}
                          onChange={(event) => setQty(event.target.value)}
                        >
                          {options}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
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
                      disabled={product.stock === 0}
                      variant="custom"
                      onClick={addToCart}
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
    )
  );
};

export default ProductPage;
