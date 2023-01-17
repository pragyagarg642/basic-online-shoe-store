export default function cartReducer(cart, action) {
    switch (action.type) {
        case "empty":
            return [];
        case "add": {
            const { id, sku } = action;
            const isInCart = cart.find((i) => i.sku === sku);
            if (isInCart)
                return cart.map((i) => i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i);
            return [...cart, { id, sku, quantity: 1 }];
        }
        case "updateQuantity":
            const { sku, quantity } = action;
            return quantity === 0 ?
                cart.filter((i) => i.sku !== sku) :
                cart.map((i) => i.sku === sku ? { ...i, quantity: quantity } : i);
        default:
            throw new Error("Unhandled action: " + action.type);
    }
}