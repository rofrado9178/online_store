import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <article className="loading">
      <aside className="spinner">
        <Spinner animation="border" role="status" className="loading-spinner">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <h1 className="loading-spinner" animation="grow">
          Loading...
        </h1>
      </aside>
    </article>
  );
};

export default Loading;
