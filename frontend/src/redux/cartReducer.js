const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  count: 1
};

export const cartReducer = (state = initialState, action) => {

  switch (action.type) {
    // Case for adding an item to the cart successfully
    case "ADD_TO_CART_SUCCESS":
      // Update the cart in state and localStorage
      const updatedCart = [...state.cart, action.payload];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return {
        ...state,
        cart: updatedCart
      };

    // Case for removing an item from the cart
    case "REMOVE_FROM_CART":
      // Filter out the item with the specified id from the cart and update localStorage
      const filteredCart = state.cart.filter(cartItem => cartItem.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(filteredCart));
      return {
        ...state,
        cart: filteredCart
      };

    // Case for incrementing the quantity of an item in the cart
    case "INCREMENT_QUANTITY":
      // Update the quantity of the specified item in the cart and localStorage
      const incrementedCart = state.cart.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      localStorage.setItem("cart", JSON.stringify(incrementedCart));

      return {
        ...state,
        cart: incrementedCart,
      };

    // Case for decrementing the quantity of an item in the cart
    case "DECREMENT_QUANTITY":
      // Update the quantity of the specified item in the cart and localStorage, ensuring it doesn't go below 1
      const decrementedCart = state.cart.map((item) =>
        item.id === action.payload
          ? {
            ...item,
            quantity: Math.max(1, item.quantity - 1),
          }
          : item
      );

      localStorage.setItem("cart", JSON.stringify(decrementedCart));

      return {
        ...state,
        cart: decrementedCart,
      };

    // Case for resetting the entire cart
    case "RESET_CART":
      // Remove cart items from localStorage and reset the cart in state to an empty array
      localStorage.removeItem("cart");
      return {
        ...state,
        cart: []
      };



    default:
      return state;
  }
};
