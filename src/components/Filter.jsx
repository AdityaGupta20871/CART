import React from 'react';
import { CartState } from '../context/CartProvider';
import '../styles/Filter.css';

const Filter = () => {
  const {
    productDispatch,
    productState: { sort },
  } = CartState();

  return (
    <div className="filters">
      <div className="filter-container">
        <span className="title">Filter Products</span>
        <div className="sort">
          <span>
            <input
              type="radio"
              name="group1"
              id="inline-1"
              onChange={() =>
                productDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "lowToHigh",
                })
              }
              checked={sort === "lowToHigh"}
            />
            <label htmlFor="inline-1">Sort by Min Price</label>
          </span>
          <span>
            <input
              type="radio"
              name="group1"
              id="inline-2"
              onChange={() =>
                productDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "highToLow",
                })
              }
              checked={sort === "highToLow"}
            />
            <label htmlFor="inline-2">Sort by Max Price</label>
          </span>
        </div>
        <button
          className="clear-filters"
          onClick={() =>
            productDispatch({
              type: "CLEAR_FILTERS",
            })
          }
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
