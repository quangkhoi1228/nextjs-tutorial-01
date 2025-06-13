'use client';
import { useState } from 'react';
import ProductItem from '../components/ProductItem';

function Class06Page() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Áo thun', price: 150000 },
    { id: 2, name: 'Quần jeans', price: 320000 },
  ]);

  function handleClick() {
    setProducts((currentValueOfProducts) => [
      ...currentValueOfProducts, // 2 phần tử
      { id: new Date().getTime(), name: 'Áo khoác', price: 250000 },
    ]); // 3 phần từ

    setProducts((currentValueOfProducts) => [
      ...currentValueOfProducts, // 3 phần tử
      { id: new Date().getTime(), name: 'Áo khoác', price: 250000 },
    ]); // 4 phần từ
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className='bg-blue-500 text-white p-2 rounded-md m-4'
      >
        Click me
      </button>
      {products.map((p) => (
        <ProductItem key={p.id} product={p} />
      ))}
    </div>
  );
}

export default Class06Page;
