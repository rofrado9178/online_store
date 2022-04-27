import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  const allProducts = products.map((product) => {
    return (
      <Col sm={12} md={6} lg={4} xl={3} key={product.id}>
        <Product {...product} />
      </Col>
    );
  });

  return (
    <article>
      <Row>{allProducts}</Row>
    </article>
  );
};

export default Home;
