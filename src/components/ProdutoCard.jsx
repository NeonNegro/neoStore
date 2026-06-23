import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart.jsx'
import { formatCategoryLabel } from '../services/dummyJson.js'
import { formatCurrency } from '../utils/formatters.js'
import Botao from './Botao.jsx'
import Selo from './Selo.jsx'

function ProdutoCard({ product }) {
  const { addItem } = useCart()

  return (
    <article className="produto-card">
      <Link className="produto-card__image-link" to={`/produto/${product.id}`}>
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="produto-card__image"
        />
      </Link>

      <div className="produto-card__content">
        <div className="produto-card__meta">
          <Selo tone="accent">{product.brand || 'DummyJSON'}</Selo>
          <span className="produto-card__category">
            {formatCategoryLabel(product.category)}
          </span>
        </div>

        <div className="produto-card__text">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
        </div>

        <div className="produto-card__footer">
          <strong>{formatCurrency(product.price)}</strong>
          <Botao onClick={() => addItem(product)} variant="ghost">
            Adicionar
          </Botao>
        </div>
      </div>
    </article>
  )
}

export default ProdutoCard
