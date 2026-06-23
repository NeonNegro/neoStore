import Selo from '../components/Selo.jsx'
import { useAuth } from '../context/useAuth.jsx'
import { useCart } from '../context/useCart.jsx'
import { formatCurrency } from '../utils/formatters.js'

function AccountPage() {
  const { session } = useAuth()
  const { items, totalPrice, removeItem } = useCart()

  return (
    <section className="painel account-grid">
      <div className="account-card">
        <Selo tone="accent">Area protegida</Selo>
        <h1>Minha conta</h1>
        <p>Espaco reservado para o colecionador acompanhar sessao, perfil e compras.</p>

        <div className="account-list">
          <div>
            <span>Usuario</span>
            <strong>{session?.user?.username}</strong>
          </div>
          <div>
            <span>Email</span>
            <strong>{session?.user?.email}</strong>
          </div>
          <div>
            <span>Token</span>
            <strong>
              {session?.accessToken
                ? `${session.accessToken.slice(0, 24)}...`
                : 'Sem token'}
            </strong>
          </div>
          <div>
            <span>Modo de autenticacao</span>
            <strong>API simulada local</strong>
          </div>
        </div>
      </div>

      <div className="account-card">
        <p className="eyebrow">Resumo do carrinho</p>
        <h2>Carrinho conectado ao estado global.</h2>
        <p>{items.length} item(ns) distintos adicionados ate agora.</p>
        <strong className="account-total">{formatCurrency(totalPrice)}</strong>
        <div className="account-cart-list">
          {items.length ? (
            items.map((item) => (
              <div className="account-cart-item" key={item.id}>
                <div>
                  <span>{item.title}</span>
                  <button 
                    type="button" 
                    className="account-cart-remove"
                    onClick={() => removeItem(item.id)}
                  >
                    Remover
                  </button>
                </div>
                <strong>
                  {item.quantity}x {formatCurrency(item.price)}
                </strong>
              </div>
            ))
          ) : (
            <p className="feedback">Adicione produtos na vitrine para visualizar o resumo.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default AccountPage
