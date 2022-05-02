import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productListReducer,
} from "../reducers/productReducers";
import { cartReducer } from "../reducers/cartReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  cart: cartReducer,
});

const cartFromLocalStorage = localStorage.getItem("carts")
  ? JSON.parse(localStorage.getItem("carts"))
  : "";

const initialState = {
  cart: { cartItems: cartFromLocalStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
