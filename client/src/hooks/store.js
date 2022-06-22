import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productListReducer,
} from "../reducers/productReducers";
import { cartReducer } from "../reducers/cartReducers";
import {
  userLoginReducers,
  userRegisterReducers,
  userProfileReducers,
  updateProfileReducers,
} from "../reducers/userReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  userProfile: userProfileReducers,
  updateProfile: updateProfileReducers,
});

const cartFromLocalStorage = localStorage.getItem("carts")
  ? JSON.parse(localStorage.getItem("carts"))
  : [];

const userFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartFromLocalStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { user: userFromLocalStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
