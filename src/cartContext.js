import React, { useReducer, useEffect, useContext } from "react";
import cartReducer from "./cartReducer";

export const CartContext = React.createContext(null);

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.error("The cart could not be parsed into JSON.");
  initialCart = [];
}

export function CartProvider(props) {
    const [cart, dispatch] = useReducer(cartReducer, initialCart);
    useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

    const contextValue = {
        cart,
        dispatch,
    }
    
    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    );
}

export function useCartContext() {
    const context = useContext(CartContext);
    if (!context) throw Error("useCartContext must be used within a provider. Wrap the parent component in <CartProvider> to fix this error.")
    return context;
}