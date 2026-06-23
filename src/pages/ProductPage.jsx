import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Botao from '../components/Botao.jsx'
import Selo from '../components/Selo.jsx'
import { useCart } from '../context/useCart.jsx'
import { formatCategoryLabel, getProductById } from '../services/trefleApi.js'
import { formatCurrency } from '../utils/formatters.js'

function ProductPage() {
  const { id } = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadProduct() {
      try {
        setIsLoading(true)
        setErrorMessage('')

        const nextProduct = await getProductById(id)

        if (!isMounted) {
          return
        }

        setProduct(nextProduct)
      } catch (error) {
        if (!isMounted) {
          return
        }

        setErrorMessage(
          error.message || 'Nao foi possivel abrir o detalhe desse produto agora.',
        )
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadProduct()

    return () => {
      isMounted = false
    }
  }, [id])

  if (isLoading) {
    return (
      <section className="estado-vazio">
        <p className="eyebrow">Carregando</p>
        <h1>Abrindo o detalhe do ativo selecionado.</h1>
        <p>Buscando os dados da Trefle.io por identificador.</p>
      </section>
    )
  }

  if (errorMessage || !product) {
    return (
      <section className="estado-vazio">
        <h1>Produto ainda nao listado</h1>
        <p>{errorMessage || 'Esse item nao foi encontrado na API.'}</p>
        <Link className="inline-link" to="/">
          Voltar ao catalogo
        </Link>
      </section>
    )
  }

  return (
    <section className="produto-detalhe">
      <div className="produto-detalhe__imagem">
        <img src={product.thumbnail || product.images?.[0]} alt={product.title} />
      </div>

      <div className="produto-detalhe__conteudo">
        <Selo tone="accent">{product.brand || 'Trefle.io'}</Selo>
        <h1>{product.title}</h1>
        <p>{product.description}</p>

        <div className="produto-detalhe__info">
          <div>
            <span>Categoria</span>
            <strong>{formatCategoryLabel(product.category)}</strong>
          </div>
          <div>
            <span>Preco de entrada</span>
            <strong>{formatCurrency(product.price)}</strong>
          </div>
          <div>
            <span>Avaliacao</span>
            <strong>{product.rating || 'Sem nota'}</strong>
          </div>
          <div>
            <span>Estoque</span>
            <strong>{product.stock}</strong>
          </div>
        </div>

        <div className="produto-detalhe__actions">
          <Botao onClick={() => addItem(product)}>Adicionar ao carrinho</Botao>
          <Link className="inline-link" to="/">
            Seguir explorando
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProductPage
