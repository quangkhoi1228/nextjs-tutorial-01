// app/components/ProductItem.tsx
'use client';

type Product = {
  id: number;
  name: string;
  price: number;
};

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className='border-2 border-gray-300 rounded-md p-4 m-4'>
      <h4>{product.name}</h4>
      <p>Giá: {product.price.toLocaleString()} VND</p>
    </div>
  );
};

export default ProductItem;
