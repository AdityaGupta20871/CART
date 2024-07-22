import React from 'react';
import { CartState } from '../context/CartProvider';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css'
import Filter from '../components/Filter';

const Home = () => {

    const {
        state: { products },
        productState: { sort, searchQuery },
      } = CartState();
    
      const transformProducts = () => {
        let sortedProducts = products;
    
        if (sort) {
          sortedProducts = sortedProducts.sort((a, b) =>
            sort === "lowToHigh" ? a.price - b.price : b.price - a.price
          );
        }

        if (searchQuery) {
          // Convert searchQuery to lowercase for case-insensitive comparison
          const lowerCaseQuery = searchQuery.toLowerCase();
          sortedProducts = sortedProducts.filter((prod) =>
              prod.name.toLowerCase().includes(lowerCaseQuery)
          );
      }
      console.log('Search Query:', searchQuery);
console.log('Products:', products);
    
        return sortedProducts;
      };

    return (
        <div className="home">
            <Filter />
            <div className="product-container">
                {
                    transformProducts().map((item) => (
                        <ProductCard item={item} key={item.id} />
                    ))
                }
            </div>
        </div>
    );
};

export default Home;