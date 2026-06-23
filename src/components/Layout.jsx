import { Outlet } from 'react-router-dom'
import Cabecalho from './Cabecalho.jsx'
import Rodape from './Rodape.jsx'
import CarrinhoDrawer from './CarrinhoDrawer.jsx'

function Layout({ children }) {
  return (
    <div className="app-shell">
      <Cabecalho />
      <main className="conteudo">{children ?? <Outlet />}</main>
      <Rodape />
      <CarrinhoDrawer />
    </div>
  )
}

export default Layout
