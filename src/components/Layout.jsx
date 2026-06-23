import { Outlet } from 'react-router-dom'
import Cabecalho from './Cabecalho.jsx'
import Rodape from './Rodape.jsx'

function Layout({ children }) {
  return (
    <div className="app-shell">
      <Cabecalho />
      <main className="conteudo">{children ?? <Outlet />}</main>
      <Rodape />
    </div>
  )
}

export default Layout
