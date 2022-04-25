import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    products: [],
  });

  useEffect(() => {
    Promise.all([axios.get("http://localhost:8000/api/products/")]).then(
      (all) => {
        const [products] = all;
        setState((prev) => ({ ...prev, products: products.data }));
      }
    );
  }, []);

  return { state, setState };
};

export default useApplicationData;
