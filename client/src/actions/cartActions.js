import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstatns";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.id,
      name: data.name,
      image: data.image,
      price: data.price,
      stock: data.stock,
      quantity,
    },
  });
  localStorage.setItem("carts", JSON.stringify(getState().cart.cartItems));
};
