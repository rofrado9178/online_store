import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstatns";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const currentItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product === currentItem
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product === existingItem ? currentItem : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, currentItem],
      };

    case CART_REMOVE_ITEM:
      const removeItem = state.cartItems.filter(
        (item) => item.product !== currentItem
      );
      return {
        ...state,
        cartItems: [...removeItem],
      };

    default:
      return state;
  }
};
