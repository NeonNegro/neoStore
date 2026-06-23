import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/useAuth.jsx'
import { useCart } from '../context/useCart.jsx'
import Botao from './Botao.jsx'

function Cabecalho() {
  const { isAuthenticated, logout, session } = useAuth()
  const { totalItems, openCart } = useCart()
  const getNavClassName = ({ isActive }) => (isActive ? 'is-active' : '')

  return (
    <header className="cabecalho">
      <NavLink className="brand" to="/">
        <span className="brand__badge">
          <img className="brand__mark" src="/favicon.svg" alt="Marca Verdil" />
        </span>
        <div>
          <strong>Verdil</strong>
          <span>Bolsa botanica premium</span>
        </div>
      </NavLink>

      <nav className="cabecalho__nav">
        <NavLink className={getNavClassName} to="/">
          Catalogo
        </NavLink>
        <NavLink className={getNavClassName} to="/minha-conta">
          Minha conta
        </NavLink>
        {!isAuthenticated ? (
          <NavLink className={getNavClassName} to="/cadastro">
            Cadastro
          </NavLink>
        ) : null}
        <NavLink className={getNavClassName} to="/login">
          {isAuthenticated ? 'Sessao ativa' : 'Entrar'}
        </NavLink>
      </nav>

      <div className="cabecalho__actions">
        {isAuthenticated ? (
          <>
            <span className="cabecalho__user">
              {session?.user?.username || session?.user?.firstName}
            </span>
            <Botao variant="ghost" onClick={logout}>
              Sair
            </Botao>
          </>
        ) : (
          <NavLink className="cabecalho__login-link" to="/login">
            <Botao>Entrar</Botao>
          </NavLink>
        )}

        <button className="cart-trigger" onClick={openCart} aria-label="Abrir carrinho">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>
      </div>
    </header>
  )
}

export default Cabecalho
