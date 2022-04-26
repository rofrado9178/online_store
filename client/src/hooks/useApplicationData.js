import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    products: [],
    isReady: false,
  });

  useEffect(() => {
    Promise.all([axios.get("/api/products")]).then((all) => {
      const [products] = all;
      setState((prev) => ({ ...prev, products: products.data, isReady: true }));
    });
  }, []);

  return { state, setState };
};

export default useApplicationData;
