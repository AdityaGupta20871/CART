import React, { useState } from "react";
import '../styles/Header.css';
import { CartState } from "../context/CartProvider";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const Header = () => {
    const [search, setSearch] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const {
        state: { cart },
        dispatch,
        productDispatch,
    } = CartState();
    
    const navigate = useNavigate(); // Add useNavigate hook
    
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleDropdownItemClick = (item) => {
        console.log(`Selected: ${item}`);
        setDropdownOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleGoToCart = () => {
        setDropdownOpen(false); // Close the dropdown
        navigate('/cart'); // Navigate to /cart
    };

    return (
        <header className='header'>
            <h1 className="logo">Logo</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search Product"
                    value={search}
                    className="search-input"
                    onChange={(e) => {
                        setSearch(e.target.value);
                        productDispatch({
                            type: "FILTER_BY_SEARCH",
                            payload: e.target.value,
                        });
                    }}
                />
            </div>
            <div className="dropdown">
                <button onClick={toggleDropdown} className="dropdown-button">
                    Cart ({cart.length})
                </button>
                {dropdownOpen && (
                    <div className="dropdown-menu">
                        {cart.length > 0 ? (
                            <>
                                {cart.map((item) => (
                                    <span className="cartitem" key={item.id}>
                                        <img
                                            src={item.image}
                                            className="cartItemImg"
                                            alt={item.name}
                                        />
                                        <div className="cartItemDetail">
                                            <span>{item.name}</span>
                                            <span>₹ {item.price.toFixed(0)}</span>
                                        </div>
                                        <AiFillDelete
                                            fontSize="20px"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                dispatch({
                                                    type: "REMOVE_FROM_CART",
                                                    payload: item,
                                                })
                                            }
                                        />
                                    </span>
                                ))}
                                <button className="CartLink" onClick={handleGoToCart}>
                                    Go To Cart
                                </button>
                            </>
                        ) : (
                            <span style={{ padding: 10 }}>Cart is Empty!</span>
                        )}
                    </div>
                )}
            </div>
            <button className="hamburger" onClick={toggleMenu}>
                ☰
            </button>
        </header>
    );
};

export default Header;
