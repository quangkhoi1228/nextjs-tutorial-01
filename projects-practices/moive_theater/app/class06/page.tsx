'use client'
import React, { useState } from 'react'
import ProductItem from '../components/ProductItem';

export default function Page() {
    const [products, setProducts] = useState([
        { id: 1, name: 'Áo thun', price: 150000 },
        { id: 2, name: 'Quần jeans', price: 320000 },
    ]);

    function handleClick() {
        setProducts((currentValueOfProducts) => [
            ...currentValueOfProducts, { id: new Date().getTime(), name: 'Áo khoác', price: 250000 }
        ]);

        setProducts((currentValueOfProducts) => [
            ...currentValueOfProducts, { id: new Date().getTime(), name: 'Áo khoác', price: 250000 }

        ])

    }



    return (
        <div>
            <button
                onClick={handleClick}
                className='bg-blue-500 text-white p-2 rounded-md m-4'>
                click me
            </button>
            {products.map((p) => (
                <ProductItem key={p.id} product={p} />
            ))}
        </div>
    )
}
