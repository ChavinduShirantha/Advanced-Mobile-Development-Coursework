import React, {createContext, useState} from 'react';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState(new Map());

  const addToCart = (product, count) => {
    setCartItems(prevCart => {
      const newCart = new Map(prevCart);
      newCart.set(product.id, {...product, count});
      return newCart;
    });
  };

  const removeFromCart = productId => {
    setCartItems(prevCart => {
      const newCart = new Map(prevCart);
      newCart.delete(productId);
      return newCart;
    });
  };

  const incrementQuantity = productId => {
    setCartItems(prevCart => {
      const newCart = new Map(prevCart);
      if (newCart.has(productId)) {
        const item = newCart.get(productId);
        newCart.set(productId, {...item, count: item.count + 1});
      }
      return newCart;
    });
  };

  const decrementQuantity = productId => {
    setCartItems(prevCart => {
      const newCart = new Map(prevCart);
      if (newCart.has(productId)) {
        const item = newCart.get(productId);
        if (item.count > 1) {
          newCart.set(productId, {...item, count: item.count - 1});
        } else {
          newCart.delete(productId);
        }
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCartItems(new Map());
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};
