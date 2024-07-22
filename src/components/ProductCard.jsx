import React from 'react';
import '../styles/ProductCard.css';
import { CartState } from '../context/CartProvider';

const ProductCard = ({ item }) => {
    const {
        state: { cart },
        dispatch,
    } = CartState();

    return (
        <div className="card">
            <div className="card-header">
                <img src={item.image} alt={item.name} />
            </div>
            <div className="card-body">
                <h4>{item.name}</h4>
                <span>INR {item.price}</span>
                {cart.some((p) => p.id === item.id) ? (
                    <button
                        className='remove'
                        onClick={() =>
                            dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: item,
                            })
                        }
                    >
                        Remove from Cart
                    </button>
                ) : (
                    <button
                        className='add'
                        onClick={() =>
                            dispatch({
                                type: "ADD_TO_CART",
                                payload: item,
                            })
                        }
                    >
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
