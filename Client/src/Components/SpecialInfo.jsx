import React, { useEffect, useState } from 'react';
import { fetchSpecials } from '../data/repositoryapi';
import SpecialItem from './SpecialItem';

function SpecialInfo() {
  const [specials, setSpecials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSpecials = async () => {
      try {
        const response = await fetchSpecials();
        console.log('Fetched specials:', response.data);
        setSpecials(response.data);
      } catch (error) {
        console.error('Error fetching specials:', error);
        setError(error.message);
      }
    };

    getSpecials();
  }, []);

  return (
    <div className="product-grid">
      {error ? <p>Error: {error}</p> : specials.map((special, index) => {
        const { specialPrice, originalPrice, product } = special;
        const { productName } = product;

        return (
          <SpecialItem
            key={index}
            name={productName}
            originalPrice={Number(originalPrice)}
            newPrice={Number(specialPrice)}
          />
        );
      })}
    </div>
  );
}

export default SpecialInfo;