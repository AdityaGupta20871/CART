import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";
import '../styles/Cart.css'; // Import custom CSS

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate(); // Add useNavigate hook

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  const handleGoHome = () => {
    navigate('/'); // Navigate to home
  };

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-cart-message">Add items to the cart</span>
          <button className="go-home-button" onClick={handleGoHome}>
            Go To Home
          </button>
        </div>
      ) : (
        <>
          <div className="cart-product-container">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-price">₹ {item.price}</span>
                <select
                  className="cart-item-quantity"
                  value={item.qty}
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_CART_QTY",
                      payload: {
                        id: item.id,
                        qty: e.target.value,
                      },
                    })
                  }
                >
                  {[...Array(item.inStock).keys()].map((x) => (
                    <option key={x + 1}>{x + 1}</option>
                  ))}
                </select>
                <button
                  className="cart-item-remove"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: item,
                    })
                  }
                >
                  <AiFillDelete fontSize="40px" height={100} width={100} />
                </button>
              </div>
            ))}
          </div>
          <div className="summary">
            <span className="title">Subtotal ({cart.length}) items</span>
            <span className="total">Total: ₹ {total}</span>
            <button className="checkout-button" disabled={cart.length === 0}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
