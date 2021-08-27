import { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { api } from '../../services/api';

import { ProductList } from "./styles";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');

      setProducts(response.data);
    }

    loadProducts();
  }, []);

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt="Sapato" />
          <strong>{product.title}</strong>
          <span>
            {
              Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(product.price)
            }
          </span>
          <button type="button">
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />
              0
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}

    </ProductList>
  );
}