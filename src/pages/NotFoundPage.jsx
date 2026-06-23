import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="estado-vazio">
      <p className="eyebrow">Erro 404</p>
      <h1>Essa rota nao foi encontrada.</h1>
      <p>A pagina de fallback ja esta pronta para completar a camada de navegacao SPA.</p>
      <Link className="inline-link" to="/">
        Voltar ao inicio
      </Link>
    </section>
  )
}

export default NotFoundPage
