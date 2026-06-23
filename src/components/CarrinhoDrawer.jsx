import Botao from './Botao.jsx'
import { useCart } from '../context/useCart.jsx'
import { formatCurrency } from '../utils/formatters.js'

function CarrinhoDrawer() {
  const { isCartOpen, closeCart, items, removeItem, totalPrice } = useCart()

  if (!isCartOpen) return null

  return (
    <>
      <div className="carrinho-overlay" onClick={closeCart} />
      <aside className="carrinho-drawer">
        <header className="carrinho-drawer__header">
          <h2>Seu Carrinho</h2>
          <button className="carrinho-drawer__close" onClick={closeCart}>
            &times;
          </button>
        </header>

        <div className="carrinho-drawer__content">
          {items.length === 0 ? (
            <div className="carrinho-vazio">
              <p>O carrinho esta vazio.</p>
            </div>
          ) : (
            <ul className="carrinho-lista">
              {items.map((item) => (
                <li key={item.id} className="carrinho-item">
                  <img src={item.thumbnail || item.images?.[0]} alt={item.title} />
                  <div className="carrinho-item__info">
                    <strong>{item.title}</strong>
                    <span>{item.quantity}x {formatCurrency(item.price)}</span>
                  </div>
                  <button 
                    className="carrinho-item__remove" 
                    onClick={() => removeItem(item.id)}
                    title="Remover"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="carrinho-drawer__footer">
            <div className="carrinho-total">
              <span>Total:</span>
              <strong>{formatCurrency(totalPrice)}</strong>
            </div>
            <Botao onClick={() => alert('Checkout simulado!')}>Finalizar compra</Botao>
          </footer>
        )}
      </aside>
    </>
  )
}

export default CarrinhoDrawer
