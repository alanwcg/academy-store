import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { Product, useCart } from '../../hooks/useCart';

import { Container, ProductTable, Total } from "./styles";

export function Cart() {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const total = cart.reduce((sumTotal, product) => {
    return sumTotal + (product.price * product.amount);
  }, 0);

  function handleDecrementProduct(product: Product) {
    updateProductAmount(product.id, product.amount - 1);
  }

  function handleIncrementProduct(product: Product) {
    updateProductAmount(product.id, product.amount + 1);
  }

  function handleRemoveProduct(id: number) {
    removeProduct(id);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>

        <tbody>
          {cart.map(product => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>
                  {
                    Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(product.price)
                  }
                </span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    disabled={product.amount <= 1}
                    onClick={() => handleDecrementProduct(product)}
                  >
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input
                    type="text"
                    readOnly
                    value={product.amount}
                  />
                  <button
                    type="button"
                    onClick={() => handleIncrementProduct(product)}
                  >
                    <MdAddCircleOutline size={20} />
                  </button>
                </div>
              </td>
              <td>
                <strong>R$ 179,90</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">
          Finalizar Pedido
        </button>

        <Total>
          <span>TOTAL</span>
          <strong>
            {
              Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(total)
            }
          </strong>
        </Total>
      </footer>
    </Container>
  );
}