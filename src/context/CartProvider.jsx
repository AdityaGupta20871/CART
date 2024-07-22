import React, { useContext, useReducer, createContext } from 'react';
import { faker } from '@faker-js/faker';
import { cartReducer, productReducer } from './CartReducer';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    faker.seed(99);
    const products = [...Array(20)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        image: faker.image.imageUrl(null, null, null, true, 'unsplash'),
    }));

    const [productState, productDispatch] = useReducer(productReducer, {
        searchQuery: "",
    });

    const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: []
    });

    return (
        <CartContext.Provider value={{ state, dispatch, productState, productDispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

export const CartState = () => {
    return useContext(CartContext);
};
