import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/useAuth.jsx'
import { useCart } from '../context/useCart.jsx'
import Botao from './Botao.jsx'

function Cabecalho() {
  const { isAuthenticated, logout, session } = useAuth()
  const { totalItems } = useCart()
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
        <span className="cart-pill">Carrinho {totalItems}</span>
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
      </div>
    </header>
  )
}

export default Cabecalho
